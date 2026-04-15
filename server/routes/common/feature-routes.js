const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} = require("../../controllers/common/feature-controller");
const { verifyTokenAndAdmin } = require("../../middleware/verifyToken");

const router = express.Router();

router.post("/add", verifyTokenAndAdmin, addFeatureImage);
router.get("/get", getFeatureImages);
router.delete("/delete/:id", verifyTokenAndAdmin, deleteFeatureImage);

module.exports = router;
