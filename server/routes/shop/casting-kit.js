const express = require("express");
const { getAllCastingKits } = require("../../controllers/shop/castingKitController");

const router = express.Router();

// Public route to fetch casting kits
router.get("/", getAllCastingKits);

module.exports = router;
