import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post(`${API_URL}/chat`, {
        message: input,
      });

      const botMessage = { from: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error connecting to the server." },
      ]);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>Gemini Chatbot</h2>
      <div
        style={{
          minHeight: 300,
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <strong>{msg.from === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message..."
        style={{
          width: "75%",
          padding: 10,
          borderRadius: 5,
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={sendMessage}
        style={{
          padding: 10,
          marginLeft: 10,
          borderRadius: 5,
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default App;
