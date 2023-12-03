// Chatbot.js
import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages update
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    // Add the new user message to the beginning of the messages array
    setMessages([{ text: inputText, sender: "user" }, ...messages]);
    setInputText("");

    try {
      // Make a POST request to the specified URL
      const response = await fetch("http://50a9-14-143-35-158.ngrok-free.app/next_question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage: inputText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the server responds with JSON
      const botResponse = await response.json();

      // Add the chatbot's response to the messages array
      setMessages([{ text: botResponse.botMessage, sender: "bot" }, ...messages]);
    } catch (error) {
      console.error("Error sending message:", error.message);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user" : "bot"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} style={{ marginRight: '10px' }}>Send</button>
        <button onClick={handleClearChat}>Clear Chat</button>
      </div>
    </div>
  );
};

export default Chatbot;
