import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, Loader2 } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/chats", { message: input });
      const botMessage = { role: "bot", content: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white shadow-lg rounded-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${msg.role === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-700 text-white self-start"}`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="flex items-center space-x-2">
            <Loader2 className="animate-spin" />
            <span>Generating response...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-1/2 m-auto p-4 border-t border-gray-700 flex items-center space-x-2 bg-gray-800">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none bg-gray-700 text-white border-gray-600"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
