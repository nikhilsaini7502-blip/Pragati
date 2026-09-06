import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Users,
  Activity,
  ArrowLeft,
  CheckCircle2,
  Bell,
  RefreshCw,
  Scale
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sampleGrievances, liveMandiPrices } from '../data/mockData';
import { GrievanceTicket } from '../types';

interface AdminPortalProps {
  onBackToHome: () => void;
  openGrievanceModal: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToHome, openGrievanceModal }) => {
  const { t, language } = useLanguage();
  const [grievances, setGrievances] = useState<GrievanceTicket[]>(sampleGrievances);
  const [rateUpdatedAlert, setRateUpdatedAlert] = useState(false);

  const handleResolve = (id: string) => {
    setGrievances(
      grievances.map((g) => (g.id === id ? { ...g, status: 'Resolved' } : g))
    );
  };

  const handleBroadcastRates = () => {
    setRateUpdatedAlert(true);
    setTimeout(() => setRateUpdatedAlert(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Profile - Natural Tones with Slate/Gold Accent */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <button
            onClick={onBackToHome}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 md:hidden cursor-pointer"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-slate-800/30 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-slate-900">
                {language === 'mr'
                  ? 'महाराष्ट्र कृषी पणन मंडळ व एपीएमसी नियंत्रण कक्ष (MSAMB)'
                  : language === 'hi'
                  ? 'महाराष्ट्र कृषि विपणन बोर्ड एवं एपीएमसी नियंत्रण कक्ष (MSAMB)'
                  : 'Maharashtra State Agricultural Marketing Board (MSAMB Control Room)'}
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-300">
                {language === 'mr' ? 'शासकीय प्रशासन' : language === 'hi' ? 'राज्य प्रशासन' : 'State Administration'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Department of Skills, Employment & Innovation • Real-time State Mandi Overseer
            </p>
          </div>
        </div>

        <button
          onClick={handleBroadcastRates}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{language === 'mr' ? 'दैनिक दर बुलेटिन प्रसारित करा (Sync AGMARKNET)' : language === 'hi' ? 'दैनिक मूल्य बुलेटिन प्रसारित करें (Sync AGMARKNET)' : 'Broadcast Daily Rate Bulletin (Sync AGMARKNET)'}</span>
        </button>
      </div>

      {rateUpdatedAlert && (
        <div className="bg-green-50 border border-green-300 p-3 rounded-xl flex items-center gap-2 text-xs text-green-950 animate-in fade-in shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>
            <strong>{language === 'mr' ? 'यशस्वी!' : language === 'hi' ? 'सफल!' : 'Success!'}</strong>{' '}
            {language === 'mr'
              ? '३०५ महाराष्ट्र कृषी उत्पन्न बाजार समित्यांचे दर व आवक आकडेवारी अद्ययावत झाली.'
              : language === 'hi'
              ? '305 महाराष्ट्र एपीएमसी मंडियों के भाव एवं आवक आंकड़े अपडेट किए गए।'
              : 'Rates and arrival volumes synchronized across 305 Maharashtra APMC mandis.'}
          </span>
        </div>
      )}

      {/* Admin Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] text-slate-500 block">
            {language === 'mr' ? 'सक्रिय बाजार समित्या' : language === 'hi' ? 'सक्रिय मंडियां' : 'Active Mandis'}
          </span>
          <span className="text-xl font-bold text-slate-900">305 Mandis</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] text-slate-500 block">
            {language === 'mr' ? 'आजची एकूण आवक' : language === 'hi' ? 'आज की कुल आवक' : "Today's Total Arrival"}
          </span>
          <span className="text-xl font-bold text-green-700">47,210 Qtl</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] text-slate-500 block">
            {language === 'mr' ? 'एस्क्रो सुरक्षित व्यवहार' : language === 'hi' ? 'एस्क्रो सुरक्षित लेनदेन' : 'Escrow Secured Trade'}
          </span>
          <span className="text-xl font-bold text-blue-700">₹ 1.82 Cr</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] text-slate-500 block">
            {language === 'mr' ? 'प्रलंबित तक्रारी' : language === 'hi' ? 'लंबित शिकायतें' : 'Pending Grievances'}
          </span>
          <span className="text-xl font-bold text-amber-600">2 (Within 24h)</span>
        </div>
      </div>

      {/* Grievance Oversight Panel */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>{language === 'mr' ? 'थेट शेतकरी तक्रार निवारण कक्ष' : language === 'hi' ? 'प्रत्यक्ष किसान शिकायत निवारण कक्ष' : 'Live Farmer Grievance Oversight'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              Citizens charter compliance: All farmer price & weighment issues must be addressed in 24 hours.
            </p>
          </div>
          <button
            onClick={openGrievanceModal}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 underline cursor-pointer"
          >
            {language === 'mr' ? '+ नवीन तक्रार नोंदवा' : language === 'hi' ? '+ नई शिकायत दर्ज करें' : '+ Register New Ticket'}
          </button>
        </div>

        <div className="space-y-3">
          {grievances.map((g) => (
            <div
              key={g.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-800">{g.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      g.status === 'Resolved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-900 animate-pulse'
                    }`}
                  >
                    {g.status === 'Resolved'
                      ? language === 'mr' ? 'निवारण झाले' : language === 'hi' ? 'निस्तारित' : 'Resolved'
                      : language === 'mr' ? 'प्रलंबित (कृती आवश्यक)' : language === 'hi' ? 'लंबित (कार्रवाई आवश्यक)' : 'Pending (Action Required)'}
                  </span>
                </div>
                <p className="font-semibold text-slate-900">{g.category} • {g.mandi} ({g.district})</p>
                <p className="text-slate-600 text-[11px]">{g.description}</p>
                <p className="text-slate-400 text-[10px]">
                  {language === 'mr' ? 'तक्रारदार:' : language === 'hi' ? 'शिकायतकर्ता:' : 'Complainant:'} {g.name} ({g.phone}) • {g.createdAt}
                </p>
              </div>

              {g.status !== 'Resolved' && (
                <button
                  onClick={() => handleResolve(g.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold text-xs shrink-0 self-start sm:self-center transition-colors shadow-2xs cursor-pointer"
                >
                  {language === 'mr' ? 'निवारण चिन्हांकित करा' : language === 'hi' ? 'निस्तारण मार्क करें' : 'Mark as Resolved'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
