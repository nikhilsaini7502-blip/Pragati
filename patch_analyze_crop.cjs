const fs = require('fs');

const filepath = 'api/analyze-crop.ts';
let content = fs.readFileSync(filepath, 'utf8');

const oldPrompt = `        const prompt = \`You are a strict, highly accurate Agricultural Produce Grader and Computer Vision Assayer.
Analyze this crop image and the user's hint: "\${cropHint}".
Determine the precise crop name, grade, score (0-100), if it's spoiled/rotten, and exact metrics.
Be brutally honest about quality.\`;`;

const newPrompt = `        const prompt = \`You are a strict, highly accurate Agricultural Produce Grader and Computer Vision Assayer.
Analyze this image and the user's hint: "\${cropHint}".
FIRST, check if the image actually contains an agricultural crop, produce, or plant. If it DOES NOT (e.g., it is a person, hand, pen, phone, room, screenshot, etc.), set isCropDetected to false and fill the rest with empty strings/0.
If it IS a crop, set isCropDetected to true, determine the precise crop name, grade, score (0-100), if it's spoiled/rotten, and exact metrics. Be brutally honest about quality.\`;`;

content = content.replace(oldPrompt, newPrompt);

// Schema addition
content = content.replace(
  `                cropName: { type: Type.STRING },`,
  `                isCropDetected: { type: Type.BOOLEAN },\n                cropName: { type: Type.STRING },`
);

content = content.replace(
  `              required: [
                "cropName", "grade", "score", "isSpoiledOrRotten", 
                "moisture", "uniformity", "defects", "shelfLife", 
                "mspBonus", "findings", "recommendation"
              ],`,
  `              required: [
                "isCropDetected", "cropName", "grade", "score", "isSpoiledOrRotten", 
                "moisture", "uniformity", "defects", "shelfLife", 
                "mspBonus", "findings", "recommendation"
              ],`
);

// Fallback addition
content = content.replace(
  `      ? {
          cropName: "Nashik Red Onion (Discolored / Rotting Sample)",`,
  `      ? {
          isCropDetected: true,
          cropName: "Nashik Red Onion (Discolored / Rotting Sample)",`
);

content = content.replace(
  `      : {
          cropName: "Nashik Red Onion (Garva Variety)",`,
  `      : {
          isCropDetected: true,
          cropName: "Nashik Red Onion (Garva Variety)",`
);


fs.writeFileSync(filepath, content, 'utf8');
console.log("Patched crop api");
