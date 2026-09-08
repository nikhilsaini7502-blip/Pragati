const fs = require('fs');
let content = fs.readFileSync('src/components/AiVisionModal.tsx', 'utf8');

content = content.replace("{analysisResult && !isScanning && (\n          {/* Quick Lot Register Form within Modal */}", "{analysisResult && !isScanning && (\n          <>\n          {/* Quick Lot Register Form within Modal */}");

// now find where it closes. We appended `\n        )}\n        ` to the end of the match.
// let's look around line 410 for the closing tag.
