const Booking = require('../../models/booking.model');

// GET — Admin fetch all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      bookings, // ✅ matches what frontend expects
    });
  } catch (error) {
    console.error('Error in admin fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const updateBooking = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, updated });
  } catch (err) {
    console.error("Error updating booking:", err);
    res.status(500).json({ success: false, message: "Failed to update booking" });
  }
};


module.exports = { getAllBookings,deleteBooking, updateBooking };
