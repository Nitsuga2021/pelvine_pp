const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests (useful for frontend-backend communication)
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend files

// API Route (Equivalent to Apps Script doGet())
app.get("/api/data", (req, res) => {
    res.json({ message: "Hello from the backend!", status: "success" });
});

// API Route (Equivalent to Apps Script doPost())
app.post("/api/submit", (req, res) => {
    console.log("Received data:", req.body);
    res.json({ message: "Data received successfully!", receivedData: req.body });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
