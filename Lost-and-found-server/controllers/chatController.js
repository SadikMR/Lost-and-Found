const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel"); // Correct path to your userModel file

const { handleError, handleSuccess } = require("../utils/responseHandler");

const sendMessage = async (req, res) => {
  try {
    const { senderID, receiverID, message } = req.body;

    if (!senderID || !receiverID || !message) {
      return handleError(
        res,
        null,
        "Sender, receiver, and message are required"
      );
    }

    // Create and save the new message
    const newMessage = new Message({ senderID, receiverID, message });
    await newMessage.save();

    // Check if a conversation exists
    let conversation = await Conversation.findOne({
      $or: [
        { senderID, receiverID },
        { senderID: receiverID, receiverID: senderID },
      ],
    });

    if (conversation) {
      // Update latest message and timestamp
      conversation.latestMessage = message;
      conversation.latestMessageTime = new Date();
      await conversation.save();
    } else {
      // Create a new conversation
      conversation = new Conversation({
        senderID,
        receiverID,
        latestMessage: message,
        latestMessageTime: new Date(),
      });
      await conversation.save();
    }

    handleSuccess(
      res,
      { message: newMessage, conversation },
      "Message sent and conversation updated"
    );
  } catch (err) {
    console.error("Error sending message:", err);
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

const getConversations = async (req, res) => {
  try {
    const { userID } = req.params;

    if (!userID) {
      return handleError(res, null, "User ID is required");
    }

    // Fetch conversations where the logged-in user is either the sender or receiver
    const conversations = await Conversation.find({
      $or: [{ senderID: userID }, { receiverID: userID }],
    }).sort({ latestMessageTime: -1 }); // Sort by the latest message time

    // Extract unique userIDs (sender and receiver)
    const userIDs = [
      ...new Set(conversations.flatMap((c) => [c.senderID, c.receiverID])),
    ];

    // Fetch user details for sender and receiver based on firebase_uid
    const users = await User.find({ firebase_uid: { $in: userIDs } }).select(
      "firebase_uid fullname image"
    );

    // Create a map for quick lookup of user data by firebase_uid
    const userMap = Object.fromEntries(
      users.map((user) => [user.firebase_uid, user])
    );

    // Attach sender and receiver details to the conversations
    const updatedConversations = conversations.map((conv) => ({
      ...conv.toObject(),
      sender: userMap[conv.senderID] || null,
      receiver: userMap[conv.receiverID] || null,
    }));

    handleSuccess(
      res,
      updatedConversations,
      "Conversations fetched successfully"
    );
  } catch (err) {
    console.error("Error fetching conversations:", err);
    handleError(res, err, "Failed to fetch conversations");
  }
};

module.exports = { sendMessage, getMessages, getConversations };
