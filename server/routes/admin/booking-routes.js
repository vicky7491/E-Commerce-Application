const express = require('express');
const router = express.Router();
const { getAllBookings } = require("../../controllers/admin/booking-controller");
const { verifyToken,verifyTokenAndAdmin } = require('../../middleware/verifyToken');

// Route: GET /api/admin/bookings
router.get('/', verifyTokenAndAdmin,getAllBookings);

module.exports = router;
