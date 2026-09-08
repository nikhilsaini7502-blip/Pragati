const fs = require('fs');
let content = fs.readFileSync('src/components/AiVisionModal.tsx', 'utf8');

const regex = /\{analysisResult && !isScanning && \(\n          <div className="w-full">\n          \{\/\* Quick Lot Register Form within Modal \*\/\}[\s\S]*?\{\/\* Footer actions \*\/\}/;

const correctForm = `{analysisResult && !isScanning && (
          <>
          {/* Quick Lot Register Form within Modal */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-800">
              {language === 'mr' ? 'हा माल प्रगती प्लॅटफॉर्मवर विक्रीसाठी जोडा (List Lot for Sale):' : language === 'hi' ? 'यह लॉट बिक्री हेतु सूचीबद्ध करें:' : 'List this Lot on Pragati Exchange:'}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-600 mb-1 font-medium">
                  {language === 'mr' ? 'एकूण प्रमाण (क्विंटल):' : 'Total Quantity (Quintals):'}
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-900 focus:ring-1 focus:ring-emerald-600 focus:outline-hidden"
                  placeholder="e.g. 65"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 mb-1 font-medium">
                  {language === 'mr' ? 'अपेक्षित दर (₹/क्विंटल):' : 'Reserve Price (₹/Quintal):'}
                </label>
                <input
                  type="number"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-900 focus:ring-1 focus:ring-emerald-600 focus:outline-hidden font-mono"
                  placeholder="e.g. 2400"
                />
              </div>
            </div>
          </div>
          </>
        )}
        {/* Footer actions */}`;

if (regex.test(content)) {
  content = content.replace(regex, correctForm);
  fs.writeFileSync('src/components/AiVisionModal.tsx', content, 'utf8');
  console.log("Replaced successfully!");
} else {
  console.log("Could not find block to replace.");
}
