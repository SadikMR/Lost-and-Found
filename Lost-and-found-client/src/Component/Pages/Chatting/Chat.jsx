import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import socketIO from "socket.io-client";
import axios from "axios";
import "./chat.css";

const endpoints = import.meta.env.VITE_backendUrl;

const socket = socketIO.connect(endpoints);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showDate, setShowDate] = useState(null);
  const location = useLocation();
  const messagesEndRef = useRef(null);

  const queryParams = new URLSearchParams(location.search);

  const senderID = queryParams.get("senderID");
  const receiverID = queryParams.get("receiverID");
  const senderInfo = JSON.parse(queryParams.get("senderInfo"));
  const receiverInfo = JSON.parse(queryParams.get("receiverInfo"));

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (senderID && receiverID) {
      socket.emit("setup", { id: senderID });

      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `${endpoints}/chat/getMessages/${senderID}/${receiverID}`
          );
          if (response.data.success) {
            setMessages(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();

      socket.on("receiveMessage", (data) => {
        if (
          (data.senderID === senderID && data.receiverID === receiverID) ||
          (data.senderID === receiverID && data.receiverID === senderID)
        ) {
          setMessages((prevMessages) => [...prevMessages, data]);
        }
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [senderID, receiverID]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await axios.post(`${endpoints}/chat/sendMessage`, {
        senderID,
        receiverID,
        message,
      });

      if (response.data.success) {
        socket.emit("sendMessage", { senderID, receiverID, message });
        setMessages((prev) => [
          ...prev,
          { senderID, receiverID, message, createdAt: new Date() },
        ]);
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  // Get initials for avatar fallback
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
    <div className="chat-page-wrapper">
      {/* Header */}
      <div className="chat-header">
        {receiverInfo?.image ? (
          <img
            src={receiverInfo.image}
            alt={receiverInfo.fullname}
            className="chat-header-avatar"
          />
        ) : (
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "#fff",
              border: "2px solid rgba(255,255,255,0.6)",
            }}
          >
            {getInitials(receiverInfo?.fullname)}
          </div>
        )}
        <div>
          <div className="chat-header-name">
            {receiverInfo?.fullname || "Unknown User"}
          </div>
          <div className="chat-header-status">Online</div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="chat-messages-area">
        {messages.length === 0 && (
          <div className="chat-empty">
            <div className="chat-empty-icon">💬</div>
            <div className="chat-empty-text">
              No messages yet. Say hello!
            </div>
          </div>
        )}

        {messages.map((msg, index) => {
          const isSender = msg.senderID === senderID;
          return (
            <div
              key={index}
              className={`chat-msg-row ${isSender ? "sent" : ""}`}
            >
              <div
                className={`chat-bubble ${
                  isSender ? "sent-bubble" : "received-bubble"
                }`}
                onClick={() => setShowDate(showDate === index ? null : index)}
              >
                <p>{msg.message}</p>
                {showDate === index && (
                  <p className="chat-bubble-time">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="chat-input-bar">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message…"
          className="chat-input-field"
        />
        <button onClick={handleSendMessage} className="chat-send-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
