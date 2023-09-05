const express = require("express");
const router = express.Router();


router.get("/getRequest", (req,res)=>{
    res.send("<h1>This is a GET request!</h1>")
});

router.get('/', function (req, res) {
    res.send("<h1>Welcome to my Web Application!<h1>")
})

module.exports = router;