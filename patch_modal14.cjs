const fs = require('fs');
let lines = fs.readFileSync('src/components/AiVisionModal.tsx', 'utf8').split('\n');

let index409 = 408; // 0-based for line 409
if (lines[index409].includes('</div>')) {
  // Let's just remove that line or change it
  lines[index409] = ''; 
}

fs.writeFileSync('src/components/AiVisionModal.tsx', lines.join('\n'), 'utf8');
