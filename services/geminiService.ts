import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

// Initialize the API client
const getGenAI = () => {
  if (!genAI) {
    if (!process.env.API_KEY) {
      console.error("API_KEY is missing from environment variables.");
      // In a real app, we might handle this gracefully, but instructions say assume it's valid.
    }
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAI;
};

// Initialize or retrieve the chat session
const getChatSession = async (): Promise<Chat> => {
  if (!chatSession) {
    const ai = getGenAI();
    chatSession = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.9, // Higher temperature for more creative/funny responses
        topK: 40,
        topP: 0.95,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (
  message: string,
  onChunk: (text: string) => void
): Promise<string> => {
  try {
    const session = await getChatSession();
    const resultStream = await session.sendMessageStream({ message });

    let fullText = "";
    
    for await (const chunk of resultStream) {
      const c = chunk as GenerateContentResponse;
      const text = c.text;
      if (text) {
        fullText += text;
        onChunk(fullText); // Stream updates back to UI
      }
    }
    return fullText;

  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};