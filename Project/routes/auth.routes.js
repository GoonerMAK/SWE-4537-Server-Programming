const express = require("express");
const router = express.Router();
const {
    getLogin,
    getRegister,
    postLogin,
    postRegister, 
    postLogout,
    updateProfile,
    getProfileInfos,
    deleteProfile,
    getForgotPassword,
    postForgotPassword
    } = require("../controllers/auth.controllers");

router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/register", getRegister);
router.post("/register", postRegister);
router.post("/logout", postLogout); 
router.get("/forgotPassword", getForgotPassword);
router.post("/forgotPassword", postForgotPassword);


router.get("/profiles", getProfileInfos);
router.patch("/update-profile",  updateProfile);
router.delete("/delete-profile/:id", deleteProfile);


// upload images
const {uploadProfileImage, uploadAudioFile} = require("../middlewares/media.middleware")
const {
  postProfileImage,postMultipleImages, getMultipleImages,
  postAudioFile,
  } = require("../controllers/auth.controllers");
  
router.post('/upload/single_image', uploadProfileImage.single('image'), postProfileImage);
router.post('/upload/multiple_image', uploadProfileImage.array('images', 5), postMultipleImages);
router.get('/multiple_image', getMultipleImages)

router.post('/upload/audio', uploadAudioFile.single('audio'), postAudioFile);

module.exports = router;