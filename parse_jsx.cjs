const fs = require('fs');
const content = fs.readFileSync('src/components/AiVisionModal.tsx', 'utf8');
const lines = content.split('\n');

let openDivs = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const opens = (line.match(/<div/g) || []).length;
  const closes = (line.match(/<\/div>/g) || []).length;
  openDivs += opens - closes;
  if (i > 370 && i < 420) {
    console.log(`${i+1}: opens=${opens} closes=${closes} total=${openDivs} | ${line}`);
  }
}
console.log("Total open divs at end:", openDivs);
