const fs = require('fs');
let lines = fs.readFileSync('src/components/AiVisionModal.tsx', 'utf8').split('\n');
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].includes(');')) {
    // Insert </div> before it
    lines.splice(i, 0, '    </div>');
    break;
  }
}
fs.writeFileSync('src/components/AiVisionModal.tsx', lines.join('\n'), 'utf8');
