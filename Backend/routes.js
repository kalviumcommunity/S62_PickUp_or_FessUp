const express = require("express");
const router = express.Router();
const { connectDB } = require("./DB/mongo-client.js"); // Ensure this is correctly imported

// Test route to see if routes are working
router.get("/", (req, res) => {
  res.send("API is working");
});

// Route to get users
router.get("/users", async (req, res) => {
  try {
    const db = await connectDB();
    // console.log(collection);
    const users = await db.collection("user").find().toArray();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", er: error.message });
  }
});

module.exports = router;
