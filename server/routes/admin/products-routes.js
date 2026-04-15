const express = require("express");

const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller");

const { upload } = require("../../helpers/cloudinary");
const { verifyTokenAndAdmin } = require("../../middleware/verifyToken");

const router = express.Router();

router.post("/upload-image", verifyTokenAndAdmin, upload.single("my_file"), handleImageUpload);
router.post("/add", verifyTokenAndAdmin, addProduct);
router.put("/edit/:id", verifyTokenAndAdmin, editProduct);
router.delete("/delete/:id", verifyTokenAndAdmin, deleteProduct);
router.get("/get", verifyTokenAndAdmin, fetchAllProducts);

module.exports = router;
