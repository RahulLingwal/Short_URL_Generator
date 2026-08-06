const express = require("express");
const { getShortUrl, getAnalytics } = require("../controllers/url.controller");

const router = express.Router();

router.post("/", getShortUrl);

module.exports = router;
