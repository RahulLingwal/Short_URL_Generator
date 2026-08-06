const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./dbconnection.js");
const URL = require("./models/url.models.js");
const { requireAuth, checkAuth } = require("./middlewares/auth.middleware.js");

const urlRoute = require("./routers/url.routes.js");
const staticRoute = require("./routers/static.routes.js");
const userRoute = require("./routers/user.routes.js");
const redirectRoute = require("./routers/redirect.routes.js");

const app = express();
const PORT = 5000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// routes
app.use("/url", requireAuth, urlRoute); // Forward all requests starting with "/url" to the URL router
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);
app.use("/", redirectRoute);

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
