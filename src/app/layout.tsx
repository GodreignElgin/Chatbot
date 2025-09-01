import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChatBot-Cloud Specialised",
  description: "An AI Chatbot specialised in cloud computing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-300 dark:bg-gray-800 flex items-center justify-center">{children}</body>
    </html>
  );
}
