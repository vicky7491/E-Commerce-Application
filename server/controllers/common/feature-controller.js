const Feature = require("../../models/Feature");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    console.log(image, "image");

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// ✅ **New Function to Delete Feature Image**
const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from request params
    const deletedImage = await Feature.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ success: false, message: "Image not found!" });
    }

    res.status(200).json({ success: true, message: "Image deleted successfully!" });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error deleting image!",
    });
  }
};

module.exports = { addFeatureImage, getFeatureImages, deleteFeatureImage };
