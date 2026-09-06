import React from 'react';
import { X, Truck, CheckCircle2, Clock, MapPin, ShieldAlert, ThermometerSnowflake, QrCode, Phone, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sampleLogisticsTimeline } from '../data/mockData';

interface LogisticsTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lotId?: string;
}

export const LogisticsTrackerModal: React.FC<LogisticsTrackerModalProps> = ({
  isOpen,
  onClose,
  lotId = 'LOT-MH-401',
}) => {
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header - Slate Natural Tone */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-green-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2 text-white">
                {language === 'mr'
                  ? 'थेट शेतमाल वाहतूक व एस्क्रो ट्रॅकर'
                  : language === 'hi'
                  ? 'प्रत्यक्ष कृषि उपज परिवहन एवं एस्क्रो ट्रैकर'
                  : 'Live Farm-to-Buyer Cold Chain & Escrow Tracker'}
              </h3>
              <p className="text-xs text-slate-300">
                Lot #{lotId} • Nashik to Pune Reefer Transport • GPS Active
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

        {/* Real-time status cards */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Top Live Vehicle Card - Slate Natural Tone */}
          <div className="bg-slate-800 text-white p-4 rounded-2xl border border-slate-700 space-y-3 shadow-md">
            <div className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-900/50 text-green-400 border border-green-500/30 font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                {language === 'mr' ? 'वाहतूक सुरू आहे (In Transit)' : language === 'hi' ? 'परिवहन जारी है (In Transit)' : 'In Transit - Live Telematics'}
              </span>
              <span className="text-slate-300 text-[11px] font-mono">
                {language === 'mr' ? 'ई-वे बिल:' : language === 'hi' ? 'ई-वे बिल:' : 'E-Way Bill:'} MH-EWAY-2026-9042
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-center">
              <div className="bg-slate-700/50 rounded-xl p-2 border border-slate-600/50">
                <span className="text-[10px] text-slate-400 block">
                  {language === 'mr' ? 'थंड वाहन तापमान' : language === 'hi' ? 'रीफर तापमान' : 'Reefer Temp'}
                </span>
                <span className="text-sm font-bold text-green-400 flex items-center justify-center gap-1">
                  <ThermometerSnowflake className="w-3.5 h-3.5" />
                  18.2 °C ({language === 'mr' ? 'सुरक्षित' : language === 'hi' ? 'सुरक्षित' : 'Safe'})
                </span>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-2 border border-slate-600/50">
                <span className="text-[10px] text-slate-400 block">
                  {language === 'mr' ? 'वाहन क्रमांक' : language === 'hi' ? 'वाहन संख्या' : 'Vehicle Reg.'}
                </span>
                <span className="text-sm font-bold text-white">MH-15-EV-4421</span>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-2 border border-slate-600/50">
                <span className="text-[10px] text-slate-400 block">
                  {language === 'mr' ? 'चालक व संपर्क' : language === 'hi' ? 'ड्राइवर व संपर्क' : 'Driver & Contact'}
                </span>
                <span className="text-sm font-bold text-white flex items-center justify-center gap-1">
                  <Phone className="w-3 h-3 text-amber-400" />
                  Sachin More
                </span>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-2 border border-slate-600/50">
                <span className="text-[10px] text-slate-400 block">
                  {language === 'mr' ? 'अपेक्षित पोहोच वेळ' : language === 'hi' ? 'अनुमानित समय' : 'Estimated Arrival'}
                </span>
                <span className="text-sm font-bold text-amber-400">Today, 04:00 PM</span>
              </div>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {language === 'mr' ? 'प्रवासाचे टप्पे (Transit Milestones):' : language === 'hi' ? 'परिवहन मील के पत्थर:' : 'Transit Milestones & Escrow State:'}
            </h4>

            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {sampleLogisticsTimeline.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Icon Indicator on Timeline */}
                  <div
                    className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step.completed
                        ? 'bg-green-600 text-white ring-4 ring-green-100'
                        : step.current
                        ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : step.current ? (
                      <Clock className="w-3.5 h-3.5" />
                    ) : (
                      idx + 1
                    )}
                  </div>

                  {/* Step Content */}
                  <div
                    className={`p-3.5 rounded-xl border transition-all shadow-2xs ${
                      step.current
                        ? 'bg-amber-50/70 border-amber-300'
                        : step.completed
                        ? 'bg-green-50/40 border-green-200'
                        : 'bg-slate-50 border-slate-200 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                        {step.title}
                      </h5>
                      <span className="text-[11px] font-semibold text-green-800">
                        {step.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                      <MapPin className="w-3 h-3 text-green-600 shrink-0" />
                      <span>{step.location}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 bg-white/80 p-2 rounded-lg border border-slate-200">
                      {step.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Contract & Escrow Guarantee Box */}
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-950 space-y-1">
              <span className="font-bold block">
                {language === 'mr'
                  ? 'महाराष्ट्र शासन स्मार्ट एस्क्रो खात्री (Smart Contract Escrow Protected):'
                  : language === 'hi'
                  ? 'महाराष्ट्र शासन स्मार्ट एस्क्रो गारंटी (Smart Contract Escrow Protected):'
                  : 'Govt. of Maharashtra Escrow Guarantee (Smart Contract Protected):'}
              </span>
              <p className="text-blue-800">
                {language === 'mr'
                  ? 'खरेदीदाराची ₹२,०४,००० रक्कम एस्क्रोमध्ये सुरक्षित आहे. मालाचे वजन गोदामात स्कॅन होताच २ तासांच्या आत थेट शेतकऱ्याच्या बँक खात्यात आरटीजीएस/डीबीटी द्वारे वर्ग होईल.'
                  : language === 'hi'
                  ? 'खरीदार की ₹2,04,000 राशि एस्क्रो में सुरक्षित है। वेयरहाउस में वजन स्कैन होते ही 2 घंटे में किसान के बैंक खाते में आरटीजीएस/डीबीटी से ट्रांसफर होगी।'
                  : 'Buyer funds of ₹2,04,000 are securely locked in institutional escrow. Upon warehouse electronic weighment verification, payment settles to farmer within 2 hours via RTGS/DBT.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <QrCode className="w-4 h-4 text-slate-700" />
            <span>
              {language === 'mr' ? 'गेट स्कॅन डिजिटल पावती उपलब्ध' : language === 'hi' ? 'गेट स्कैन डिजिटल रसीद उपलब्ध' : 'Gate-scan digital e-challan available'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold cursor-pointer shadow-xs"
          >
            {language === 'mr' ? 'बंद करा' : language === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
