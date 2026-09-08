import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { query = "Nashik onion market rates", language = "en" } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.json({ success: false, message: "Gemini API key not configured" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const langInstruction = 
      language === 'mr' ? 'Respond ENTIRELY in Marathi (मराठी). Use simple, clear Marathi terminology for farmers.' :
      language === 'hi' ? 'Respond ENTIRELY in Hindi (हिंदी). Use simple, clear Hindi terminology for farmers.' :
      'Respond in English.';

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are Pragati's Official AI Assistant (by Government of Maharashtra).
Your role is to help users navigate the website, resolve queries for Farmers, Buyers, and FPOs, and provide APMC market advisory.
User Question: "${query}"
${langInstruction}
If the question is about the website or general support:
Provide a clear, helpful, and VERY CONCISE answer about how to use Pragati (e.g. AI Crop Scan, Smart Escrow, Market Rates). Max 2-3 sentences.
If the question is about market prices/agriculture:
Provide an authoritative but SHORT response. Max 3 bullet points.
Keep the tone encouraging, professional, and practical. NEVER write long paragraphs. Keep it extremely brief.`,
    });

    return res.json({
      success: true,
      answer: response.text,
    });
  } catch (error: any) {
    console.error("Advisor API error:", error);
    return res.status(500).json({ error: error.message });
  }
}
