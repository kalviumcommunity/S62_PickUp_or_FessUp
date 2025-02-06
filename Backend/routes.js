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

// Update a pickup line
router.put("/pickup-lines/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;
    const { content } = req.body;

    if (!content) return res.status(400).json({ message: "Content is required" });

    const result = await db.collection("PickupLine").updateOne(
      { _id: new ObjectId(id) },
      { $set: { content } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Pickup line not found" });
    }

    res.json({ message: "Pickup line updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating pickup line", error: error.message });
  }
});

// Delete a pickup line
const { ObjectId } = require("mongodb");

router.delete("/pickup-lines/:id", async (req, res) => {
  try {
    const db = await connectDB(); // Ensure database connection
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Object ID" });
    }

    const result = await db.collection("PickupLine").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Pickup line not found" });
    }

    res.json({ message: "Pickup line deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting pickup line", error: error.message });
  }
});

// Delete a regret
router.delete("/regrets/:id", async (req, res) => {
    try {
    const db = await connectDB(); // Ensure database connection
    const { id } = req.params;


    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Object ID" });
    }


    const result = await db.collection("Regret").deleteOne({ _id: new ObjectId(id) });


    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Regret not found" });
    }


    res.json({ message: "Regret deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Regret", error: error.message });
  }
});


// Update a regret
router.put("/regrets/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;
    const { content } = req.body;

    if (!content) return res.status(400).json({ message: "Content is required" });

    const result = await db.collection("Regret").updateOne(
      { _id: new ObjectId(id) },
      { $set: { content } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Regret not found" });
    }

    res.json({ message: "Regret updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating regret", error: error.message });
  }
});


module.exports = router;
