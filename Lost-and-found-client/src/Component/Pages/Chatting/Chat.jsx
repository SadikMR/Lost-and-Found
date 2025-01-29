import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import socketIO from "socket.io-client";
import axios from "axios";
import "./chat.css";
import image from "../../../assets/profilePic.jpg";

const endpoints = import.meta.env.VITE_backendUrl;

const socket = socketIO.connect({endpoints});

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showDate, setShowDate] = useState(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const senderID = queryParams.get("senderID");
  const receiverID = queryParams.get("receiverID");
  const senderInfo = JSON.parse(queryParams.get("senderInfo"));
  const receiverInfo = JSON.parse(queryParams.get("receiverInfo"));

  useEffect(() => {
    if (senderID && receiverID) {
      socket.emit("setup", { id: senderID });

      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `${endpoints}/chat/getMessages/${senderID}/${receiverID}`
          );

          if (response.data.success) {
            const messages = response.data.data;
            setMessages(messages);
          } else {
            console.error("Error fetching messages:", response.data.message);
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
      const response = await axios.post(
        `${endpoints}/chat/sendMessage`,
        {
          senderID: senderID,
          receiverID: receiverID,
          message,
        }
      );

      if (response.data.success) {
        socket.emit("sendMessage", {
          senderID: senderID,
          receiverID: receiverID,
          message,
        });

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            senderID: senderID,
            receiverID: receiverID,
            message,
            createdAt: new Date(),
          },
        ]);
        setMessage("");
      } else {
        console.error("Error sending message:", response.data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle Enter key to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-gray-300">
      <div className="flex flex-col h-screen max-w-4xl mx-auto mt-auto bg-gray-100 p-4 pt-8 pb-8">
        {/* Header displaying receiver's full name */}
        <div className="flex items-center mb-6">
          <img
            src={image}
            alt="Receiver"
            className="w-12 h-12 rounded-full mr-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            {receiverInfo?.data?.fullname}
          </h1>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto bg-white p-4 rounded-lg shadow-md mb-4">
          {messages.map((msg, index) => {
            const isSender = msg.senderID === senderID;

            return (
              <div
                key={index}
                className={`flex mb-4 ${
                  isSender ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    isSender
                      ? "bg-gray-200 text-black rounded-br-none"
                      : "bg-buttonColor1 text-white rounded-bl-none"
                  }`}
                  onClick={() => setShowDate(showDate === index ? null : index)}
                >
                  <p className="text-lg">{msg.message}</p>
                  {showDate === index && (
                    <p className="text-xs text-gray-400 text-right">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input Container */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message"
            className="flex-1 p-3 bg-gray-200 text-black border border-buttonColor1 rounded-lg focus:outline-none focus:ring-2 focus:ring-buttonColor1"
          />
          <button
            onClick={handleSendMessage}
            className="bg-buttonColor1 text-white px-5 py-4 rounded-lg hover:bg-buttonColor3 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
