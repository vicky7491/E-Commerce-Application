const express = require('express');
const router = express.Router();
const { createBooking } = require('../../controllers/common/booking-controller');

// Route: POST /api/bookings
router.post('/booking', createBooking);

module.exports = router;
