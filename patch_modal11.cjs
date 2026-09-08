const fs = require('fs');
let lines = fs.readFileSync('src/components/AiVisionModal.tsx', 'utf8').split('\n');

lines[216] = lines[216].replace('</div>', '</>');

// Fix the bottom form part
// From line 370 to 420, we have an extra </div> or missing something?
// Let's just fix the fragment at 217
fs.writeFileSync('src/components/AiVisionModal.tsx', lines.join('\n'), 'utf8');
