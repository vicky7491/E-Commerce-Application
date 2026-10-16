const mongoose = require("mongoose");
const Address = require("../../models/Address");

const addAddress = async (req, res) => {
  try {
    const { name, address, city, pincode, phone, notes = "" } = req.body || {};
    const userId = String(req.user.id);

    if (!name || !address || !city || !pincode || !phone) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const newlyCreatedAddress = new Address({
      userId,
      name,
      address,
      city,
      pincode,
      notes,
      phone,
    });

    await newlyCreatedAddress.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const userId = String(req.user.id);

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const userId = String(req.user.id);
    const { name, address, city, pincode, phone, notes = "" } = req.body || {};

    if (!mongoose.isValidObjectId(addressId) || !name || !address || !city || !pincode || !phone) {
      return res.status(400).json({
        success: false,
        message: "Address details are required",
      });
    }

    const updatedAddress = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      { name, address, city, pincode, phone, notes },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedAddress,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const userId = String(req.user.id);
    if (!mongoose.isValidObjectId(addressId)) {
      return res.status(400).json({
        success: false,
        message: "A valid address id is required",
      });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };
