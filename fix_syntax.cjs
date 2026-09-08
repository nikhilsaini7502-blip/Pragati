const fs = require('fs');

function patchFile(filepath) {
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');

  content = content.replace(/req\.body\?\.req\.body\?\.language/g, 'req.body?.language');

  fs.writeFileSync(filepath, content, 'utf8');
}

patchFile('server.ts');
patchFile('api/gemini/advisor.ts');
