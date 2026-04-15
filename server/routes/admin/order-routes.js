const express = require("express");

const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/order-controller");
const { verifyTokenAndAdmin } = require("../../middleware/verifyToken");

const router = express.Router();

router.get("/get", verifyTokenAndAdmin, getAllOrdersOfAllUsers);
router.get("/details/:id", verifyTokenAndAdmin, getOrderDetailsForAdmin);
router.put("/update/:id", verifyTokenAndAdmin, updateOrderStatus);

module.exports = router;
