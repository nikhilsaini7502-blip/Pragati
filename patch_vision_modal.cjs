const fs = require('fs');

const filepath = 'src/components/AiVisionModal.tsx';
let content = fs.readFileSync(filepath, 'utf8');

const oldBlock = `          {analysisResult && !isScanning && (
            <div
              className={\`rounded-2xl p-4.5 border shadow-xs space-y-4 \${
                isRotten`;

const newBlock = `          {analysisResult && !isScanning && analysisResult.isCropDetected === false && (
            <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-2xl text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-red-900 text-lg">Invalid Image Type</h3>
                <p className="text-sm text-red-700 mt-1">
                  {language === 'mr' ? 'अवैध प्रतिमा. कृपया फक्त पिकाचे किंवा शेतीचे फोटो अपलोड करा.' : language === 'hi' ? 'अमान्य छवि। कृपया केवल फसल या कृषि उपज की फोटो अपलोड करें।' : 'The uploaded image does not appear to be an agricultural crop or produce. Please re-upload a valid photo.'}
                </p>
              </div>
              <button
                onClick={() => {
                  setAnalysisResult(null);
                  setActiveImage(null);
                }}
                className="px-4 py-2 mt-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
              >
                {language === 'mr' ? 'पुन्हा अपलोड करा' : language === 'hi' ? 'फिर से अपलोड करें' : 'Try Again'}
              </button>
            </div>
          )}

          {analysisResult && !isScanning && analysisResult.isCropDetected !== false && (
            <div
              className={\`rounded-2xl p-4.5 border shadow-xs space-y-4 \${
                isRotten`;

content = content.replace(oldBlock, newBlock);

content = content.replace(
  `{analysisResult && !isScanning && (
          <>
          {/* Quick Lot Register Form within Modal */}`,
  `{analysisResult && !isScanning && analysisResult.isCropDetected !== false && (
          <>
          {/* Quick Lot Register Form within Modal */}`
);

fs.writeFileSync(filepath, content, 'utf8');
console.log("Patched Vision Modal");
