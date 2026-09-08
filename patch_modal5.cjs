const fs = require('fs');
let content = fs.readFileSync('src/components/AiVisionModal.tsx', 'utf8');

const targetStr = `                  </div>
        )}
        {/* Footer actions */}`;

const newStr = `                  </div>
          </>
        )}
        {/* Footer actions */}`;

content = content.replace(targetStr, newStr);
fs.writeFileSync('src/components/AiVisionModal.tsx', content, 'utf8');
