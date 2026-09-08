const fs = require('fs');

function patchFile(filepath) {
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');

  // Fix summary scope in analyze-pest
  content = content.replace(
    /const summaryLower = \(summary \|\| ""\)\.toLowerCase\(\);/g,
    'const summaryLower = (req.body?.summary || "").toLowerCase();'
  );

  // Fix language scope in advisor
  content = content.replace(
    /let fallbackText = language === 'mr'/g,
    "let fallbackText = req.body?.language === 'mr'"
  );
  content = content.replace(
    /language === 'hi'/g,
    "req.body?.language === 'hi'"
  );
  content = content.replace(
    /language === 'mr'/g,
    "req.body?.language === 'mr'"
  );
  
  // Fix query scope in advisor
  content = content.replace(
    /const q = \(query \|\| ""\)\.toLowerCase\(\);/g,
    'const q = (req.body?.query || "").toLowerCase();'
  );

  fs.writeFileSync(filepath, content, 'utf8');
  console.log("Fixed " + filepath);
}

patchFile('server.ts');
patchFile('api/analyze-pest.ts');
patchFile('api/gemini/advisor.ts');

