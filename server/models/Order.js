const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    name: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderNote: { type: String, trim: true, maxlength: 500, default: "" },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: { type: String, default: "pending" },
  totalAmount: Number,
  amountPaise: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
  razorpayOrderId: { type: String, index: true },
  cartVersion: Number,
});

module.exports = mongoose.model("Order", OrderSchema);
