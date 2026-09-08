const fs = require('fs');
let content = fs.readFileSync('src/components/AiVisionModal.tsx', 'utf8');

const targetBtnStr = `<button
            onClick={() => runInspection(activeImage, activeImageHint)}
            disabled={isScanning}
            className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={\`w-3.5 h-3.5 \${isScanning ? 'animate-spin' : ''}\`} />
            <span>{language === 'mr' ? 'पुन्हा स्कॅन करा' : language === 'hi' ? 'पुनः स्कैन करें' : 'Rescan Image'}</span>
          </button>`;

const newBtnStr = `          {activeImage ? (
            <button
              onClick={() => runInspection(activeImage, activeImageHint)}
              disabled={isScanning}
              className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={\`w-3.5 h-3.5 \${isScanning ? 'animate-spin' : ''}\`} />
              <span>{language === 'mr' ? 'पुन्हा स्कॅन करा' : language === 'hi' ? 'पुनः स्कैन करें' : 'Rescan Image'}</span>
            </button>
          ) : (
            <div></div>
          )}`;

content = content.replace(targetBtnStr, newBtnStr);
fs.writeFileSync('src/components/AiVisionModal.tsx', content, 'utf8');
