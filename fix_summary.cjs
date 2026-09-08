const fs = require('fs');

function patchFile(filepath) {
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');

  content = content.replace(
    /const summaryLower = summary\.toLowerCase\(\);/g,
    'const summaryLower = (req.body?.summary || "").toLowerCase();'
  );
  
  // also check if there is an old one
  content = content.replace(
    /const summaryLower = \(summary \|\| ""\)\.toLowerCase\(\);/g,
    'const summaryLower = (req.body?.summary || "").toLowerCase();'
  );

  fs.writeFileSync(filepath, content, 'utf8');
  console.log("Fixed " + filepath);
}

patchFile('server.ts');
patchFile('api/analyze-pest.ts');

