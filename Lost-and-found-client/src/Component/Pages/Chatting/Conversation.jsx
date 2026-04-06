import { React, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../AuthProviders/AuthProvider";
import "./conversation.css";

const endpoints = import.meta.env.VITE_backendUrl;

const Conversations = () => {
  const { getCurrentUser } = useContext(AuthContext);
  const user = getCurrentUser();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        if (!user?.uid) return;
        setLoading(true);
        const res = await axios.get(
          `${endpoints}/chat/getConversations/${user?.uid}`
        );
        setConversations(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching conversations:", err);
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) fetchConversations();
  }, [user]);

  if (!user)
    return (
      <div className="conv-page">
        <div className="conv-container">
          <div className="conv-loading">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="conv-skeleton" />
            ))}
          </div>
        </div>
      </div>
    );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    const now = new Date();
    const diff = (now - date) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };

  const getInitials = (name) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "?";

  return (
    <div className="conv-page">
      <div className="conv-container">
        <h2 className="conv-title">Messages</h2>

        {/* Skeleton loading */}
        {loading ? (
          <div className="conv-loading">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="conv-skeleton" />
            ))}
          </div>
        ) : Array.isArray(conversations) && conversations.length > 0 ? (
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
                className="conv-card"
              >
                {/* Avatar */}
                <div className="conv-avatar-wrap">
                  {otherUser?.image ? (
                    <img
                      src={otherUser.image}
                      alt={otherUser.fullname}
                      className="conv-avatar"
                    />
                  ) : (
                    <div className="conv-avatar-initials">
                      {getInitials(otherUser?.fullname)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="conv-info">
                  <div className="conv-name">
                    {otherUser?.fullname || "Unknown User"}
                  </div>
                  <div className="conv-last-msg">
                    {conv.latestMessage || "No messages yet"}
                  </div>
                </div>

                {/* Meta */}
                <div className="conv-meta">
                  <div className="conv-date">{formatDate(conv.createdAt)}</div>
                  {conv.unreadCount > 0 && (
                    <div className="conv-unread">{conv.unreadCount}</div>
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <div className="conv-empty">
            <div className="conv-empty-icon">💬</div>
            <div className="conv-empty-text">No conversations yet</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;
