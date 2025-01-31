const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./DB/mongo-client.js"); // Import the fixed DB connection
const routes = require("./routes.js");

const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors()); // Allow frontend to access backend

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this port
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow the relevant HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);
// Ensure database connection before starting the server
app.use("/api", routes);

app.get("/ping", (req, res) => {
  return res.send("This is the ping route");
});

app.get("/", async (req, res) => {
  const dbStatus = (await connectDB()) ? "connected" : "disconnected";
  res.send(`<h3>Database Connection Status: ${dbStatus}</h3>`);
});

connectDB()
  .then((db) => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ Error initializing database:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
