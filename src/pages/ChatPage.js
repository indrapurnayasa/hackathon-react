import React, { useState, useRef, useEffect } from "react";
import { ArrowUpCircle } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply = {
        from: "bot",
        text: "This is a mock response from AI. Implement actual logic here.",
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">AI Chat</h1>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[70vh]">
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
        {isTyping && (
          <div className="mr-auto bg-gray-100 text-gray-500 text-sm px-4 py-2 rounded-lg max-w-max">
            Typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          autoFocus
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm"
        />
        <button onClick={handleSend} disabled={!input.trim()}>
          <ArrowUpCircle
            className={`w-6 h-6 ${
              input.trim()
                ? "text-blue-600 hover:text-blue-700"
                : "text-gray-400"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
