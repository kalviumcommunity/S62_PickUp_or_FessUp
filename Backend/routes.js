const express = require("express");
const router = express.Router();
const { connectDB } = require("./DB/mongo-client.js"); // Ensure this is correctly imported
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded Token:", decoded); // Debug log
    req.user = decoded; // Attach user data
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
}
// Test route to see if routes are working
router.get("/", (req, res) => {
  res.send("API is working");
});

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const db = await connectDB();
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await db.collection("Users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword };
    
    await db.collection("Users").insertOne(newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error: error.message });
  }
});

// Login Route
// Login Route (Sets Cookie)
router.post("/login", async (req, res) => {
  try {
    const db = await connectDB();
    const { email, password } = req.body;

    const user = await db.collection("Users").findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, name: user.name }, SECRET_KEY, { expiresIn: "1h" });

    // Set a cookie with the username
    res.cookie("username", user.name, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });

    res.json({ message: "Login successful", token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (error) {
  console.error("LOGIN ERROR:", error);
  res.status(500).json({ message: error.message });
}
});

// Logout Route (Clears Cookie)
router.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.json({ message: "Logged out successfully" });
});

// Protected route example (Fetching User Data)
router.get("/users/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid user ID" });

    const user = await db.collection("Users").findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
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
router.post("/add-pickup-line", authenticate, async (req, res) => {
  try {
    const db = await connectDB();
    const { content } = req.body;

    if (!content) return res.status(400).json({ message: "Content is required" });

    const newPickupLine = {
      content,
      createdBy: req.user.name, // Attach logged-in user's name
      createdAt: new Date()
    };
    console.log("User in add-pickup-line route:", req.user);
    console.log("User from middleware:", req.user);

  
    await db.collection("PickupLine").insertOne(newPickupLine);
    res.json({ message: "Pickup line added successfully!", newPickupLine });
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
router.post("/add-regret", authenticate, async (req, res) => {
  try {
    const db = await connectDB();
    const { content } = req.body;

    if (!content) return res.status(400).json({ message: "Content is required" });

    const newRegret = {
      content,
      createdBy: req.user.name || "Anonymous", // Attach logged-in user's name
      createdAt: new Date()
    };

    await db.collection("Regret").insertOne(newRegret);
    res.json({ message: "Regret added successfully!", newRegret });
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
