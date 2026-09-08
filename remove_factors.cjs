const fs = require('fs');
let content = fs.readFileSync('src/components/AgroPriceSuggester.tsx', 'utf8');

const regex = /\{\/\* 4 Calculation Factor Vectors Breakdown Matrix \*\/\}[\s\S]*?(?=\{\/\* 7-Day Day-by-Day Trajectory Curve \*\/)/;
content = content.replace(regex, "");

fs.writeFileSync('src/components/AgroPriceSuggester.tsx', content, 'utf8');
console.log("Factors removed");
