import { React, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../AuthProviders/AuthProvider";
import image from "../../../assets/profilePic.jpg";
import "./chat.css";

const endpoints = import.meta.env.VITE_backendUrl;

const Conversations = () => {
  const { getCurrentUser } = useContext(AuthContext);
  const user = getCurrentUser();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        console.log("User UID:", user?.uid);
        if (!user?.uid) {
          console.error("User UID is not available");
          return;
        }

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
      }
    };

    if (user?.uid) {
      fetchConversations();
    } else {
      console.log("Waiting for user data...");
    }
  }, [user]);

  if (!user)
    return <div className="flex justify-center items-center">Loading...</div>;

  console.log("Conversations State:", conversations);

  return (
    <div className="bg-gray-300">
      <div className="flex flex-col h-screen max-w-4xl mx-auto mt-auto bg-gray-100 p-4 pt-8 pb-8">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          Conversations
        </h2>

        {/* Conversations Container */}
        {Array.isArray(conversations) && conversations.length > 0 ? (
          conversations.map((conv) => {
            const otherUser =
              conv.senderID === user.uid ? conv.receiver : conv.sender;

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
                className="block p-4 mb-4 rounded-lg shadow-lg bg-white hover:bg-gray-50 transition"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={image}
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-gray-800">
                      {otherUser?.fullname || "Unknown User"}
                    </h4>
                    <p className="text-gray-600 text-sm truncate">
                      {conv.latestMessage || "No messages yet"}
                    </p>
                  </div>
                  <div className="text-gray-500 text-xs">
                    <p>{new Date(conv.timestamp).toLocaleDateString()}</p>
                  </div>
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
