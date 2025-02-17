import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  if (!API_KEY) {
    console.error("🚨 Gemini API Key is missing!");
    return "API key not found. Please check your configuration.";
  }

  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            role: "user",
            parts: [
              { text: "You are a specialized cloud computing chatbot. Answer cloud-related queries or guide the user to ask relevant questions." },
              { text: "User Query: " + userMessage },
              { text: "Format the response in concise bullet points and keep it short." }
            ],
          }
        ],
      },
      {
        params: { key: API_KEY },
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("✅ API Response:", JSON.stringify(response.data, null, 2));

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Gemini API Error:", error.response?.data || error.message);

      if (error.response) {
        console.error("🔎 Full Error Response:", JSON.stringify(error.response.data, null, 2));
      }

      if (error.response?.status === 400) {
        console.error("🛑 Bad Request - Invalid payload!");
        return "Bad request. Please check the input format.";
      }

      return "There was an issue processing your request. Please try again.";
    } else if (error instanceof Error) {
      console.error("⚠️ Unexpected Error:", error.message);
      return "An unexpected error occurred. Please try again.";
    }

    return "An unknown error occurred.";
  }
};
