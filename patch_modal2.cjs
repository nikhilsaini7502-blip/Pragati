const fs = require('fs');
let content = fs.readFileSync('src/components/AiVisionModal.tsx', 'utf8');

// Change initial state
content = content.replace("const [quantity, setQuantity] = useState('65');", "const [quantity, setQuantity] = useState('');");
content = content.replace("const [expectedPrice, setExpectedPrice] = useState('2400');", "const [expectedPrice, setExpectedPrice] = useState('');");

// We need to wrap the Quick Lot Register form
const registerFormRegex = /\{\/\* Quick Lot Register Form within Modal \*\/\}[\s\S]*?(?=\{\/\* Footer actions \*\/)/;
const match = content.match(registerFormRegex);

if (match) {
  let formContent = match[0];
  // Wrap it conditionally
  let newFormContent = `{analysisResult && !isScanning && (\n          ` + formContent.replace(/\n/g, '\n          ').trimEnd() + `\n        )}\n        `;
  content = content.replace(registerFormRegex, newFormContent);
  fs.writeFileSync('src/components/AiVisionModal.tsx', content, 'utf8');
  console.log("Successfully wrapped form");
} else {
  console.log("Could not find Quick Lot Register Form");
}
