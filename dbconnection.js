const mongoose = require("mongoose");

async function connectDB(uri) {
  try {
    const connectionInstance = await mongoose.connect(uri);
    console.log(
      `\nMongoDB connected !! DB Host : ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log(`Mongoose Error || ${error}`);
    process.exit(1);
  }
}

module.exports = { connectDB };
