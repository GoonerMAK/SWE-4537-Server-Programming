const express = require("express");
const router = express.Router();
const {
    postProfileImage,
    postMultipleImages,
    getMultipleImages,
    postAudioFile,
    postPgnFile,
} = require("../controllers/media.controller");

// upload images
const {uploadProfileImage, uploadAudioFile, uploadPgnFile } = require("../middlewares/media.middleware")

router.post('/upload/single_image', uploadProfileImage.single('image'), postProfileImage);
router.post('/upload/multiple_image', uploadProfileImage.array('images', 5), postMultipleImages);
router.get('/multiple_image', getMultipleImages)

router.post('/upload/audio', uploadAudioFile.single('audio'), postAudioFile);

router.post('/upload/pgn', uploadPgnFile.single('pgn'), postPgnFile); 

module.exports = router;