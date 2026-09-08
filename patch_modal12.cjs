const fs = require('fs');
let lines = fs.readFileSync('src/components/AiVisionModal.tsx', 'utf8').split('\n');

for (let i = Math.max(0, 210); i < 225; i++) {
  if (lines[i].includes('</div>')) {
    // wait, let's just find the one right before `) : (`
    if (lines[i + 1] && lines[i + 1].includes(') : (')) {
       lines[i] = lines[i].replace('</div>', '</>');
       break;
    }
  }
}
fs.writeFileSync('src/components/AiVisionModal.tsx', lines.join('\n'), 'utf8');
