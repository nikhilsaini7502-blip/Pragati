const fs = require('fs');
let content = fs.readFileSync('src/utils/cropVisionAnalyzer.ts', 'utf8');

content = content.replace(
  `    return {
      cropName: \`\${displayName} (Rotten / Spoiled Sample)\`,`,
  `    return {
      isCropDetected: true,
      cropName: \`\${displayName} (Rotten / Spoiled Sample)\`,`
);

content = content.replace(
  `    return {
    cropName: \`\${displayName} (Top Class / Quality Certified)\`,`,
  `    return {
    isCropDetected: true,
    cropName: \`\${displayName} (Top Class / Quality Certified)\`,`
);

fs.writeFileSync('src/utils/cropVisionAnalyzer.ts', content, 'utf8');
