const fs = require('fs');
let content = fs.readFileSync('src/components/AgroPriceSuggester.tsx', 'utf8');

content = content.replace(
  "                  ? 'एआय बाजारभाव सल्लागार (Price Suggester & Holding Advisor)'",
  "                  ? 'स्मार्ट दर आणि विक्री सल्लागार'"
);

content = content.replace(
  "                  ? 'एआई मूल्य निर्धारक एवं सलाह (Price Suggester & Holding Advisor)'",
  "                  ? 'स्मार्ट मंडी भाव और बिक्री सलाहकार'"
);

content = content.replace(
  "                  : 'AI Crop Price Suggester & Holding Horizon'",
  "                  : 'Smart Price & Sell Advisor'"
);

fs.writeFileSync('src/components/AgroPriceSuggester.tsx', content, 'utf8');
console.log("Name patched");
