const express = require('express');
const router = express.Router();
const { getAllBookings,deleteBooking,updateBooking } = require("../../controllers/admin/booking-controller");
const { verifyToken,verifyTokenAndAdmin } = require('../../middleware/verifyToken');

// Route: GET /api/admin/bookings
router.get('/', verifyTokenAndAdmin,getAllBookings);
router.delete("/:id", verifyTokenAndAdmin, deleteBooking);
router.put("/:id", verifyTokenAndAdmin, updateBooking);

module.exports = router;
