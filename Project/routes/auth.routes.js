const express = require("express");
const router = express.Router();
const {
    getLogin,
    getRegister,
    postLogin,
    postRegister, 
    postLogout,
    googleLogin,
    googleAuth,
    getForgotPassword,
    postForgotPassword,
    updateProfile,
    getProfileInfos,
    deleteProfile,
} = require("../controllers/auth.controllers");

router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/register", getRegister);
router.post("/register", postRegister);
router.post("/logout", postLogout); 
router.get("/auth/google", googleLogin);
router.get("/auth/google/BongCloud", googleAuth);
router.get("/forgotPassword", getForgotPassword);
router.post("/forgotPassword", postForgotPassword);

router.get("/profiles", getProfileInfos);
router.patch("/update-profile",  updateProfile);
router.delete("/delete-profile/:id", deleteProfile);

module.exports = router;