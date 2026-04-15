const express = require("express");
const {
  createRazorpayOrder,
  confirmRazorpayPayment,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");
const { verifyToken } = require("../../middleware/verifyToken");

const router = express.Router();

// All order routes require authentication
router.post("/razorpay/create", verifyToken, createRazorpayOrder);
router.post("/razorpay/confirm", verifyToken, confirmRazorpayPayment);
router.get("/list/:userId", verifyToken, getAllOrdersByUser);
router.get("/details/:id", verifyToken, getOrderDetails);

module.exports = router;
