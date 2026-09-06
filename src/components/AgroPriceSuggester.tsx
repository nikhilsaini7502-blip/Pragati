import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Sparkles,
  CloudRain,
  Warehouse,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  Bot,
  HelpCircle,
  Clock,
  Layers,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  maharashtraDistricts,
  cropCommodityList,
  calculatePriceSuggestion,
} from '../data/priceSuggesterData';

interface AgroPriceSuggesterProps {
  onOpenGeminiAdvisor?: (query: string) => void;
}

export const AgroPriceSuggester: React.FC<AgroPriceSuggesterProps> = ({
  onOpenGeminiAdvisor,
}) => {
  const { language } = useLanguage();

  // User Interactive State
  const [selectedCrop, setSelectedCrop] = useState<string>('Onion (Red)');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Nashik');
  const [selectedMandi, setSelectedMandi] = useState<string>('Lasalgaon APMC');
  const [qualityGrade, setQualityGrade] = useState<'A+' | 'A' | 'B' | 'C'>('A');
  const [storageType, setStorageType] = useState<'ventilated_chawl' | 'warehouse' | 'field_open'>('ventilated_chawl');
  const [holdingDays, setHoldingDays] = useState<number>(5);

  // When district changes, update default mandi
  const activeDistrictConfig = maharashtraDistricts.find(
    (d) => d.nameEn.toLowerCase() === selectedDistrict.toLowerCase()
  ) || maharashtraDistricts[0];

  const handleDistrictChange = (distName: string) => {
    setSelectedDistrict(distName);
    const dist = maharashtraDistricts.find((d) => d.nameEn === distName);
    if (dist && dist.primaryMandis.length > 0) {
      setSelectedMandi(dist.primaryMandis[0].nameEn);
    }
  };

  // Calculate dynamic price suggestion
  const result = useMemo(() => {
    return calculatePriceSuggestion({
      commodity: selectedCrop,
      district: selectedDistrict,
      mandi: selectedMandi,
      qualityGrade,
      storageType,
      holdingDays,
    });
  }, [selectedCrop, selectedDistrict, selectedMandi, qualityGrade, storageType, holdingDays]);

  const activeCropObj = cropCommodityList.find((c) => c.nameEn === selectedCrop) || cropCommodityList[0];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shadow-emerald-600/30 shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                {language === 'mr'
                  ? 'एआय बाजारभाव सल्लागार (Price Suggester & Holding Advisor)'
                  : language === 'hi'
                  ? 'एआई मूल्य निर्धारक एवं सलाह (Price Suggester & Holding Advisor)'
                  : 'AI Crop Price Suggester & Holding Horizon'}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
                Demand-Supply + Weather Engine
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {language === 'mr'
                ? 'मागील व आगामी मागणी-पुरवठा, शासकीय खरेदी निविदा आणि हवामान अंदाजाच्या आधारे आजचा योग्य विक्री दर व साठवणूक सल्ला'
                : language === 'hi'
                ? 'भूतकाल एवं भविष्य की मांग-आपूर्ति, सरकारी खरीद और मौसम पूर्वानुमान के आधार पर सटीक विक्रय मूल्य सलाह'
                : 'Calculates optimal selling price by synthesizing historical arrivals, future procurement demand, and rainfall/humidity risks'}
            </p>
          </div>
        </div>

        {onOpenGeminiAdvisor && (
          <button
            onClick={() =>
              onOpenGeminiAdvisor(
                `Calculate price recommendation and holding horizon for ${selectedCrop} in ${selectedMandi}, ${selectedDistrict} factoring past arrivals, upcoming NAFED procurement, and unseasonal rainfall.`
              )
            }
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer shrink-0"
          >
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>{language === 'mr' ? 'Gemini AI कडून पडताळा' : language === 'hi' ? 'Gemini AI से जांचें' : 'Validate via Gemini AI'}</span>
          </button>
        )}
      </div>

      {/* Input Parameters Controls Grid */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="uppercase tracking-wider">
            {language === 'mr' ? 'तुमच्या शेतमालाची माहिती भरा (Batch Parameters):' : language === 'hi' ? 'अपनी फसल का विवरण चुनें (Batch Parameters):' : 'Lot & Storage Parameters:'}
          </span>
          <span className="text-slate-400 font-normal text-[11px]">
            Real-time algorithmic recalculation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {language === 'mr' ? 'पिक (Commodity):' : language === 'hi' ? 'फसल (Commodity):' : 'Commodity Crop:'}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {cropCommodityList.map((crop) => (
                <option key={crop.nameEn} value={crop.nameEn}>
                  {language === 'mr' ? crop.nameMr : language === 'hi' ? crop.nameHi : crop.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* District & Mandi */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {language === 'mr' ? 'जिल्हा आणि मंडी:' : language === 'hi' ? 'जिला एवं मंडी:' : 'District & APMC Mandi:'}
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {maharashtraDistricts.map((d) => (
                <option key={d.id} value={d.nameEn}>
                  {language === 'mr' ? d.nameMr : language === 'hi' ? d.nameHi : d.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Quality Grade */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {language === 'mr' ? 'गुणवत्ता प्रत (Quality Grade):' : language === 'hi' ? 'गुणवत्ता ग्रेड (Quality Grade):' : 'Quality Grade:'}
            </label>
            <select
              value={qualityGrade}
              onChange={(e) => setQualityGrade(e.target.value as any)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="A+">Grade A+ (Premium / Export 55mm+)</option>
              <option value="A">Grade A (Standard Market Modal)</option>
              <option value="B">Grade B (Medium Fair Average)</option>
              <option value="C">Grade C (Processing / Small)</option>
            </select>
          </div>

          {/* Storage Capability */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {language === 'mr' ? 'साठवणूक व्यवस्था (Storage):' : language === 'hi' ? 'भंडारण व्यवस्था (Storage):' : 'Storage Capability:'}
            </label>
            <select
              value={storageType}
              onChange={(e) => setStorageType(e.target.value as any)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="ventilated_chawl">कांदा चाळ / हवेशीर गोदावर (Ventilated)</option>
              <option value="warehouse">पक्के वेअरहाऊस (Moisture Shielded)</option>
              <option value="field_open">खुले शेत / ताडपत्री (Open Field - Risk)</option>
            </select>
          </div>
        </div>

        {/* Holding Horizon Slider */}
        <div className="pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              {language === 'mr' ? 'साठवून ठेवण्याचा कालावधी (Holding Horizon):' : language === 'hi' ? 'होल्डिंग अवधि (Holding Horizon):' : 'Simulate Holding Horizon:'}
            </span>
            <span className="font-extrabold text-emerald-700 text-sm bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
              {holdingDays === 0
                ? (language === 'mr' ? 'आजच विका (Sell Today)' : language === 'hi' ? 'आज ही बेचें (Sell Today)' : 'Sell Today (0 Days)')
                : `${holdingDays} ${language === 'mr' ? 'दिवस थांबा' : language === 'hi' ? 'दिन रुकें' : 'Days Hold'}`}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="14"
            step="1"
            value={holdingDays}
            onChange={(e) => setHoldingDays(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-1 pt-0.5">
            <span>0 Days (Today)</span>
            <span>3 Days</span>
            <span>5 Days (Recommended)</span>
            <span>7 Days (1 Wk)</span>
            <span>10 Days</span>
            <span>14 Days (2 Wks)</span>
          </div>
        </div>
      </div>

      {/* Main Calculated Recommendation Banner */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          result.verdict === 'HOLD'
            ? 'bg-emerald-50/80 border-emerald-300'
            : result.verdict === 'PARTIAL_SALE'
            ? 'bg-amber-50/80 border-amber-300'
            : 'bg-rose-50/80 border-rose-300'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                  result.verdict === 'HOLD'
                    ? 'bg-emerald-600 text-white'
                    : result.verdict === 'PARTIAL_SALE'
                    ? 'bg-amber-600 text-white'
                    : 'bg-rose-600 text-white'
                }`}
              >
                {result.verdict === 'HOLD'
                  ? (language === 'mr' ? 'थांबा आणि ५-७ दिवस साठवा (STRONG HOLD)' : language === 'hi' ? 'रुकें और 5-7 दिन रखें (STRONG HOLD)' : 'STRONG HOLD (Wait 5-7 Days)')
                  : result.verdict === 'PARTIAL_SALE'
                  ? (language === 'mr' ? 'टप्प्याटप्प्याने विका (PARTIAL SALE)' : language === 'hi' ? 'आंशिक बिक्री करें (PARTIAL SALE)' : 'STAGGERED SALE (Sell 50% Today)')
                  : (language === 'mr' ? 'तात्काळ विक्री करा (SELL IMMEDIATELY)' : language === 'hi' ? 'तुरंत बेचें (SELL IMMEDIATELY)' : 'SELL IMMEDIATELY (Weather Risk)')}
              </span>

              <span className="text-xs font-semibold text-slate-600">
                Confidence Score: <strong className="text-slate-900">{result.confidenceScore}%</strong>
              </span>
            </div>

            <div className="mt-2.5 flex items-baseline gap-3 flex-wrap">
              <div>
                <span className="text-[11px] text-slate-500 block uppercase font-bold">
                  {language === 'mr' ? 'आजचा चालू सरासरी दर (Current Modal):' : language === 'hi' ? 'आज का वर्तमान औसत भाव:' : 'Current Mandi Modal:'}
                </span>
                <span className="text-xl font-bold text-slate-700">
                  ₹{result.currentModalPrice.toLocaleString('en-IN')} <span className="text-xs font-normal">/ Qtl</span>
                </span>
              </div>

              <ArrowRight className="w-5 h-5 text-slate-400 shrink-0 self-center hidden sm:block" />

              <div>
                <span className="text-[11px] text-emerald-900 block uppercase font-extrabold">
                  {language === 'mr' ? 'शिफारस केलेला लक्ष्य विक्री दर (Target Price):' : language === 'hi' ? 'अनुशंसित लक्ष्य विक्रय मूल्य (Target Price):' : 'AI Suggested Target Selling Price:'}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-700">
                  ₹{result.recommendedPriceMin.toLocaleString('en-IN')} – ₹{result.recommendedPriceMax.toLocaleString('en-IN')}
                  <span className="text-sm font-normal text-emerald-800"> / {activeCropObj.unit}</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              {result.aiAdvisoryNote}
            </p>
          </div>

          {/* Net Projected Gain Card */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shrink-0 min-w-[170px] shadow-2xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              {language === 'mr' ? 'निव्वळ अंदाजित नफा' : language === 'hi' ? 'अनुमानित शुद्ध लाभ' : 'Projected Net Gain'}
            </span>
            <span
              className={`text-2xl font-black block mt-0.5 ${
                result.projectedNetGainPerQtl >= 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {result.projectedNetGainPerQtl >= 0 ? `+₹${result.projectedNetGainPerQtl}` : `-₹${Math.abs(result.projectedNetGainPerQtl)}`}
              <span className="text-xs font-normal text-slate-500"> / Qtl</span>
            </span>
            <span className="text-[10px] text-slate-500 block mt-1">
              (After storage & shrinkage deduction)
            </span>
          </div>
        </div>
      </div>

      {/* 4 Calculation Factor Vectors Breakdown Matrix */}
      <div className="space-y-2">
        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-slate-500" />
          <span>
            {language === 'mr' ? 'दर निश्चितीमागील ४ प्रमुख घटकांचे विश्लेषण (Factor Matrix):' : language === 'hi' ? 'मूल्य निर्धारण के 4 प्रमुख घटकों का विश्लेषण (Factor Matrix):' : 'Predictive Econometric & Weather Factor Breakdown:'}
          </span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Factor 1: Past Demand & Supply Data */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span>१. मागील पुरवठा व आवक ट्रेंड (Past Supply)</span>
              </span>
              <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                {result.factors.pastSupply.delta >= 0 ? `+₹${result.factors.pastSupply.delta}` : `-₹${Math.abs(result.factors.pastSupply.delta)}`}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {result.factors.pastSupply.text}
            </p>
          </div>

          {/* Factor 2: Future Demand & Institutional Tenders */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>२. भावी मागणी व खरेदी निविदा (Future Demand)</span>
              </span>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                +{result.factors.futureDemand.delta}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {result.factors.futureDemand.text}
            </p>
          </div>

          {/* Factor 3: Weather & Rainfall Telemetry */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-amber-600" />
                <span>३. हवामान व पाऊस परिणाम (Weather Data)</span>
              </span>
              <span
                className={`text-xs font-extrabold px-2 py-0.5 rounded-full border ${
                  result.factors.weatherImpact.delta >= 0
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : 'text-rose-700 bg-rose-50 border-rose-200'
                }`}
              >
                {result.factors.weatherImpact.delta >= 0 ? `+₹${result.factors.weatherImpact.delta}` : `-₹${Math.abs(result.factors.weatherImpact.delta)}`}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {result.factors.weatherImpact.text}
            </p>
          </div>

          {/* Factor 4: Storage Infrastructure & Shrinkage */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Warehouse className="w-4 h-4 text-purple-600" />
                <span>४. साठवणूक घट व जोखीम (Storage Factor)</span>
              </span>
              <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                {result.factors.storageRisk.delta}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {result.factors.storageRisk.text}
            </p>
          </div>
        </div>
      </div>

      {/* 7-Day Day-by-Day Trajectory Curve */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>
              {language === 'mr' ? 'पुढील ७ दिवसांचे दर व आवक अंदाज (Projected Price Curve):' : language === 'hi' ? 'अगले 7 दिनों का मूल्य व आवक अनुमान (Projected Price Curve):' : 'Next 7-Day Price & Mandi Arrival Trajectory:'}
            </span>
          </h4>
          <a
            href="#forecast-section"
            className="text-[11px] text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
          >
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            <span>{language === 'mr' ? 'तपशीलवार हवामान आलेख पहा →' : language === 'hi' ? 'विस्तृत मौसम चार्ट देखें →' : 'View Detailed Weather Forecast Chart →'}</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {result.priceTrajectory.map((t, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-center space-y-1 relative transition-all ${
                t.isOptimalSellDay
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-102 ring-2 ring-emerald-400'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              {t.isOptimalSellDay && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-[9px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider shadow-xs">
                  Best Day
                </span>
              )}
              <span className={`text-[10px] font-bold block ${t.isOptimalSellDay ? 'text-emerald-100' : 'text-slate-500'}`}>
                {t.dayLabel}
              </span>
              <span className="text-base font-black block">
                ₹{t.projectedPrice}
              </span>
              <span className={`text-[10px] block ${t.isOptimalSellDay ? 'text-emerald-200' : 'text-slate-400'}`}>
                {t.estimatedArrivalQtl.toLocaleString('en-IN')} Qtl
              </span>
              <span className={`text-[9px] block truncate font-medium ${t.isOptimalSellDay ? 'text-amber-200 font-bold' : 'text-slate-500'}`}>
                {t.weatherCondition}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
