const { connectDB } = require("./dbconnection.js");
const { app } = require("./app.js");

const PORT = 5000;

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
