const express = require("express");

const {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} = require("../../controllers/shop/address-controller");
const { verifyToken } = require("../../middleware/verifyToken");

const router = express.Router();

router.post("/add", verifyToken, addAddress);
router.get("/get/:userId", verifyToken, fetchAllAddress);
router.delete("/delete/:userId/:addressId", verifyToken, deleteAddress);
router.put("/update/:userId/:addressId", verifyToken, editAddress);

module.exports = router;
