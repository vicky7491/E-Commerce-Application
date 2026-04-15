const express = require("express");

const {
  addProductReview,
  getProductReviews,
} = require("../../controllers/shop/product-review-controller");
const { verifyToken } = require("../../middleware/verifyToken");

const router = express.Router();

router.post("/add", verifyToken, addProductReview);
router.get("/:productId", getProductReviews);

module.exports = router;
