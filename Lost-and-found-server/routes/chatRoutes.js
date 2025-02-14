const express = require("express");
const {
  sendMessage,
  getMessages,
  getConversations,
} = require("../controllers/chatController");

const router = express.Router();

router.post("/sendMessage", (req, res) => {
  sendMessage(req, res);
});

router.get("/getMessages/:senderID/:receiverID", getMessages);
router.get("/getConversations/:userID", getConversations);

module.exports = router;
