const express = require("express");
const { getShortUrl, getAnalytics } = require("../controllers/url.controller");

const router = express.Router();

router.post("/", getShortUrl);
router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
