import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText";

export async function POST(req: Request) {
  if (!API_KEY) {
    return NextResponse.json({ error: "API key is missing!" }, { status: 500 });
  }

  try {
    const { chatHistory } = await req.json();

    const formattedHistory = chatHistory.map((msg: { text: string; isUser: boolean }) => ({
      role: msg.isUser ? "user" : "model",
      parts: [
        { text: "You are a specialized cloud computing chatbot. Answer cloud-related queries or guide the user to ask relevant questions." },
        { text: "User Query: " + msg.text },
        { text: "Format the response in concise bullet points and keep it short." }
      ],
    }));

    const response = await axios.post(
      GEMINI_API_URL,
      { contents: formattedHistory },
      {
        params: { key: API_KEY },
        headers: { "Content-Type": "application/json" },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("❌ Gemini API Error:", error.response?.data || error.message);
    return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 });
  }
}
