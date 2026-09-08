const fs = require('fs');
let content = fs.readFileSync('src/components/AiVisionModal.tsx', 'utf8');

const regex = /                    <\/div>\n          <\/>\n        \)}\n        \{\/\* Footer actions \*\/\}/;

const newStr = `                    </div>
        )}
        {/* Footer actions */}`;

if (regex.test(content)) {
  content = content.replace(regex, newStr);
  fs.writeFileSync('src/components/AiVisionModal.tsx', content, 'utf8');
  console.log("Successfully removed closing fragment");
} else {
  console.log("Not found");
}

const openRegex = /\{analysisResult && !isScanning && \(\n          <>\n          \{\/\* Quick Lot Register Form within Modal \*\/\}/;
const newOpenStr = `{analysisResult && !isScanning && (
          <div className="w-full">
          {/* Quick Lot Register Form within Modal */}`;

if (openRegex.test(content)) {
  content = content.replace(openRegex, newOpenStr);
  fs.writeFileSync('src/components/AiVisionModal.tsx', content, 'utf8');
  console.log("Successfully changed open fragment to div");
} else {
  console.log("Not found open");
}

