"use client";

import React, { useState, useRef } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 240)}px`; // Max 10 lines (assuming ~24px per line)
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSend(message);
        setMessage("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";
      }
    }
  };

  return (
    <div className="flex items-center bg-slate-700 p-3 rounded-lg shadow-lg">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-1 resize-none overflow-y-auto p-3 rounded-lg bg-gray-900 text-white  focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ maxHeight: "240px" }} // Limit height to ~10 lines
      />
      <button
        onClick={() => {
          if (message.trim()) {
            onSend(message);
            setMessage("");
            if (textareaRef.current) textareaRef.current.style.height = "auto";
          }
        }}
        className="ml-3 px-10 py-5 text-white rounded-lg hover:bg-blue-600 transition"
        style = {{
          background: "linear-gradient(135deg, rgb(221, 104, 163),rgb(56, 25, 128))",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
