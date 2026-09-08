const fs = require('fs');
let content = fs.readFileSync('src/components/AiVisionModal.tsx', 'utf8');

const targetStr = `{analysisResult && !isScanning && (
          <>
          {/* Quick Lot Register Form within Modal */}`;

const targetStrAlt = `{analysisResult && !isScanning && (
          {/* Quick Lot Register Form within Modal */}`;

if (content.includes(targetStrAlt)) {
  content = content.replace(targetStrAlt, `{analysisResult && !isScanning && (
          <>
          {/* Quick Lot Register Form within Modal */}`);
  fs.writeFileSync('src/components/AiVisionModal.tsx', content, 'utf8');
  console.log("Successfully fixed the missing fragment");
} else {
  console.log("String not found");
}
