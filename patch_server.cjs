const fs = require('fs');

const content = fs.readFileSync('server.ts', 'utf8');

const newRoute = `
// Gemini Pest & Disease Detector Endpoint
app.post("/api/analyze-pest", async (req, res) => {
  try {
    const { imageBase64, summary, language = 'en' } = req.body;
    const ai = getGenAiClient();
    
    if (!ai || !imageBase64) {
      return res.status(400).json({ error: "Missing API key or image data" });
    }

    const base64Data = imageBase64.replace(/^data:image\\/\\w+;base64,/, "");
    const mimeType = imageBase64.startsWith('data:image/png') ? 'image/png' : 'image/jpeg';
    
    const langInstruction = 
      language === 'mr' ? 'Respond ENTIRELY in Marathi (मराठी).' :
      language === 'hi' ? 'Respond ENTIRELY in Hindi (हिंदी).' :
      'Respond in English.';

    const prompt = \`
You are an expert Agronomist and Plant Pathologist.
Analyze the provided crop image and the farmer's summary: "\${summary}"

Identify any pests, diseases, or deficiencies.
\${langInstruction}

Return ONLY a JSON object matching this exact schema:
{
  "diseaseName": "Common Name of the Pest/Disease",
  "confidence": "High | Medium | Low",
  "severity": "Mild | Moderate | Severe",
  "identificationDetails": "Brief explanation of the symptoms observed in the photo and summary.",
  "homeRemedy": "A detailed, practical organic/home-made cure or preventative measure.",
  "chemicalCure": "Recommended commercial chemical/medicinal cure and dosage (with safety warning)."
}
\`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            diseaseName: { type: "STRING" },
            confidence: { type: "STRING" },
            severity: { type: "STRING" },
            identificationDetails: { type: "STRING" },
            homeRemedy: { type: "STRING" },
            chemicalCure: { type: "STRING" },
          },
          required: [
            "diseaseName",
            "confidence",
            "severity",
            "identificationDetails",
            "homeRemedy",
            "chemicalCure",
          ],
        },
      },
    });

    const jsonText = response.text?.trim();
    if (jsonText) {
      const result = JSON.parse(jsonText);
      return res.json({
        success: true,
        result,
      });
    } else {
      throw new Error("Empty response from AI");
    }
  } catch (error: any) {
    console.error("Pest analysis error:", error);
    return res.status(500).json({ error: error.message || "Failed to analyze pest/disease" });
  }
});

// Gemini Mandi & Agro Advisor Endpoint`;

const newContent = content.replace('// Gemini Mandi & Agro Advisor Endpoint', newRoute);
fs.writeFileSync('server.ts', newContent, 'utf8');
