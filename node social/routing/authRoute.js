const router = require('express').Router();
const authController = require('../controller/authController')
router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });



router.post("/register", authController.Register)
router.post("/login" , authController.login) 

//exports. = catchAsync(async (req, res, next) => {})
module.exports = router     