const mongoose = require("mongoose");

const CastingKitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
   images: [
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  }
],
    features: [String],
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CastingKit", CastingKitSchema);
