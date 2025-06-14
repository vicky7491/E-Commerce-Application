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

module.exports = { getAllBookings };
