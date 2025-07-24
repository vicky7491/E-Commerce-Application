const express = require('express');
const router = express.Router();
const { createCastingKit,getAllCastingKits,deleteCastingKit,uploadCastingKitImage,editCastingKit} = require('../../controllers/admin/casting-kit-controller');
const { upload } = require("../../helpers/cloudinary");
const { verifyTokenAndAdmin } = require('../../middleware/verifyToken');

router.post('/upload-image', upload.single('my_file'), uploadCastingKitImage);
router.post('/create', verifyTokenAndAdmin, createCastingKit);
router.get('/all',  getAllCastingKits);
router.put("/edit/:id", verifyTokenAndAdmin, editCastingKit);
router.delete('/:id', verifyTokenAndAdmin, deleteCastingKit);

module.exports = router;
