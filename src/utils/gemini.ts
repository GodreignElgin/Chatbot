import axios from "axios";

export const getGeminiResponse = async (chatHistory: { text: string; isUser: boolean }[]): Promise<string> => {
  try {
    const response = await axios.post("/api/gemini", { chatHistory });

    console.log("✅ API Response:", JSON.stringify(response.data, null, 2));

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
  } catch (error: any) {
    console.error("❌ Error Fetching Gemini Response:", error.response?.data || error.message);
    return "There was an issue processing your request. Please try again.";
  }
};
