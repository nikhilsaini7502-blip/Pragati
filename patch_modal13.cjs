const fs = require('fs');
let content = fs.readFileSync('src/components/AiVisionModal.tsx', 'utf8');

const regex = /                            <\/div>\n          <\/div>\n        \)}\n        \{\/\* Footer actions \*\/\}/;

const newStr = `          </div>
        )}
        {/* Footer actions */}`;

if (regex.test(content)) {
  content = content.replace(regex, newStr);
  fs.writeFileSync('src/components/AiVisionModal.tsx', content, 'utf8');
  console.log("Successfully removed extra div");
} else {
  console.log("Not found extra div block");
}
