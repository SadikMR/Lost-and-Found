import { React, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../AuthProviders/AuthProvider";
import image from "../../../assets/profilePic.jpg";
import "./conversation.css";

const endpoints = import.meta.env.VITE_backendUrl;

const Conversations = () => {
  const { getCurrentUser } = useContext(AuthContext);
  const user = getCurrentUser();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [styleType, setStyleType] = useState("modern"); // You can toggle this to "classic" for classic style

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        console.log("User UID:", user?.uid);
        if (!user?.uid) {
          console.error("User UID is not available");
          return;
        }

        setLoading(true);

        const res = await axios.get(
          `${endpoints}/chat/getConversations/${user?.uid}`
        );
        console.log("Full API Response:", res);
        console.log("Response Data:", res.data);

        const conversationsData = res.data?.data || [];
        console.log("Fetched Conversations:", conversationsData);
        setConversations(conversationsData);
      } catch (err) {
        console.error("Error fetching conversations:", err);
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchConversations();
    } else {
      console.log("Waiting for user data...");
    }
  }, [user]);

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading user...
      </div>
    );
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid Date";
    }

    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options); // Returns in the format: "10 Sept 2024"
  };

  return (
    <div className="bg-gray-300">
      <div className="flex flex-col h-screen max-w-4xl mx-auto mt-auto bg-gray-100 p-4 pt-8 pb-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Conversations
        </h2>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-600">Loading conversations...</p>
          </div>
        ) : Array.isArray(conversations) && conversations.length > 0 ? (
          conversations.map((conv) => {
            const otherUser =
              conv.senderID === user.uid ? conv.receiver : conv.sender;
            const conversationStyle =
              styleType === "modern"
                ? "modern-conversation"
                : "classic-conversation";

            return (
              <Link
                key={conv._id}
                to={`/chat?senderID=${user.uid}&receiverID=${
                  otherUser?.firebase_uid || ""
                }&senderInfo=${encodeURIComponent(
                  JSON.stringify(user)
                )}&receiverInfo=${encodeURIComponent(
                  JSON.stringify(otherUser)
                )}`}
                className={`block p-4 mb-4 rounded-lg shadow-lg ${conversationStyle} hover:bg-gray-50 transition`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={otherUser?.image}
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 conversation-info">
                    <h4 className="font-semibold text-lg">
                      {otherUser?.fullname || "Unknown User"}
                    </h4>
                    <p className="truncate">
                      {conv.latestMessage || "No messages yet"}
                    </p>
                  </div>
                  <div className="text-gray-500 text-xs conversation-date">
                    <p>{formatDate(conv.createdAt)}</p>{" "}
                  </div>
                  {/* Unread count */}
                  {conv.unreadCount > 0 && (
                    <div className="unread-count">{conv.unreadCount}</div>
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-center text-gray-600">
            No conversations found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;
