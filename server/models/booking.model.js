const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  phone: { type: String, required: true, trim: true, maxlength: 24 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  location: { type: String, required: true, trim: true, maxlength: 200 },
  concept: {
    type: String,
    required: true,
    enum: ["Baby Concept", "Parents / Aashirwad Concept", "Couples Concept", "Family / Group"],
  },
  date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
  time: {
    type: String,
    required: true,
    enum: ["early-morning", "morning", "afternoon", "evening"],
  },
  comments: { type: String, trim: true, maxlength: 2000, default: "" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
