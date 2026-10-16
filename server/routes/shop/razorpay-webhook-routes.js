const express = require("express");
const { handleRazorpayWebhook } = require("../../controllers/shop/order-controller");

const router = express.Router();

// Razorpay signs the exact request bytes, so this route must run before the
// application's JSON parser.
router.post("/", express.raw({ type: "application/json", limit: "10kb" }), handleRazorpayWebhook);

module.exports = router;
