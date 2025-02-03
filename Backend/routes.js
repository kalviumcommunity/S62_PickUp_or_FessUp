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

// Fetch all pickup lines
router.get("/pickup-lines", async (req, res) => {
  try {
    const db = await connectDB();
    const pickupLines = await db.collection("PickupLine").find().toArray();
    res.json(pickupLines);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pickup lines", error: error.message });
  }
});

// Add a new pickup line
router.post("/add-pickup-line", async (req, res) => {
  try {
    const db = await connectDB();
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });

    await db.collection("PickupLine").insertOne({ content });
    res.json({ message: "Pickup line added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding pickup line", error: error.message });
  }
});

// Fetch all regrets
router.get("/regrets", async (req, res) => {
  try {
    const db = await connectDB();
    const regrets = await db.collection("Regret").find().toArray();
    res.json(regrets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching regrets", error: error.message });
  }
});

// Add a new regret
router.post("/add-regret", async (req, res) => {
  try {
    const db = await connectDB();
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });

    await db.collection("Regret").insertOne({ content });
    res.json({ message: "Regret added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding regret", error: error.message });
  }
});

module.exports = router;
