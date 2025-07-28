const CastingKit = require("../../models/CastingKit");

// GET /api/shop/casting-kits
const getAllCastingKits = async (req, res) => {
  try {
    const kits = await CastingKit.find().sort({ createdAt: -1 });
    res.status(200).json({ kits });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch casting kits" });
  }
};

module.exports = { getAllCastingKits };
