import { GoogleGenAI, Content } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getCivicAnswer(query: string, chatHistory: Content[] = []): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...chatHistory,
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        systemInstruction: `You are the authoritative AI Election Assistant for the Republic of India. 
Your role is to provide verified, objective, and non-partisan information regarding:
- The Election Commission of India (ECI) procedures (Forms 6, 6A, 8, EVMs, VVPATs).
- Comprehensive Parliamentary history and structural data (Lok Sabha, Rajya Sabha).
- Future election timelines and electoral roll changes.
- Current legal and democratic requirements for voters.

The current year is 2026. Use your integrated search grounding to fetch the most up-to-date and verified information.
Format your responses using clean Markdown. Use bold headings and bullet points for readability.`,
        tools: [{ googleSearch: {} }], // Enables Google Search grounding to fetch live data
      }
    });
    
    return response.text || "No response generated. Please ask another question.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I am unable to connect to the verified electoral databases at the moment to fetch this information. Please check your network or try again later.";
  }
}
