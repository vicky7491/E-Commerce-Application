const Razorpay = require("razorpay");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🧾 Step 1: Create Razorpay Order (amount in ₹)
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Razorpay order error" });
  }
};

// ✅ Step 2: After payment success, confirm order & save to DB
const confirmRazorpayPayment = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      paymentMethod,
      totalAmount,
      cartId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: "confirmed",
      paymentStatus: "paid",
      paymentMethod,
      totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: razorpay_payment_id,
      payerId: razorpay_order_id,
    });

    await newOrder.save();

    // ✅ Reduce stock for each product
    for (let item of cartItems) {
      let product = await Product.findById(item.productId);
      if (product) {
        product.totalStock -= item.quantity;
        await product.save();
      }
    }

    // 🗑 Delete cart after order
    await Cart.findByIdAndDelete(cartId);

    res.status(201).json({
      success: true,
      message: "Razorpay payment captured, order created",
      order: newOrder,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Payment confirm error" });
  }
};

// ✅ Step 3: Get all orders by user
const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

// ✅ Step 4: Get single order details by ID
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);


    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createRazorpayOrder,
  confirmRazorpayPayment,
  getAllOrdersByUser,
  getOrderDetails,
};
