import React, { useState } from "react";
import { ArrowUpCircle } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const botReply = {
      from: "bot",
      text: "This is a mock response from AI. Implement actual logic here.",
    };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">AI Chat</h1>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-md px-4 py-2 rounded-lg ${
              msg.from === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-gray-100 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm"
        />
        <button onClick={handleSend}>
          <ArrowUpCircle className="w-6 h-6 text-blue-600 hover:text-blue-700" />
        </button>
      </div>
    </div>
  );
}
