// utils/razorpayHelper.js
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createRazorpayOrder = async (amount) => {
  const options = {
    amount: amount * 100, // paise me
    currency: "INR",
    receipt: `rcpt_${Date.now()}`,
  };

  return await razorpay.orders.create(options);
};

module.exports = { createRazorpayOrder };
