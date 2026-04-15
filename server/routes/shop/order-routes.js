const express = require("express");
const {
  createRazorpayOrder,
  confirmRazorpayPayment,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

// 🆕 Razorpay: Create Order
router.post("/razorpay/create", createRazorpayOrder);

// 🆕 Razorpay: Confirm Payment & Save Order
router.post("/razorpay/confirm", confirmRazorpayPayment);

// ✅ Get orders by user
router.get("/list/:userId", getAllOrdersByUser);

// ✅ Get single order detail
router.get("/details/:id", getOrderDetails);

module.exports = router;
