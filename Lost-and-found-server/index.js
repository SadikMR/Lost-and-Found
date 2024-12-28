const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const lostPostRoutes = require("./routes/lostPostRoutes");
const foundPostRoutes = require("./routes/foundPostRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

// MongoDB connection URI
const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8ouim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with a failure code
  });

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/posts/lost", lostPostRoutes);
app.use("/posts/found", foundPostRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Lost and Found Server is running...");
});

// Error Handling
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
