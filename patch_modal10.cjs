const fs = require('fs');
let content = fs.readFileSync('src/components/AiVisionModal.tsx', 'utf8');

content = content.replace("            </>\n          )}\n          {/* Footer actions */}", "            </div>\n          )}\n          {/* Footer actions */}");

// It looks like it didn't match before. Let's do a more robust replace.

const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('</>')) {
    lines[i] = lines[i].replace('</>', '</div>');
  }
}
fs.writeFileSync('src/components/AiVisionModal.tsx', lines.join('\n'), 'utf8');
