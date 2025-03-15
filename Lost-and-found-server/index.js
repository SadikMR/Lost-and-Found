const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const lostPostRoutes = require("./routes/lostPostRoutes");
const foundPostRoutes = require("./routes/foundPostRoutes");
const chatRoutes = require("./routes/chatRoutes");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");
const verificationRoutes = require("./routes/verificationRoutes");

dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL.trim();
const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8ouim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

//establishing mongodb connection
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
    process.exit(1);
  });

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

// Set 'io' globally to access it in the routes
app.set("io", io);

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// Routes
app.use("/posts/lost", lostPostRoutes);
app.use("/posts/found", foundPostRoutes);
app.use("/chat", chatRoutes);
app.use("/user", userRoutes);
app.use("/Verify", verificationRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Lost and Found Server is running...");
});

// Error Handling
app.use(errorHandler);

// Store socket connections by user ID
const userSockets = new Map();

// Handle socket connection
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Store user socket on connection
  socket.on("setup", (userData) => {
    userSockets.set(userData.id, socket.id);
    socket.emit("connected");
  });

  // Handle sending a message
  socket.on("sendMessage", ({ senderID, receiverID, message }) => {
    const receiverSocket = userSockets.get(receiverID);
    if (receiverSocket) {
      io.to(receiverSocket).emit("receiveMessage", {
        senderID,
        receiverID,
        message,
        timestamp: new Date().toISOString(),
      });
      console.log(`Message sent from ${senderID} to ${receiverID}`);
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    userSockets.delete(socket.id);
    console.log(`User disconnected: ${socket.id}`);
  });
});

//define port
const PORT = process.env.PORT || 5002;

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
