import React from 'react';
import { Camera, Bot, Truck, ShieldCheck, TrendingUp, CheckCircle2, ArrowLeft, Share2, Leaf, Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FarmerLot } from '../types';
import { WeatherWidget } from './WeatherWidget';

interface FarmerDashboardProps {
  lots: FarmerLot[];
  openVisionModal: () => void;
  openPestModal: () => void;
  openLogisticsModal: () => void;
  openGeminiModal: (query?: string) => void;
  onBackToHome: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  lots,
  openVisionModal,
  openPestModal,
  openLogisticsModal,
  openGeminiModal,
  onBackToHome,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. Header / Greeting (Clean & Simple) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 sm:hidden"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 rounded-full bg-green-600 text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-md">
            {language === 'mr' ? 'रा' : language === 'hi' ? 'रा' : 'RP'}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-bold text-lg sm:text-xl text-slate-900">
                {t('farmerGreeting')}
              </h2>
              <ShieldCheck className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-sm text-slate-500 font-medium">
              {language === 'mr' ? 'पिंपळगाव बसवंत, नाशिक' : language === 'hi' ? 'पिंपलगांव बसवंत, नाशिक' : 'Pimpalgaon Baswant, Nashik'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Actions (Big, Clear Buttons) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Sell Crop Button */}
        <button
          onClick={openVisionModal}
          className="relative overflow-hidden group bg-green-600 hover:bg-green-700 text-white p-6 rounded-2xl shadow-md transition-all text-left flex flex-col justify-between min-h-[140px] cursor-pointer"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all" />
          <div className="relative z-10 flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/20 rounded-xl">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-xl">
              {language === 'mr' ? 'पीक विका (AI स्कॅन)' : language === 'hi' ? 'फसल बेचें (AI स्कैन)' : 'Sell Crop (AI Scan)'}
            </h3>
          </div>
          <p className="relative z-10 text-green-50 text-sm opacity-90">
            {language === 'mr' ? 'फोटो काढा आणि थेट खरेदीदारांना विका' : language === 'hi' ? 'फोटो खींचें और सीधे खरीदारों को बेचें' : 'Take a photo and sell directly to buyers'}
          </p>
        </button>

        {/* Pest & Disease Detector Button */}
        <button
          onClick={openPestModal}
          className="relative overflow-hidden group bg-red-600 hover:bg-red-700 text-white p-6 rounded-2xl shadow-md transition-all text-left flex flex-col justify-between min-h-[140px] cursor-pointer"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all" />
          <div className="relative z-10 flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/20 rounded-xl">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-xl">
              {language === 'mr' ? 'रोग आणि कीड ओळख' : language === 'hi' ? 'रोग और कीट पहचान' : 'Disease Detector'}
            </h3>
          </div>
          <p className="relative z-10 text-red-50 text-sm opacity-90">
            {language === 'mr' ? 'फोटोवरून रोग ओळखा आणि उपाय मिळवा' : language === 'hi' ? 'फोटो से बीमारी पहचानें और उपाय पाएं' : 'Scan for pests and get instant remedies'}
          </p>
        </button>

        {/* Track Logistics Button */}
        <button
          onClick={openLogisticsModal}
          className="relative overflow-hidden group bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-2xl shadow-md transition-all text-left flex flex-col justify-between min-h-[140px] cursor-pointer"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all" />
          <div className="relative z-10 flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/20 rounded-xl">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-xl">
              {language === 'mr' ? 'वाहतूक ट्रॅक करा' : language === 'hi' ? 'लॉजिस्टिक्स ट्रैक करें' : 'Track Logistics'}
            </h3>
          </div>
          <p className="relative z-10 text-blue-50 text-sm opacity-90">
            {language === 'mr' ? 'तुमच्या पिकाची वाहतूक आणि पेमेंट पहा' : language === 'hi' ? 'अपनी फसल का परिवहन और भुगतान देखें' : 'View your crop transit and escrow status'}
          </p>
        </button>
      </div>

      {/* 3. My Lots for Sale (Simplified List - Now ABOVE Weather) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 px-1">
              <Leaf className="w-5 h-5 text-green-600" />
              {language === 'mr' ? 'माझी विक्रीची पिके' : language === 'hi' ? 'मेरी बिक्री की फसलें' : 'My Crops for Sale'}
            </h3>
            <button
                onClick={openVisionModal}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 font-semibold text-xs border border-green-200 hover:bg-green-100 transition-colors cursor-pointer"
            >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'नवीन पीक जोडा' : language === 'hi' ? 'नई फसल जोड़ें' : 'Add New Lot'}</span>
            </button>
        </div>
        
        {lots.length === 0 ? (
          <div className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
            {language === 'mr' ? 'अद्याप कोणतेही पीक जोडलेले नाही.' : language === 'hi' ? 'अभी तक कोई फसल नहीं जोड़ी गई है।' : 'No crops added for sale yet.'}
          </div>
        ) : (
          <div className="grid gap-4">
            {lots.map((lot) => (
              <div key={lot.id} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:border-green-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Crop Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg border border-green-200 shrink-0">
                    {lot.aiQualityGrade}
                  </div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg text-slate-900">{lot.commodity} <span className="font-mono text-xs text-slate-500 font-medium ml-1">({lot.id})</span></h4>
                    <p className="text-xs sm:text-sm text-slate-500 mb-2">
                      {lot.quantityQuintals} {language === 'mr' ? 'क्विंटल' : language === 'hi' ? 'क्विंटल' : 'Quintals'} • <span className="font-bold text-green-700">₹{lot.expectedPricePerQuintal} / Qtl</span>
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      {/* Status Pill */}
                      {lot.status === 'Escrow Locked' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 w-fit">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          {language === 'mr' ? 'एस्क्रो लॉक (खरेदीदार मिळाला)' : language === 'hi' ? 'एस्क्रो लॉक (खरीदार मिल गया)' : 'Escrow Locked (Buyer)'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200 w-fit">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {language === 'mr' ? 'खरेदीदाराच्या शोधात...' : language === 'hi' ? 'खरीदार की तलाश...' : 'Matching Buyers...'}
                        </span>
                      )}
                      
                      {/* Crop Images Gallery (Optional) */}
                      {lot.imageGallery && lot.imageGallery.length > 0 && (
                        <div className="flex -space-x-2 overflow-hidden sm:ml-2">
                          {lot.imageGallery.map((img, idx) => (
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
                </div>

                {/* Actions */}
                <div className="flex w-full sm:w-auto flex-col gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <button
                    onClick={openLogisticsModal}
                    className="w-full px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Truck className="w-4 h-4" />
                    <span>{language === 'mr' ? 'वाहतूक ट्रॅक करा' : language === 'hi' ? 'लॉजिस्टिक्स ट्रैक करें' : 'Track Logistics'}</span>
                  </button>
                  {lot.status !== 'Escrow Locked' && (
                    <button
                      onClick={openVisionModal}
                      className="w-full px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Camera className="w-4 h-4 text-slate-500" />
                      <span>{language === 'mr' ? 'गुणवत्ता पुन्हा तपासा' : language === 'hi' ? 'गुणवत्ता पुनः जांचें' : 'Re-verify Quality'}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Weather Widget (Now BELOW My Crops) */}
      <WeatherWidget />
      
    </div>
  );
};
