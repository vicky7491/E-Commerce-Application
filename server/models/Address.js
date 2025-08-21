const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
     name: { type: String, required: true }, 
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
