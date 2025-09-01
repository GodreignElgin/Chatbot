"use client";

import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import Lottie from "lottie-react";
import { getGeminiResponse } from "../utils/gemini";
import typingAnimation from "@/../public/lottie/typing.json";

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "👋 Welcome! I am a Cloud Specialized Chatbot. Ask me anything about cloud computing!", isUser: false },
  ]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages update
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (message: string) => {
    const updatedMessages = [...messages, { text: message, isUser: true }];
    setMessages(updatedMessages);
    setLoading(true);

    const botReply = await getGeminiResponse(updatedMessages.slice(-10));
    setMessages((prev) => [...prev, { text: botReply, isUser: false }]);

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen min-w-[75%] bg-gray-900 p-6">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
        ))}
        {loading && <Lottie animationData={typingAnimation} className="w-16 h-16 mx-auto" />}
        {/* Scroll to bottom ref */}
        <div ref={scrollRef} />
      </div>

      {/* Chat Input */}
      <ChatInput onSend={sendMessage} />
    </div>
  );
};

export default ChatWindow;
