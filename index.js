const express = require("express");
const urlRoute = require("./routers/url.routes.js");
const staticRoute = require("./routers/static.routes.js");
const { connectDB } = require("./dbconnection.js");
const URL = require("./models/url.models.js");
const path = require("path");

const app = express();
const PORT = 5000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRoute); // Forward all requests starting with "/url" to the URL router
app.use("/", staticRoute);
app.use(express.static("public"));

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitedHistory: { timestamp: Date.now() },
      },
    },
  );
  res.redirect(entry.redirectURL);
});

// database connection
connectDB("mongodb://localhost:27017/short-url")
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log("Server connection failed!", error);
    }
  })
  .catch((error) => {
    console.error("MongoDB connection failed!", error);
  });
