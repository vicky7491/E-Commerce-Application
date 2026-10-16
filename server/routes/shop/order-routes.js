const express = require("express");
const {
  createRazorpayOrder,
  confirmRazorpayPayment,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");
const { authMiddleware } = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.use(authMiddleware);

router.post("/razorpay/create", createRazorpayOrder);
router.post("/razorpay/confirm", confirmRazorpayPayment);
router.get("/list", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

module.exports = router;
