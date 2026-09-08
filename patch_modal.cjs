const fs = require('fs');

let content = fs.readFileSync('src/components/AiVisionModal.tsx', 'utf8');

const regex = /\{\/\* Image Viewport with Scanning Overlay \*\/\}[\s\S]*?<\/label>\s*<\/div>\s*<\/div>/;

const replaceStr = `{/* Image Viewport with Scanning Overlay */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-300 bg-slate-50 aspect-video max-h-56 flex flex-col items-center justify-center shadow-xs group hover:border-emerald-400 transition-colors">
            {activeImage ? (
              <>
                <img
                  src={activeImage}
                  alt="Crop sample under inspection"
                  className="w-full h-full object-cover"
                />
                {/* Scanning Laser Animation */}
                {isScanning && (
                  <div className="absolute inset-0 bg-emerald-500/10 flex flex-col justify-between pointer-events-none">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse shadow-lg shadow-emerald-400" />
                    <div className="p-3 bg-slate-950/80 backdrop-blur-md text-emerald-300 text-xs font-mono flex items-center gap-2 mx-auto mb-4 rounded-full border border-emerald-500/40 shadow-lg">
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                      <span>Gemini Vision Assessing: Black Mold, Soft Rot, Moisture, Uniformity...</span>
                    </div>
                  </div>
                )}
                {/* Verification Status Tag */}
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700 text-white text-[11px] flex items-center gap-1.5 shadow-md">
                  <span
                    className={\`w-2 h-2 rounded-full \${
                      isScanning ? 'bg-amber-400 animate-ping' : isRotten ? 'bg-red-500' : 'bg-emerald-400'
                    }\`}
                  />
                  <span className="font-mono">
                    {isScanning
                      ? 'Gemini Scanning...'
                      : isRotten
                      ? 'Spoilage Detected'
                      : 'AI Certified'}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center text-slate-400 p-6 text-center gap-2">
                <Camera className="w-12 h-12 mb-2 opacity-50 group-hover:text-emerald-500 transition-colors" />
                <p className="text-sm font-bold text-slate-600">
                  {language === 'mr' ? 'फोटो अपलोड करण्यासाठी टॅप करा' : language === 'hi' ? 'फोटो अपलोड करने के लिए टैप करें' : 'Tap to upload a crop photo'}
                </p>
                <p className="text-xs text-slate-500">
                  {language === 'mr' ? 'AI विश्लेषणासाठी स्पष्ट फोटो आवश्यक' : language === 'hi' ? 'AI विश्लेषण के लिए स्पष्ट फोटो आवश्यक' : 'Clear photos give the best AI analysis'}
                </p>
              </div>
            )}
            
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              onChange={handleFileUpload}
            />

            {activeImage && (
              <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10 pointer-events-none">
                <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-medium backdrop-blur-md border border-slate-700 flex items-center gap-1.5 shadow-md">
                  <Camera className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'mr' ? 'फोटो बदला' : language === 'hi' ? 'फोटो बदलें' : 'Change Photo'}</span>
                </div>
              </div>
            )}
          </div>`;

if (!regex.test(content)) {
  console.log("Regex did not match");
} else {
  content = content.replace(regex, replaceStr);
  fs.writeFileSync('src/components/AiVisionModal.tsx', content, 'utf8');
  console.log("Successfully replaced via regex");
}
