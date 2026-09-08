const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('useEffect')) {
    content = content.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';");
}

const useEffectSnippet = `  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRole]);
`;

// Insert after `const [geminiQuery, setGeminiQuery] = useState<string | undefined>(undefined);`
content = content.replace(
  "const [geminiQuery, setGeminiQuery] = useState<string | undefined>(undefined);",
  "const [geminiQuery, setGeminiQuery] = useState<string | undefined>(undefined);\n\n" + useEffectSnippet
);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Scroll patched");
