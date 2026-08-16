const express = require("express");
const { userSignup, userLogin } = require("../controllers/user.controller");

const router = express.Router();

router.post("/", userSignup);
router.post("/login", userLogin);

module.exports = router;
