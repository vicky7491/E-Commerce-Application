const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const {
      category = [],
      sortBy    = "price-lowtohigh",
      page      = 1,
      limit     = 12,
    } = req.query;

    // ─── Filters ────────────────────────────────────────────────────────────
    let filters = {};
    if (category.length) filters.category = { $in: category.split(",") };

    // ─── Sort ───────────────────────────────────────────────────────────────
    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh": sort.price = 1;  break;
      case "price-hightolow": sort.price = -1; break;
      case "title-atoz":      sort.title = 1;  break;
      case "title-ztoa":      sort.title = -1; break;
      default:                sort.price = 1;
    }

    // ─── Pagination ─────────────────────────────────────────────────────────
    const pageNum  = Math.max(1, parseInt(page)  || 1);
    const limitNum = Math.max(1, parseInt(limit) || 12);
    const skip     = (pageNum - 1) * limitNum;

    // ─── Parallel fetch — count + page of results ───────────────────────────
    // .lean() returns plain JS objects, not Mongoose docs (~40% faster serialization)
    const [products, total] = await Promise.all([
      Product.find(filters).sort(sort).skip(skip).limit(limitNum).lean(),
      Product.countDocuments(filters),
    ]);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page:  pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (e) {
    console.error("getFilteredProducts error:", e);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

const getProductDetails = async (req, res) => {
  try {
    // .lean() — single doc read, no need for Mongoose document methods
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (e) {
    console.error("getProductDetails error:", e);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

module.exports = { getFilteredProducts, getProductDetails };