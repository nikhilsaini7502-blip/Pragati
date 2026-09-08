const fs = require('fs');

const filepath = 'api/analyze-pest.ts';
let content = fs.readFileSync(filepath, 'utf8');

const oldPrompt = `    const prompt = \`You are an expert Agronomist and Plant Pathologist.
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
}\`;`;

const newPrompt = `    const prompt = \`You are an expert Agronomist and Plant Pathologist.
Analyze the provided image and the farmer's summary: "\${summary}".
FIRST, check if the image actually contains an agricultural crop, plant, or leaf. If it DOES NOT (e.g., it is a person, hand, pen, phone, screenshot, etc.), set isCropDetected to false and fill the rest with empty strings.
If it IS a crop, set isCropDetected to true and identify any pests, diseases, or deficiencies.
\${langInstruction}
Return ONLY a JSON object matching this exact schema:
{
  "isCropDetected": true or false,
  "diseaseName": "Common Name of the Pest/Disease",
  "confidence": "High | Medium | Low",
  "severity": "Mild | Moderate | Severe",
  "identificationDetails": "Brief explanation of the symptoms observed in the photo and summary.",
  "homeRemedy": "A detailed, practical organic/home-made cure or preventative measure.",
  "chemicalCure": "Recommended commercial chemical/medicinal cure and dosage (with safety warning)."
}\`;`;

content = content.replace(oldPrompt, newPrompt);

// Schema addition
content = content.replace(
  `            diseaseName: { type: Type.STRING },`,
  `            isCropDetected: { type: Type.BOOLEAN },\n            diseaseName: { type: Type.STRING },`
);

content = content.replace(
  `          required: [
            "diseaseName", "confidence", "severity", 
            "identificationDetails", "homeRemedy", "chemicalCure"
          ],`,
  `          required: [
            "isCropDetected", "diseaseName", "confidence", "severity", 
            "identificationDetails", "homeRemedy", "chemicalCure"
          ],`
);

// Fallback addition
content = content.replace(
  `    const fallbackResult = isWilt ? {
      diseaseName: "Fusarium Wilt / Root Rot",`,
  `    const fallbackResult = isWilt ? {
      isCropDetected: true,
      diseaseName: "Fusarium Wilt / Root Rot",`
);

content = content.replace(
  `    } : {
      diseaseName: "Aphids / Thrips Infestation",`,
  `    } : {
      isCropDetected: true,
      diseaseName: "Aphids / Thrips Infestation",`
);

fs.writeFileSync(filepath, content, 'utf8');
console.log("Patched pest api");
