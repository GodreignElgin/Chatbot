import React from "react";
import Lottie from "lottie-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import userAvatar from "@/../public/lottie/user-animation.json";
import botAvatar from "@/../public/lottie/bot-animation.json";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div className={`flex items-end ${isUser ? "justify-end" : "justify-start"} space-x-2`}>
      {/* Bot Avatar */}
      {!isUser && <Lottie animationData={botAvatar} className="w-20 h-20" />}

      {/* Chat Bubble with Linear Gradient */}
      <div
        className={`p-4 rounded-lg text-white shadow-lg max-w-[70%] text-lg`}
        style={{
          background: isUser
            ? "linear-gradient(135deg,rgb(221, 104, 163),rgb(56, 25, 128))" // User: Deep Blue Gradient
            : "linear-gradient(135deg, #121c84,rgb(98, 88, 191))", // Bot: Purple-Red-Orange Gradient
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
      </div>

      {/* User Avatar */}
      {isUser && <Lottie animationData={userAvatar} className="w-10 h-10" />}
    </div>
  );
};

export default ChatMessage;
