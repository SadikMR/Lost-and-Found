const express = require("express");
const { sendMessage, getMessages } = require("../controllers/chatController");

const router = express.Router();

router.post("/sendMessage", (req, res) => {
  sendMessage(req, res);
});

router.get("/getMessages/:senderID/:receiverID", getMessages);

module.exports = router;
