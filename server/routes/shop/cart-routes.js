const express = require("express");

const {
  addToCart,
  fetchCartItems,
  deleteCartItem,
  updateCartItemQty,
} = require("../../controllers/shop/cart-controller");
const { verifyToken } = require("../../middleware/verifyToken");

const router = express.Router();

// All cart routes require authentication
router.post("/add", verifyToken, addToCart);
router.get("/get/:userId", verifyToken, fetchCartItems);
router.put("/update-cart", verifyToken, updateCartItemQty);
router.delete("/:userId/:productId", verifyToken, deleteCartItem);

module.exports = router;
