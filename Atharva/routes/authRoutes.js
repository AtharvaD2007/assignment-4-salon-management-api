const express = require("express");

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const router = express.Router();


router.get("/", (req, res) => {

    res.status(200).json({
        message: "Welcome to Salon APIs"
    });

});


router.post("/register", registerUser);

router.post("/login", loginUser);


module.exports = router;