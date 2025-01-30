if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URL);

async function connectDB() {
  try {
    // await client.connect();
    console.log("✅ Successfully connected to MongoDB");
    return client.db("PickUp_Or_FessUp"); // Make sure this is your correct DB name
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
}

module.exports = { connectDB };
