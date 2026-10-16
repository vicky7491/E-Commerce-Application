const crypto = require("crypto");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const Address = require("../../models/Address");
const Cart = require("../../models/Cart");
const Order = require("../../models/Order");
const Product = require("../../models/Product");

let razorpayClient;

function getRazorpayClient() {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    const error = new Error("Razorpay is not configured on the server");
    error.statusCode = 503;
    throw error;
  }

  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
  }

  return razorpayClient;
}

function isValidSignature(expectedHex, receivedHex) {
  if (typeof receivedHex !== "string" || !/^[a-f\d]{64}$/i.test(receivedHex)) {
    return false;
  }

  const expected = Buffer.from(expectedHex, "hex");
  const received = Buffer.from(receivedHex, "hex");
  return expected.length === received.length && crypto.timingSafeEqual(expected, received);
}

function verifyCheckoutSignature(orderId, paymentId, signature) {
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return isValidSignature(expected, signature);
}

function verifyWebhookSignature(rawBody, signature, secret) {
  if (!Buffer.isBuffer(rawBody) || !secret || typeof signature !== "string") {
    return false;
  }

  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return isValidSignature(expected, signature);
}

function getUnitPrice(product) {
  const salePrice = Number(product.salePrice);
  const regularPrice = Number(product.price);
  const price = salePrice > 0 ? salePrice : regularPrice;
  return Number.isFinite(price) && price > 0 ? price : null;
}

async function fetchCapturedPayment(order, paymentId) {
  const razorpay = getRazorpayClient();
  let payment = await razorpay.payments.fetch(paymentId);

  const paymentMatchesOrder =
    payment.order_id === order.razorpayOrderId &&
    payment.amount === order.amountPaise &&
    payment.currency === "INR";

  if (!paymentMatchesOrder) {
    const error = new Error("Payment does not match the expected order");
    error.statusCode = 400;
    throw error;
  }

  if (payment.status === "authorized") {
    try {
      payment = await razorpay.payments.capture(paymentId, order.amountPaise, "INR");
    } catch (captureError) {
      // A capture request can time out after Razorpay has completed it. Fetch
      // the payment again before treating that as a failed capture.
      payment = await razorpay.payments.fetch(paymentId);
      if (payment.status !== "captured") {
        throw captureError;
      }
    }
  }

  if (
    payment.status !== "captured" ||
    payment.order_id !== order.razorpayOrderId ||
    payment.amount !== order.amountPaise ||
    payment.currency !== "INR"
  ) {
    const error = new Error("Payment has not been captured for the expected amount");
    error.statusCode = 409;
    error.paymentPending = payment.status === "authorized";
    throw error;
  }

  return payment;
}

class InsufficientStockError extends Error {
  constructor() {
    super("Inventory changed while payment was being completed");
    this.name = "InsufficientStockError";
  }
}

async function deleteCartIfUnchanged(order, session) {
  if (!order.cartId || !Number.isInteger(order.cartVersion)) return;

  const options = session ? { session } : {};
  await Cart.deleteOne(
    {
      _id: order.cartId,
      userId: order.userId,
      __v: order.cartVersion,
    },
    options
  );
}

async function finalizeCapturedPayment(orderId, payment) {
  const session = await mongoose.startSession();
  let finalizedOrder;

  try {
    await session.withTransaction(async () => {
      const order = await Order.findById(orderId).session(session);
      if (!order) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        throw error;
      }

      if (order.paymentStatus === "paid") {
        if (order.paymentId !== payment.id) {
          const error = new Error("This order has already been paid");
          error.statusCode = 409;
          throw error;
        }
        finalizedOrder = order;
        return;
      }

      if (!["pending", "processing"].includes(order.paymentStatus)) {
        const error = new Error("This order cannot be confirmed");
        error.statusCode = 409;
        throw error;
      }

      for (const item of order.cartItems) {
        const result = await Product.updateOne(
          {
            _id: item.productId,
            totalStock: { $gte: item.quantity },
          },
          { $inc: { totalStock: -item.quantity } },
          { session }
        );

        if (result.modifiedCount !== 1) {
          throw new InsufficientStockError();
        }
      }

      order.paymentStatus = "paid";
      order.paymentMethod = "razorpay";
      order.paymentId = payment.id;
      order.orderStatus = "confirmed";
      order.orderUpdateDate = new Date();
      await order.save({ session });
      await deleteCartIfUnchanged(order, session);
      finalizedOrder = order;
    });
  } catch (error) {
    if (error instanceof InsufficientStockError) {
      // The payment is already captured. Keep a durable order record for
      // customer support instead of losing the payment or overselling stock.
      finalizedOrder = await Order.findOneAndUpdate(
        { _id: orderId, paymentStatus: { $ne: "paid" } },
        {
          $set: {
            paymentStatus: "paid",
            paymentMethod: "razorpay",
            paymentId: payment.id,
            orderStatus: "inventory_issue",
            orderUpdateDate: new Date(),
          },
        },
        { new: true }
      );

      if (finalizedOrder) {
        await deleteCartIfUnchanged(finalizedOrder);
      } else {
        const currentOrder = await Order.findById(orderId);
        if (currentOrder?.paymentStatus === "paid" && currentOrder.paymentId === payment.id) {
          finalizedOrder = currentOrder;
        } else if (currentOrder?.paymentStatus === "paid") {
          const duplicatePaymentError = new Error("This order has already been paid");
          duplicatePaymentError.statusCode = 409;
          throw duplicatePaymentError;
        } else {
          throw new InsufficientStockError();
        }
      }
    } else {
      // Covers an ambiguous transaction commit: return the committed order if
      // MongoDB completed the transaction before the connection failed.
      const currentOrder = await Order.findById(orderId);
      if (currentOrder?.paymentStatus === "paid" && currentOrder.paymentId === payment.id) {
        finalizedOrder = currentOrder;
      } else {
        throw error;
      }
    }
  } finally {
    await session.endSession();
  }

  return finalizedOrder;
}

async function completePaymentForOrder(order, paymentId) {
  const payment = await fetchCapturedPayment(order, paymentId);
  return finalizeCapturedPayment(order._id, payment);
}

// Create both a Razorpay order and a local pending order from trusted data.
const createRazorpayOrder = async (req, res) => {
  try {
    const { addressId, orderNote = "" } = req.body || {};
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(addressId)) {
      return res.status(400).json({ success: false, message: "Select a valid delivery address" });
    }

    if (typeof orderNote !== "string" || orderNote.length > 500) {
      return res.status(400).json({
        success: false,
        message: "Order note must be 500 characters or fewer",
      });
    }

    const [cart, address] = await Promise.all([
      Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "images title price salePrice totalStock",
      }),
      Address.findOne({ _id: addressId, userId: String(userId) }),
    ]);

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Your cart is empty" });
    }
    if (!address) {
      return res.status(404).json({ success: false, message: "Delivery address not found" });
    }

    const orderItems = [];
    let amountPaise = 0;

    for (const cartItem of cart.items) {
      const product = cartItem.productId;
      const quantity = Number(cartItem.quantity);
      const unitPrice = product && getUnitPrice(product);

      if (!product || !Number.isInteger(quantity) || quantity < 1 || unitPrice === null) {
        return res.status(400).json({
          success: false,
          message: "Your cart contains an unavailable or invalid product",
        });
      }

      if (!Number.isFinite(product.totalStock) || product.totalStock < quantity) {
        return res.status(409).json({
          success: false,
          message: `${product.title || "A product"} does not have enough stock`,
        });
      }

      const unitPricePaise = Math.round((unitPrice + Number.EPSILON) * 100);
      amountPaise += unitPricePaise * quantity;
      orderItems.push({
        productId: String(product._id),
        title: product.title || "Product",
        image: product.images?.[0] || "",
        price: unitPricePaise / 100,
        quantity,
      });
    }

    if (!Number.isSafeInteger(amountPaise) || amountPaise <= 0) {
      return res.status(400).json({ success: false, message: "Cart total is invalid" });
    }

    const razorpay = getRazorpayClient();
    const localOrderId = new mongoose.Types.ObjectId();
    const razorpayOrder = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: localOrderId.toString(),
      notes: { internal_order_id: localOrderId.toString() },
    });

    const now = new Date();
    const pendingOrder = new Order({
      _id: localOrderId,
      userId: String(userId),
      cartId: String(cart._id),
      cartVersion: cart.__v,
      cartItems: orderItems,
      addressInfo: {
        addressId: String(address._id),
        name: address.name,
        address: address.address,
        city: address.city,
        pincode: address.pincode,
        phone: address.phone,
        notes: address.notes,
      },
      orderNote: orderNote.trim(),
      orderStatus: "payment_pending",
      paymentMethod: "razorpay",
      paymentStatus: "pending",
      totalAmount: amountPaise / 100,
      amountPaise,
      orderDate: now,
      orderUpdateDate: now,
      razorpayOrderId: razorpayOrder.id,
    });
    await pendingOrder.save();

    return res.status(201).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error.message);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode === 503 ? error.message : "Unable to start payment. Please try again.",
    });
  }
};

const confirmRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id: paymentId,
      razorpay_order_id: submittedOrderId,
      razorpay_signature: signature,
    } = req.body || {};

    if (
      typeof paymentId !== "string" ||
      typeof submittedOrderId !== "string" ||
      typeof signature !== "string"
    ) {
      return res.status(400).json({ success: false, message: "Payment confirmation data is incomplete" });
    }

    const order = await Order.findOne({
      razorpayOrderId: submittedOrderId,
      userId: String(req.user.id),
    });

    if (!order) {
      return res.status(404).json({ success: false, message: "Payment order not found" });
    }

    getRazorpayClient();
    if (!verifyCheckoutSignature(order.razorpayOrderId, paymentId, signature)) {
      return res.status(400).json({ success: false, message: "Payment signature verification failed" });
    }

    const confirmedOrder = await completePaymentForOrder(order, paymentId);
    if (confirmedOrder.orderStatus === "inventory_issue") {
      return res.status(200).json({
        success: true,
        needsSupport: true,
        message: "Payment was captured, but the order needs a stock review",
        order: confirmedOrder,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment captured and order confirmed",
      order: confirmedOrder,
    });
  } catch (error) {
    if (error.paymentPending) {
      return res.status(202).json({
        success: false,
        pending: true,
        message: "Payment is still being confirmed. Do not retry the payment.",
      });
    }

    console.error("Razorpay payment confirmation failed:", error.message);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Unable to confirm payment yet. Please contact support if you were charged.",
    });
  }
};

const handleRazorpayWebhook = async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.get("x-razorpay-signature");

  if (!webhookSecret) {
    return res.status(503).json({ success: false, message: "Razorpay webhook is not configured" });
  }

  if (!verifyWebhookSignature(req.body, signature, webhookSecret)) {
    return res.status(400).json({ success: false, message: "Invalid webhook signature" });
  }

  try {
    const eventPayload = JSON.parse(req.body.toString("utf8"));
    if (eventPayload.event !== "payment.captured") {
      return res.status(200).json({ success: true, ignored: true });
    }

    const payment = eventPayload.payload?.payment?.entity;
    if (!payment?.id || !payment?.order_id) {
      return res.status(400).json({ success: false, message: "Webhook payment data is incomplete" });
    }

    const order = await Order.findOne({ razorpayOrderId: payment.order_id });
    if (!order) {
      // The webhook can arrive for an order whose local write failed after the
      // Razorpay order was created. Acknowledge it to avoid endless retries.
      return res.status(200).json({ success: true, ignored: true });
    }

    await completePaymentForOrder(order, payment.id);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Razorpay webhook processing failed:", error.message);
    return res.status(500).json({ success: false, message: "Webhook processing failed" });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: String(req.user.id),
      paymentStatus: "paid",
    }).sort({ orderDate: -1 });

    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Fetching customer orders failed:", error.message);
    return res.status(500).json({ success: false, message: "Unable to fetch orders" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      userId: String(req.user.id),
    });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Fetching order details failed:", error.message);
    return res.status(500).json({ success: false, message: "Unable to fetch order details" });
  }
};

module.exports = {
  createRazorpayOrder,
  confirmRazorpayPayment,
  handleRazorpayWebhook,
  getAllOrdersByUser,
  getOrderDetails,
};
