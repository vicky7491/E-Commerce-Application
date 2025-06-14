const Booking = require('../../models/booking.model');

// POST — Create new booking (User side)
const createBooking = async (req, res) => {
  try {
     console.log("Received booking:", req.body);
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', 
      newBooking
    });
  } catch (error) {
    console.error('Error in user booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

module.exports = { createBooking };
