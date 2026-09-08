const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(/type: "OBJECT"/g, 'type: Type.OBJECT');
content = content.replace(/type: "STRING"/g, 'type: Type.STRING');

fs.writeFileSync('server.ts', content, 'utf8');
