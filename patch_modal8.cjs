const fs = require('fs');
let content = fs.readFileSync('src/components/AiVisionModal.tsx', 'utf8');

content = content.replace("                    </div>\n            </>\n          )}\n          {/* Footer actions */}", "                    </div>\n            </div>\n          )}\n          {/* Footer actions */}");

fs.writeFileSync('src/components/AiVisionModal.tsx', content, 'utf8');
