import React, { useState, useEffect } from 'react';
import {
  X,
  Camera,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
  FileText,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  AlertOctagon,
  Upload
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { analyzeCropImage, CropAssayerResult } from '../utils/cropVisionAnalyzer';

interface AiVisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLotCreated?: (cropName: string, grade: string, score: number, quantity: number, price: number) => void;
}

interface PresetSample {
  id: string;
  name: string;
  category: 'fresh' | 'rotten' | 'cotton' | 'soybean';
  image: string;
  hint: string;
}

const presetSamples: PresetSample[] = [
  {
    id: 'onion-fresh',
    name: 'Nashik Red Onion (Top Class • A+)',
    category: 'fresh',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
    hint: 'fresh export onion clean dry skin',
  },
  {
    id: 'onion-rotten',
    name: 'Rotten / Moldy Onion (Spoiled • Grade C)',
    category: 'rotten',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
    hint: 'rotten moldy decaying spoiled onion',
  },
  {
    id: 'cotton',
    name: 'Jalgaon BT Cotton (Grade A)',
    category: 'cotton',
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=600&auto=format&fit=crop&q=80',
    hint: 'cotton high staple',
  },
  {
    id: 'soybean',
    name: 'Latur Yellow Soybean (Grade A+)',
    category: 'soybean',
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600&auto=format&fit=crop&q=80',
    hint: 'soybean plump golden',
  },
];

export const AiVisionModal: React.FC<AiVisionModalProps> = ({ isOpen, onClose, onLotCreated }) => {
  const { language } = useLanguage();
  const [selectedPreset, setSelectedPreset] = useState<PresetSample>(presetSamples[0]);
  const [activeImage, setActiveImage] = useState<string>(presetSamples[0].image);
  const [activeImageHint, setActiveImageHint] = useState<string>(presetSamples[0].hint);
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CropAssayerResult | null>(null);
  const [quantity, setQuantity] = useState('65');
  const [expectedPrice, setExpectedPrice] = useState('2400');
  const [isCustomUpload, setIsCustomUpload] = useState(false);

  // Run initial analysis on modal open
  useEffect(() => {
    if (isOpen) {
      runInspection(presetSamples[0].image, presetSamples[0].hint);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  async function runInspection(imgUrl: string, hint: string) {
    setIsScanning(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeCropImage(imgUrl, hint);
      setAnalysisResult(result);

      // Adjust default price if rotten or premium
      if (result.isSpoiledOrRotten) {
        setExpectedPrice('900'); // Low distress price
      } else if (result.score >= 90) {
        setExpectedPrice('2400'); // Standard premium
      } else {
        setExpectedPrice('1800');
      }
    } catch (err) {
      console.error('Inspection failed:', err);
    } finally {
      setIsScanning(false);
    }
  }

  const handleSelectPreset = (preset: PresetSample) => {
    setSelectedPreset(preset);
    setActiveImage(preset.image);
    setActiveImageHint(preset.hint);
    setIsCustomUpload(false);
    runInspection(preset.image, preset.hint);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setActiveImage(url);
        setActiveImageHint(file.name);
        setIsCustomUpload(true);
        runInspection(url, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const isRotten = analysisResult?.isSpoiledOrRotten || false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Header - Slate Natural Tone */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-white">
                  {language === 'mr'
                    ? 'Google Gemini Vision • एआय पीक गुणवत्ता चाचणी'
                    : language === 'hi'
                    ? 'Google Gemini Vision • एआई फसल गुणवत्ता परीक्षण'
                    : 'Google Gemini Vision • AI Crop Quality Assayer'}
                </h3>
                <span className="text-[10px] bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                  Gemini 2.5 Flash
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Rigorous computer-vision spoilage & export grade assayer (APMC ISO-17025 Standard)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[78vh] overflow-y-auto">
          
          {/* Preset Selector with clear Rotten vs Top Class toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-800">
                {language === 'mr'
                  ? 'चाचणी नमुना निवडा किंवा स्वतःचा फोटो अपलोड करा:'
                  : language === 'hi'
                  ? 'परीक्षण नमूना चुनें या अपना फोटो अपलोड करें:'
                  : 'Select Test Sample or Upload Photo to Grade:'}
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                {language === 'mr' ? 'खराब व चांगल्या दोन्ही मालाची अचूक चाचणी' : 'Accurately detects rotten vs top-class produce'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {presetSamples.map((preset) => {
                const isSelected = !isCustomUpload && selectedPreset.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? preset.category === 'rotten'
                          ? 'border-red-500 bg-red-50 ring-2 ring-red-500/20 font-bold'
                          : 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600/20 font-bold'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {preset.category === 'rotten' ? '⚠️ Rotten Onion' : preset.name.split(' ')[0]}
                      </p>
                    </div>
                    <p
                      className={`text-[10px] mt-0.5 font-semibold ${
                        preset.category === 'rotten' ? 'text-red-700' : 'text-emerald-700'
                      }`}
                    >
                      {preset.category === 'rotten' ? 'Spoiled / Decay' : 'Top Export'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Image Viewport with Scanning Overlay */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-300 bg-black aspect-video max-h-56 flex items-center justify-center shadow-xs">
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
                className={`w-2 h-2 rounded-full ${
                  isScanning ? 'bg-amber-400 animate-ping' : isRotten ? 'bg-red-500' : 'bg-emerald-400'
                }`}
              />
              <span className="font-mono">
                {isScanning
                  ? 'Gemini Scanning...'
                  : isRotten
                  ? 'Spoilage Detected'
                  : 'AI Certified'}
              </span>
            </div>

            {/* Upload Button overlay */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-medium backdrop-blur-md border border-slate-700 flex items-center gap-1.5 shadow-md transition-all active:scale-95">
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'mr' ? 'कॅमेरा / फोटो अपलोड करा' : language === 'hi' ? 'कैमरा / फोटो अपलोड करें' : 'Upload Produce Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>

          {/* AI Inspection Results Card - DYNAMICALLY STYLED FOR ROTTEN VS TOP CLASS */}
          {analysisResult && !isScanning && (
            <div
              className={`rounded-2xl p-4.5 border shadow-xs space-y-4 ${
                isRotten
                  ? 'bg-red-50/50 border-red-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* Spoilage Alert Banner if Rotten */}
              {isRotten && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-100 border border-red-300 text-red-950 text-xs font-medium">
                  <AlertOctagon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-red-900 block">
                      {language === 'mr'
                        ? '⚠️ बुरशी व सडलेला माल आढळला (Fungal Spoilage Detected):'
                        : language === 'hi'
                        ? '⚠️ कवक एवं सड़ा हुआ माल पाया गया (Fungal Spoilage Detected):'
                        : '⚠️ Fungal Spoilage & Soft Rot Detected:'}
                    </strong>
                    <span>
                      {language === 'mr'
                        ? 'हा माल एपीएमसी ग्रेड A साठी अपात्र आहे. त्वरित वेगळा करा किंवा प्रक्रिया/कमी भावात विक्री करा.'
                        : 'This sample fails APMC export quality standards due to soft rot or black mold. Disqualified from standard premium auction.'}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-lg text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-xs ${
                        isRotten
                          ? 'bg-red-600'
                          : analysisResult.score >= 90
                          ? 'bg-emerald-600'
                          : 'bg-amber-600'
                      }`}
                    >
                      {analysisResult.grade}
                    </span>
                    <span
                      className={`font-bold text-sm sm:text-base ${
                        isRotten ? 'text-red-900' : 'text-slate-900'
                      }`}
                    >
                      {language === 'mr' ? 'गुणवत्ता गुण:' : language === 'hi' ? 'गुणवत्ता स्कोर:' : 'Assessed Quality Score:'}{' '}
                      <span className="font-mono">{analysisResult.score}/100</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed font-medium">
                    {analysisResult.findings}
                  </p>
                </div>
                <div className="text-right shrink-0 pl-3">
                  <span className="text-[11px] text-slate-500 block">
                    {language === 'mr' ? 'अपेक्षित भाव प्रभाव' : 'Projected Price Impact'}
                  </span>
                  <span
                    className={`font-extrabold text-xs sm:text-sm flex items-center justify-end gap-1 ${
                      isRotten ? 'text-red-600' : 'text-emerald-700'
                    }`}
                  >
                    {isRotten ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                    <span>{analysisResult.mspBonus}</span>
                  </span>
                </div>
              </div>

              {/* 4 Assayer Metric Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className={`p-2.5 rounded-xl border ${isRotten ? 'bg-red-100/60 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
                    {language === 'mr' ? 'आर्द्रता (Moisture)' : 'Moisture'}
                  </span>
                  <span className={`text-xs font-bold ${isRotten ? 'text-red-900 font-mono' : 'text-slate-900 font-mono'}`}>
                    {analysisResult.moisture}
                  </span>
                </div>
                <div className={`p-2.5 rounded-xl border ${isRotten ? 'bg-red-100/60 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
                    {language === 'mr' ? 'एकरूपता (Uniformity)' : 'Uniformity'}
                  </span>
                  <span className={`text-xs font-bold ${isRotten ? 'text-red-900 font-mono' : 'text-slate-900 font-mono'}`}>
                    {analysisResult.uniformity}
                  </span>
                </div>
                <div className={`p-2.5 rounded-xl border ${isRotten ? 'bg-red-100/60 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
                    {language === 'mr' ? 'दोष (Defects)' : 'Defects'}
                  </span>
                  <span className={`text-xs font-bold ${isRotten ? 'text-red-900 font-mono' : 'text-slate-900 font-mono'}`}>
                    {analysisResult.defects}
                  </span>
                </div>
                <div className={`p-2.5 rounded-xl border ${isRotten ? 'bg-red-100/60 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
                    {language === 'mr' ? 'टिकवण क्षमता (Shelf Life)' : 'Shelf Life'}
                  </span>
                  <span className={`text-xs font-bold ${isRotten ? 'text-red-900 font-mono' : 'text-slate-900 font-mono'}`}>
                    {analysisResult.shelfLife}
                  </span>
                </div>
              </div>

              {/* Recommendation Note */}
              <div
                className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                  isRotten
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 shrink-0 mt-0.5 ${isRotten ? 'text-amber-700' : 'text-emerald-700'}`} />
                <div>
                  <strong>{language === 'mr' ? 'तज्ज्ञ सल्ला (Assayer Advisory):' : 'Assayer Advisory:'}</strong>{' '}
                  <span>{analysisResult.recommendation}</span>
                </div>
              </div>
            </div>
          )}

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

        </div>

        {/* Footer actions */}
        <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => runInspection(activeImage, activeImageHint)}
            disabled={isScanning}
            className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{language === 'mr' ? 'पुन्हा स्कॅन करा' : language === 'hi' ? 'पुनः स्कैन करें' : 'Rescan Image'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 cursor-pointer"
            >
              {language === 'mr' ? 'बंद करा' : language === 'hi' ? 'बंद करें' : 'Close'}
            </button>
            <button
              onClick={() => {
                if (onLotCreated && analysisResult) {
                  onLotCreated(
                    analysisResult.cropName,
                    analysisResult.grade,
                    analysisResult.score,
                    Number(quantity) || 60,
                    Number(expectedPrice) || 2400
                  );
                }
                onClose();
              }}
              disabled={isScanning || !analysisResult}
              className={`px-5 py-2 rounded-xl text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer disabled:opacity-50 ${
                isRotten
                  ? 'bg-amber-700 hover:bg-amber-800'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isRotten
                  ? (language === 'mr' ? 'प्रक्रिया लॉट म्हणून नोंदवा (Grade C)' : 'Register as Distress / By-product Lot')
                  : (language === 'mr' ? 'लॉट नोंदणी करा व प्रमाणपत्र मिळवा' : 'Register Lot & Generate Certificate')}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
