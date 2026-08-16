const express = require("express");
const { redirectToOriginalUrl } = require("../controllers/url.controller");

const router = express.Router();

router.get("/:shortId", redirectToOriginalUrl);

module.exports = router;
