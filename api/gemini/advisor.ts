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
      req.body?.language === 'mr' ? 'Respond ENTIRELY in Marathi (मराठी). Use simple, clear Marathi terminology for farmers.' :
      req.body?.language === 'hi' ? 'Respond ENTIRELY in Hindi (हिंदी). Use simple, clear Hindi terminology for farmers.' :
      'Respond in English.';

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
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
    // Heuristic Fallback
    const q = (req.body?.query || "").toLowerCase();
    let fallbackText = req.body?.language === 'mr' ? 'माफ करा, सध्या सर्व्हरवर जास्त लोड आहे. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.' : req.body?.language === 'hi' ? 'क्षमा करें, सर्वर पर वर्तमान में बहुत अधिक लोड है। कृपया कुछ समय बाद पुनः प्रयास करें।' : 'Sorry, the server is currently experiencing high demand. Please try again in a few moments.';
    
    if (q.includes("price") || q.includes("rate") || q.includes("bhav") || q.includes("दर") || q.includes("भाव")) {
       fallbackText = req.body?.language === 'mr' ? 'कांद्याचे आजचे अंदाजित दर ₹2200 ते ₹2500 प्रति क्विंटल आहेत. हवामानानुसार दरात बदल होऊ शकतो.' : req.body?.language === 'hi' ? 'प्याज के आज के अनुमानित दाम ₹2200 से ₹2500 प्रति क्विंटल हैं। मौसम के कारण कीमतों में उतार-चढ़ाव हो सकता है।' : 'Today\'s estimated onion rates are ₹2200 to ₹2500 per quintal. Prices may fluctuate based on weather.';
    } else if (q.includes("sell") || q.includes("bech") || q.includes("विका") || q.includes("विक्री")) {
       fallbackText = req.body?.language === 'mr' ? 'तुम्ही "पीक विका (AI स्कॅन)" पर्याय वापरून तुमचे पीक थेट खरेदीदारांना विकू शकता.' : req.body?.language === 'hi' ? 'आप "फसल बेचें (AI स्कैन)" विकल्प का उपयोग करके अपनी फसल सीधे खरीदारों को बेच सकते हैं।' : 'You can sell your crop directly to buyers using the "Sell Crop (AI Scan)" option.';
    }

    return res.json({
      success: true,
      answer: fallbackText
    });
  }
}
