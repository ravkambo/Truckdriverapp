import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured. Please set it in your environment variables.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

export async function extractLicenseData(base64Image: string, mimeType: string) {
  const response = await getAI().models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            text: `Extract the following information from this driver's license image. Return ONLY a JSON object with these keys: 
            licenseNumber, state, country, class, expirationDate (YYYY-MM-DD), physicalExpirationDate (YYYY-MM-DD). 
            If a field is not found, use an empty string.`,
          },
          {
            inlineData: {
              data: base64Image.split(',')[1] || base64Image,
              mimeType: mimeType,
            },
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
    },
  });

  try {
    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Failed to extract data from license image");
  }
}
