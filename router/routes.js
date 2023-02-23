const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/signup");
const { signin } = require("../controllers/signin");
const { resetPassword } = require("../controllers/resetPassword");
const { authenticate } = require("../middleware/authenticate");
// const {updateUserInfo} = require("../controllers/updateUserInfo");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/resetPassword", authenticate, resetPassword);
// router.post("/updateUserInfo", updateUserInfo);

module.exports = router;
