const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    images: {
  type: [String],
  required: true,
},
    title: String,
    description: String,
    category: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
    isCastingKit: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
