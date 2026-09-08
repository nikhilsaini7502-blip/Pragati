const fs = require('fs');
const filepath = 'server.ts';
let content = fs.readFileSync(filepath, 'utf8');

// Crop Fallback Fix
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

// Pest Fallback Fix
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
console.log("Patched server API");
