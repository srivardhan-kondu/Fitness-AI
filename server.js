const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Local Connection
const mongoURI = "mongodb://127.0.0.1:27017/getsetfit";  // Local DB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected Locally"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Fitness & Diet Tracker API!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
