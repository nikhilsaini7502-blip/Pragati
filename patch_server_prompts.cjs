const fs = require('fs');

const filepath = 'server.ts';
let content = fs.readFileSync(filepath, 'utf8');

// Crop schema update
const oldCropPrompt = `        const prompt = \`You are a strict, highly accurate Agricultural Produce Grader and Computer Vision Assayer.
Analyze this crop image and the user's hint: "\${cropHint}".
Determine the precise crop name, grade, score (0-100), if it's spoiled/rotten, and exact metrics.
Be brutally honest about quality.\`;`;

const newCropPrompt = `        const prompt = \`You are a strict, highly accurate Agricultural Produce Grader and Computer Vision Assayer.
Analyze this image and the user's hint: "\${cropHint}".
FIRST, check if the image actually contains an agricultural crop, produce, or plant. If it DOES NOT (e.g., it is a person, hand, pen, phone, room, screenshot, etc.), set isCropDetected to false and fill the rest with empty strings/0.
If it IS a crop, set isCropDetected to true, determine the precise crop name, grade, score (0-100), if it's spoiled/rotten, and exact metrics. Be brutally honest about quality.\`;`;

content = content.replace(oldCropPrompt, newCropPrompt);

content = content.replace(
  `                cropName: { type: Type.STRING },`,
  `                isCropDetected: { type: Type.BOOLEAN },\n                cropName: { type: Type.STRING },`
);

content = content.replace(
  `              required: [
                "cropName",
                "grade",`,
  `              required: [
                "isCropDetected",
                "cropName",
                "grade",`
);

// Pest schema update
const oldPestPrompt = `    const prompt = \`
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
\`;`;

const newPestPrompt = `    const prompt = \`
You are an expert Agronomist and Plant Pathologist.
Analyze the provided image and the farmer's summary: "\${summary}".
FIRST, check if the image actually contains an agricultural crop, plant, or leaf. If it DOES NOT (e.g., it is a person, hand, pen, phone, screenshot, etc.), set isCropDetected to false and fill the rest with empty strings.
If it IS a crop, set isCropDetected to true and identify any pests, diseases, or deficiencies.
\${langInstruction}

Return ONLY a JSON object matching this exact schema:
{
  "isCropDetected": true,
  "diseaseName": "Common Name of the Pest/Disease",
  "confidence": "High | Medium | Low",
  "severity": "Mild | Moderate | Severe",
  "identificationDetails": "Brief explanation of the symptoms observed in the photo and summary.",
  "homeRemedy": "A detailed, practical organic/home-made cure or preventative measure.",
  "chemicalCure": "Recommended commercial chemical/medicinal cure and dosage (with safety warning)."
}
\`;`;

content = content.replace(oldPestPrompt, newPestPrompt);

content = content.replace(
  `            diseaseName: { type: Type.STRING },`,
  `            isCropDetected: { type: Type.BOOLEAN },\n            diseaseName: { type: Type.STRING },`
);

content = content.replace(
  `          required: [
            "diseaseName",
            "confidence",`,
  `          required: [
            "isCropDetected",
            "diseaseName",
            "confidence",`
);

fs.writeFileSync(filepath, content, 'utf8');
console.log("Patched server API prompts");
