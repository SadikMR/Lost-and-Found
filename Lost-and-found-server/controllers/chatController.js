const Message = require("../models/messageModel");
const { handleError, handleSuccess } = require("../utils/responseHandler");

const sendMessage = async (req, res) => {
  try {
    const { senderID, receiverID, message } = req.body;

    if (!senderID || !receiverID || !message) {
      return handleError(
        res,
        null,
        "sender, receiver, and message are required"
      );
    }
    const newMessage = new Message({ senderID, receiverID, message });
    await newMessage.save();

    handleSuccess(res, newMessage, "Message sent successfully");
  } catch (err) {
    console.error("Error in sending message:", err);
    handleError(res, err, "Failed to send message");
  }
};

const getMessages = async (req, res) => {
  try {
    const { senderID, receiverID } = req.params;

    const messages = await Message.find({
      $or: [
        { senderID, receiverID },
        { senderID: receiverID, receiverID: senderID },
      ],
    }).sort({ createdAt: 1 });

    handleSuccess(res, messages, "Messages fetched successfully");
  } catch (err) {
    console.error("Error:", err);
    handleError(res, err, "Failed to fetch messages");
  }
};

module.exports = { sendMessage, getMessages };
