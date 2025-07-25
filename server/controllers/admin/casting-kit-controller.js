const CastingKit = require("../../models/CastingKit");



const uploadCastingKitImage = async (req, res) => {
  if (!req.file?.path) {
    console.log(req.file);
    return res.status(400).json({ success: false, message: "Upload failed" });
  }

  return res.status(200).json({
    success: true,
    image: {
      url: req.file.path,
      public_id: req.file.filename,
    },
  });
};

const createCastingKit = async (req, res) => {
  try {
    const { title, description, price, stock,images } = req.body;

    const kit = new CastingKit({
      title,
      description,
      price,
      stock,
      images,
    });
    await kit.save();

    res.status(201).json({ message: "Casting kit created", kit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const editCastingKit = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, stock, images } = req.body;

    const updated = await CastingKit.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        stock,
        images,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Casting kit not found" });
    }

    res.status(200).json({ message: "Casting kit updated", kit: updated });
  } catch (err) {
    res.status(500).json({ error: err.message || "Update failed" });
  }
};

const getAllCastingKits = async (req, res) => {
  try {
    const kits = await CastingKit.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, kits });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const deleteCastingKit = async (req, res) => {
  try {
    await CastingKit.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Casting kit deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCastingKit,
  getAllCastingKits,
  deleteCastingKit,
  editCastingKit,
  uploadCastingKitImage
};
