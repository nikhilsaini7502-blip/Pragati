import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Search,
  MapPin,
  Truck,
  Camera,
  ArrowUpRight,
  DollarSign,
  Building,
  UserCheck,
  ArrowLeft,
  Sparkles,
  Lock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BuyerMatch } from '../types';
import { buyerMatches } from '../data/mockData';
import { PriceForecast } from './PriceForecast';

interface BuyerDashboardProps {
  openVisionModal: () => void;
  openLogisticsModal: () => void;
  onBackToHome: () => void;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
  openVisionModal,
  openLogisticsModal,
  onBackToHome,
}) => {
  const { t, language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [matches, setMatches] = useState<BuyerMatch[]>(buyerMatches);
  const [escrowSuccessFarmer, setEscrowSuccessFarmer] = useState<string | null>(null);

  // Filter matches
  const filteredMatches = matches.filter((m) => {
    if (selectedCrop === 'all') return true;
    return m.crop.toLowerCase().includes(selectedCrop);
  });

  const handleInitiateEscrow = (farmerName: string) => {
    setEscrowSuccessFarmer(farmerName);
    setTimeout(() => {
      setEscrowSuccessFarmer(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Buyer Top Header Profile (Natural Tones) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <button
            onClick={onBackToHome}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 md:hidden cursor-pointer"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-blue-600/30 shrink-0">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-slate-900">
                {language === 'mr' ? 'सह्याद्री अ‍ॅग्रो प्रोसेसिंग हब' : language === 'hi' ? 'सह्याद्री एग्रो प्रोसेसिंग हब' : 'Sahyadri Agro Processing Hub'}
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                {language === 'mr' ? 'प्रमाणित खरेदीदार' : language === 'hi' ? 'सत्यापित खरीदार' : 'Verified Corporate Buyer'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              GSTIN: 27AABCS1429E1Z8 • {language === 'mr' ? 'बारामती व नाशिक प्रोसेसिंग युनिट' : language === 'hi' ? 'बारामती एवं नाशिक प्रोसेसिंग यूनिट' : 'Baramati & Nashik Processing Units'}
            </p>
          </div>
        </div>

        {/* Escrow Pool Balance Card */}
        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 self-start md:self-auto">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-semibold block">
              {language === 'mr' ? 'शासकीय एस्क्रो वॉलेट शिल्लक' : language === 'hi' ? 'शासकीय एस्क्रो वॉलेट शेष' : 'Govt. Escrow Pool Balance'}
            </span>
            <span className="text-sm font-extrabold text-slate-900">
              ₹ 18,40,000 {language === 'mr' ? 'सुरक्षित' : language === 'hi' ? 'सुरक्षित' : 'Secured'}
            </span>
          </div>
        </div>
      </div>

      {/* Escrow Lock Notification Toast */}
      {escrowSuccessFarmer && (
        <div className="bg-green-50 border-2 border-green-500 p-4 rounded-xl flex items-center justify-between gap-3 animate-in fade-in shadow-sm">
          <div className="flex items-center gap-2.5 text-xs text-green-950">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <span>
              <strong>{language === 'mr' ? 'स्मार्ट एस्क्रो कॉन्ट्रॅक्ट यशस्वी!' : language === 'hi' ? 'स्मार्ट एस्क्रो अनुबंध सफल!' : 'Smart Escrow Contract Initiated!'}</strong>{' '}
              {language === 'mr'
                ? `शेतकरी ${escrowSuccessFarmer} यांच्या लॉटसाठी पेमेंट एस्क्रोमध्ये लॉक करण्यात आले आहे. वजन झाल्यावर थेट खात्यात वर्ग होईल.`
                : language === 'hi'
                ? `किसान ${escrowSuccessFarmer} के लॉट हेतु भुगतान एस्क्रो में लॉक कर दिया गया है। तौल उपरांत तुरंत खाते में जमा होगा।`
                : `Payment locked in Govt. Escrow for farmer ${escrowSuccessFarmer}. Funds will release instantly via DBT upon weighment.`}
            </span>
          </div>
          <button
            onClick={openLogisticsModal}
            className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold text-xs shrink-0 flex items-center gap-1 shadow-xs cursor-pointer"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'वाहतूक ट्रॅक करा' : language === 'hi' ? 'ट्रैकिंग देखें' : 'Track Shipment'}</span>
          </button>
        </div>
      )}

      {/* 1. Analytics Section: Arrival Volumes & Price Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Chart 1: Arrival Volumes (Quintals) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span>{language === 'mr' ? 'महाराष्ट्र प्रमुख बाजार समित्या आवक' : language === 'hi' ? 'महाराष्ट्र प्रमुख मंडी आवक' : 'Maharashtra Primary Mandi Arrivals (Qtl)'}</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Current week arrivals volume across primary Maharashtra mandis
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-1 rounded-md">
              Week 36, 2026
            </span>
          </div>

          {/* Custom SVG Bar Chart */}
          <div className="space-y-3 pt-2">
            {[
              { mandi: language === 'mr' ? 'लासलगाव (कांदा)' : 'Lasalgaon (Onion)', volume: '14,200 Qtl', pct: 85, color: 'bg-green-600' },
              { mandi: language === 'mr' ? 'लातूर (सोयाबीन)' : 'Latur (Soybean)', volume: '19,800 Qtl', pct: 95, color: 'bg-blue-600' },
              { mandi: language === 'mr' ? 'जळगाव (कापूस)' : 'Jalgaon (Cotton)', volume: '8,450 Qtl', pct: 55, color: 'bg-amber-600' },
              { mandi: language === 'mr' ? 'अकोला (गहू)' : 'Akola (Wheat)', volume: '5,600 Qtl', pct: 40, color: 'bg-slate-600' },
              { mandi: language === 'mr' ? 'सांगली (हळद)' : 'Sangli (Turmeric)', volume: '3,200 Qtl', pct: 28, color: 'bg-orange-600' },
            ].map((bar, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700">{bar.mandi}</span>
                  <span className="font-bold text-slate-900">{bar.volume}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${bar.color} transition-all duration-700`}
                    style={{ width: `${bar.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
            <span>{language === 'mr' ? 'आवक ट्रेंड: लातूर सोयाबीन आवक +१४% वाढली' : language === 'hi' ? 'आवक रुझान: लातूर सोयाबीन आवक +14% बढ़ी' : 'Arrival Trend: Latur soybean volume increased +14%'}</span>
            <span className="text-blue-600 font-semibold cursor-pointer hover:underline">{language === 'mr' ? 'डिटेल रिपोर्ट डाऊनलोड' : language === 'hi' ? 'रिपोर्ट डाउनलोड' : 'Download Detailed Report'}</span>
          </div>
        </div>

        {/* Chart 2: 30-Day Price Trend & Forecast Band */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span>{language === 'mr' ? 'कांदा व सोयाबीन दर कल' : language === 'hi' ? 'प्याज व सोयाबीन मूल्य रुझान' : 'Modal Price Trajectory (30-Day Trend)'}</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Lasalgaon Red Onion vs Latur Soybean price trajectory (₹/Qtl)
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-md">
              AI Forecast Active
            </span>
          </div>

          {/* Interactive Trend Visualizer */}
          <div className="h-44 flex flex-col justify-between pt-2">
            <div className="flex items-end justify-between h-32 gap-2 px-2 border-b border-slate-200">
              {[
                { day: language === 'mr' ? '१ सप्टें' : '1 Sep', onion: 2050, soy: 4400, heightO: 50, heightS: 75 },
                { day: language === 'mr' ? '८ सप्टें' : '8 Sep', onion: 2120, soy: 4480, heightO: 55, heightS: 78 },
                { day: language === 'mr' ? '१५ सप्टें' : '15 Sep', onion: 2180, soy: 4520, heightO: 62, heightS: 82 },
                { day: language === 'mr' ? '२२ सप्टें' : '22 Sep', onion: 2240, soy: 4590, heightO: 70, heightS: 86 },
                { day: language === 'mr' ? 'आज (Live)' : 'Today (Live)', onion: 2280, soy: 4620, heightO: 76, heightS: 88 },
                { day: language === 'mr' ? 'AI +५ दिवस' : 'AI +5 Days', onion: 2480, soy: 4720, heightO: 92, heightS: 95, projected: true },
              ].map((point, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 bg-slate-900 text-white text-[10px] p-1.5 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                    {language === 'mr' ? 'कांदा' : 'Onion'}: ₹{point.onion} | {language === 'mr' ? 'सोयाबीन' : 'Soybean'}: ₹{point.soy}
                  </div>

                  <div className="w-full flex items-end justify-center gap-1 h-24">
                    {/* Onion bar */}
                    <div
                      className={`w-3 rounded-t-sm transition-all ${
                        point.projected
                          ? 'bg-gradient-to-t from-green-500 to-amber-400 border border-dashed border-white animate-pulse'
                          : 'bg-green-600'
                      }`}
                      style={{ height: `${point.heightO}%` }}
                    />
                    {/* Soybean bar */}
                    <div
                      className={`w-3 rounded-t-sm transition-all ${
                        point.projected
                          ? 'bg-gradient-to-t from-blue-500 to-indigo-400 border border-dashed border-white animate-pulse'
                          : 'bg-blue-600'
                      }`}
                      style={{ height: `${point.heightS}%` }}
                    />
                  </div>
                  <span className={`text-[10px] truncate max-w-full ${point.projected ? 'font-bold text-green-700' : 'text-slate-500'}`}>
                    {point.day}
                  </span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 text-xs pt-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-green-600 inline-block" />
                <span className="text-slate-600 font-medium">{language === 'mr' ? 'कांदा' : 'Onion'} (₹2,280 / Qtl)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-blue-600 inline-block" />
                <span className="text-slate-600 font-medium">{language === 'mr' ? 'सोयाबीन' : 'Soybean'} (₹4,620 / Qtl)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-amber-400 inline-block" />
                <span className="text-green-800 font-bold">Gemini AI (+8%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Tracker & AI Forecast Section */}
      <PriceForecast />

      {/* 2. AI Matchmaking Section (Verified Farmers) */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center border border-blue-200">
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                {t('aiMatchmakingTitle')}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified Maharashtra farmers matched based on your crop demand, quality specifications & proximity
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-medium overflow-x-auto">
            <button
              onClick={() => setSelectedCrop('all')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                selectedCrop === 'all' ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'mr' ? 'सर्व पिके' : language === 'hi' ? 'सभी फसलें' : 'All Crops'}
            </button>
            <button
              onClick={() => setSelectedCrop('onion')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                selectedCrop === 'onion' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'mr' ? 'कांदा' : language === 'hi' ? 'प्याज' : 'Onion'}
            </button>
            <button
              onClick={() => setSelectedCrop('cotton')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                selectedCrop === 'cotton' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'mr' ? 'कापूस' : language === 'hi' ? 'कपास' : 'Cotton'}
            </button>
            <button
              onClick={() => setSelectedCrop('soybean')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                selectedCrop === 'soybean' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'mr' ? 'सोयाबीन' : language === 'hi' ? 'सोयाबीन' : 'Soybean'}
            </button>
          </div>
        </div>

        {/* Verified Farmers Match Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMatches.map((farmer) => (
            <div
              key={farmer.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 transition-all bg-white hover:shadow-sm space-y-3.5 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                {/* Farmer identity & Verified Badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={farmer.avatar}
                      alt={farmer.farmerName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-slate-900">
                          {farmer.farmerName}
                        </h4>
                        {/* Verified badge next to farmer profile */}
                        <span
                          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold border border-blue-300"
                          title="Government Verified Farmer Profile"
                        >
                          <CheckCircle2 className="w-3 h-3 text-blue-600" />
                          {language === 'mr' ? 'सत्यापित' : language === 'hi' ? 'सत्यापित' : 'Verified'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <MapPin className="w-3 h-3 text-green-600 shrink-0" />
                        <span>{farmer.location} ({farmer.distanceKm} km away)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-mono text-slate-400">
                      ID: {farmer.farmerId}
                    </span>
                    {/* Crop Images Gallery (Optional) */}
                    {farmer.imageGallery && farmer.imageGallery.length > 0 && (
                      <div className="flex -space-x-2 overflow-hidden mt-1">
                        {farmer.imageGallery.map((img, idx) => (
                          <img 
                            key={idx}
                            src={img} 
                            alt="Crop sample" 
                            className="inline-block h-6 w-6 rounded-md ring-1 ring-white object-cover shadow-xs border border-slate-200"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Crop & Quality Score info */}
                <div className="bg-slate-50 p-3 rounded-xl space-y-1.5 text-xs border border-slate-100">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{farmer.crop}</span>
                    <span className="text-green-700">{farmer.quantity} Qtl Available</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span className="flex items-center gap-1 text-green-800 font-semibold">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {language === 'mr' ? 'गुणवत्ता:' : language === 'hi' ? 'गुणवत्ता:' : 'Quality Grade:'} {farmer.qualityGrade}
                    </span>
                    {farmer.fpoAffiliated && (
                      <span className="text-amber-800 font-medium bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-sm">
                        {farmer.fpoAffiliated}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price Quote */}
                <div className="flex items-center justify-between text-xs px-1">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{language === 'mr' ? 'शेतकरी कोट' : language === 'hi' ? 'किसान कोट' : 'Farmer Offer'}</span>
                    <span className="text-base font-extrabold text-blue-900">
                      ₹{farmer.offeredPrice}{' '}
                      <span className="text-xs font-normal text-slate-500">/ Qtl</span>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">{language === 'mr' ? 'एपीएमसी भाव' : language === 'hi' ? 'मंडी भाव' : 'APMC Mandi Rate'}</span>
                    <span className="text-xs font-semibold text-slate-500 line-through">
                      ₹{farmer.marketPrice} / Qtl
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Inspect Quality & Lock Escrow */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={openVisionModal}
                  className="py-2 px-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5 text-green-600" />
                  <span>{language === 'mr' ? 'प्रतवारी रिपोर्ट' : language === 'hi' ? 'ग्रेडिंग रिपोर्ट' : 'Inspection Report'}</span>
                </button>

                <button
                  onClick={() => handleInitiateEscrow(farmer.farmerName)}
                  className="py-2 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-transform active:scale-95 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'एस्क्रोमध्ये खरेदी करा' : language === 'hi' ? 'एस्क्रो से खरीदें' : 'Buy via Escrow'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
