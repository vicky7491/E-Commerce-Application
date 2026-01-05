const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

/* ======================================================
   IMAGE UPLOAD (Cloudinary)
====================================================== */
const handleImageUpload = async (req, res) => {
  console.log("REQ.FILE =>", req.file);

  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await imageUploadUtil(req.file.path);

    return res.status(200).json({
      success: true,
      url: result.secure_url,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};

/* ======================================================
   ADD PRODUCT (MULTIPLE IMAGES)
====================================================== */
const addProduct = async (req, res) => {
  try {
    const {
      images,
      title,
      description,
      category,
      price,
      salePrice,
      totalStock,
      averageReview,
      isCastingKit,
    } = req.body;

    const newlyCreatedProduct = new Product({
      images, // ✅ array of image URLs
      title,
      description,
      category,
      price,
      salePrice,
      totalStock,
      averageReview,
      isCastingKit: isCastingKit || false,
    });

    await newlyCreatedProduct.save();

    return res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Error occurred while adding product",
    });
  }
};

/* ======================================================
   FETCH ALL PRODUCTS
====================================================== */
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    return res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching products",
    });
  }
};

/* ======================================================
   EDIT PRODUCT (MULTIPLE IMAGES SAFE)
====================================================== */
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      images,
      title,
      description,
      category,
      price,
      salePrice,
      totalStock,
      averageReview,
      isCastingKit,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.category = category ?? product.category;
    product.price = price ?? product.price;
    product.salePrice = salePrice ?? product.salePrice;
    product.totalStock = totalStock ?? product.totalStock;
    product.averageReview = averageReview ?? product.averageReview;
    product.isCastingKit =
      typeof isCastingKit === "boolean"
        ? isCastingKit
        : product.isCastingKit;

    // ✅ images update only if provided
    if (Array.isArray(images) && images.length > 0) {
      product.images = images;
    }

    await product.save();

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Error occurred while editing product",
    });
  }
};

/* ======================================================
   DELETE PRODUCT
====================================================== */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Error occurred while deleting product",
    });
  }
};

/* ======================================================
   EXPORTS
====================================================== */
module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
