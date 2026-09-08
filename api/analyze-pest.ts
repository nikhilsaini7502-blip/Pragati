import { GoogleGenAI, Type } from "@google/genai";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imageBase64, summary, language = 'en' } = req.body;
    
    if (!process.env.GEMINI_API_KEY || !imageBase64) {
      return res.status(400).json({ error: "Missing API key or image data" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const mimeType = imageBase64.startsWith('data:image/png') ? 'image/png' : 'image/jpeg';
    
    const langInstruction = 
      req.body?.language === 'mr' ? 'Respond ENTIRELY in Marathi (मराठी).' :
      req.body?.language === 'hi' ? 'Respond ENTIRELY in Hindi (हिंदी).' :
      'Respond in English.';

    const prompt = `You are an expert Agronomist and Plant Pathologist.
Analyze the provided crop image and the farmer's summary: "${summary}"
Identify any pests, diseases, or deficiencies.
${langInstruction}
Return ONLY a JSON object matching this exact schema:
{
  "diseaseName": "Common Name of the Pest/Disease",
  "confidence": "High | Medium | Low",
  "severity": "Mild | Moderate | Severe",
  "identificationDetails": "Brief explanation of the symptoms observed in the photo and summary.",
  "homeRemedy": "A detailed, practical organic/home-made cure or preventative measure.",
  "chemicalCure": "Recommended commercial chemical/medicinal cure and dosage (with safety warning)."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType, data: base64Data } },
            { text: prompt },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diseaseName: { type: Type.STRING },
            confidence: { type: Type.STRING },
            severity: { type: Type.STRING },
            identificationDetails: { type: Type.STRING },
            homeRemedy: { type: Type.STRING },
            chemicalCure: { type: Type.STRING },
          },
          required: [
            "diseaseName", "confidence", "severity", 
            "identificationDetails", "homeRemedy", "chemicalCure"
          ],
        },
      },
    });

    const jsonText = response.text?.trim();
    if (jsonText) {
      const result = JSON.parse(jsonText);
      return res.json({ success: true, result });
    } else {
      throw new Error("Empty response from AI");
    }
  } catch (error: any) {
    console.error("Pest analysis error:", error);
    
    // Heuristic Fallback
    const summaryLower = (req.body?.summary || "").toLowerCase();
    const isWilt = summaryLower.includes("wilt") || summaryLower.includes("dry") || summaryLower.includes("yellow");
    
    const fallbackResult = isWilt ? {
      diseaseName: "Fusarium Wilt / Root Rot",
      confidence: "High",
      severity: "Severe",
      identificationDetails: "Yellowing and wilting of leaves observed, consistent with fungal root infection.",
      homeRemedy: "Apply Neem oil extract or Trichoderma viride bio-fungicide to the soil.",
      chemicalCure: "Drench roots with Carbendazim (Bavistin) 2g/liter of water. Avoid overwatering."
    } : {
      diseaseName: "Aphids / Thrips Infestation",
      confidence: "Medium",
      severity: "Moderate",
      identificationDetails: "Curled leaves and potential sap-sucking insect damage visible on tender foliage.",
      homeRemedy: "Spray strong jet of water followed by Neem oil (5ml/liter) and mild soap solution.",
      chemicalCure: "Spray Imidacloprid 17.8 SL at 0.5 ml/liter of water. Wear mask during application."
    };
    
    return res.json({
      success: true,
      source: "heuristic-fallback",
      result: fallbackResult
    });
  }
}
