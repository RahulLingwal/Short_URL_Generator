const { nanoid } = require("nanoid");
const URL = require("../models/url.models.js");

async function getShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "Url required" });

  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitedHistory: [],
  });

  // return res.json({ id: shortId });
  return res.render("home", { id: shortId });
}

async function redirectToOriginalUrl(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );

  res.redirect(entry.redirectURL);
}

module.exports = { getShortUrl, redirectToOriginalUrl };
