import React from 'react';
import { Phone, MessageSquare, AlertCircle, Shield, CheckCircle2, HeartHandshake, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  openGrievanceModal: () => void;
  openLogisticsModal: () => void;
  openVisionModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  openGrievanceModal,
  openLogisticsModal,
  openVisionModal,
}) => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t-4 border-green-600 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Highlight Banner: Official Assistance (Natural Tones) */}
        <div className="bg-slate-800 rounded-2xl p-4 sm:p-6 border border-slate-700 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-green-900/50 border border-green-500/40 flex items-center justify-center text-green-400 shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base sm:text-lg">
                {language === 'mr' ? 'शेतकरी सहाय्यता कक्ष • 24x7 Farmer Helpline' : language === 'hi' ? 'किसान सहायता केंद्र • 24x7 Farmer Helpline' : 'Farmer Assistance Center • 24x7 Mandi Helpline'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                {language === 'mr'
                  ? 'भाव शोध, वजन पडताळणी किंवा पेमेंट अडकल्यास तात्काळ सहाय्य मिळवा.'
                  : language === 'hi'
                  ? 'भाव खोज, तौल सत्यापन या पेमेंट समस्या के लिए तत्काल सहायता प्राप्त करें।'
                  : 'Instant assistance for price discovery, electronic weighment, or escrow payment queries.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <a
              href="tel:18001208040"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4" />
              1800-120-8040 ({language === 'mr' ? 'टोल फ्री' : language === 'hi' ? 'टोल फ्री' : 'Toll Free'})
            </a>
            <a
              href="https://wa.me/918700867502?text=Namaskar%20Pragati%20Mandi%20Assistance"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs sm:text-sm border border-slate-600 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-green-400" />
              WhatsApp Helpdesk
            </a>
            <button
              onClick={openGrievanceModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <AlertCircle className="w-4 h-4" />
              {t('grievanceRedressal')}
            </button>
          </div>
        </div>

        {/* 3 Columns Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-8 border-b border-slate-800 text-xs sm:text-sm">
          {/* Col 1: About */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-green-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                P
              </span>
              <span className="text-white font-bold text-base">
                Pragati (प्रगती) • Maharashtra Agri Market Linkages
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A flagship technology initiative under the Department of Skills, Employment, and Innovation, Government of Maharashtra. Designed to eliminate information asymmetry, offer AI-powered price discovery, and secure farm-gate to buyer transactions via smart escrow.
            </p>
            <div className="flex items-center gap-2 text-green-400 text-xs">
              <Shield className="w-4 h-4 text-green-400" />
              <span>APMC Direct Linkage & Real-time AGMARKNET Integration</span>
            </div>
          </div>

          {/* Col 2: Quick Features */}
          <div className="space-y-2">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider">
              {language === 'mr' ? 'मुख्य सुविधा' : language === 'hi' ? 'मुख्य सुविधाएं' : 'Key Systems'}
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={openVisionModal}
                  className="hover:text-green-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  Google Gemini AI Quality Scanner
                </button>
              </li>
              <li>
                <button
                  onClick={openLogisticsModal}
                  className="hover:text-green-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  Farm-to-Mandi Reefer Logistics
                </button>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  Smart Escrow DBT Payment in 120 Mins
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  305+ Maharashtra APMC Live Feeds
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Government Compliance */}
          <div className="space-y-2">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider">
              {language === 'mr' ? 'शासन व संपर्क' : language === 'hi' ? 'शासन व संपर्क' : 'Governance'}
            </h5>
            <div className="text-xs text-slate-400 space-y-1">
              <p className="text-white font-medium">Mantralaya, Mumbai - 400032</p>
              <p>Dept. of Skills, Employment & Innovation</p>
              <p>Maharashtra State Agri Marketing Board (MSAMB)</p>
              <div className="pt-2">
                <span className="inline-block px-2 py-1 rounded bg-slate-800 text-green-400 text-[11px] font-mono border border-slate-700">
                  Govt Hackathon Prototype v2.6
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Government of Maharashtra. All rights reserved. Designed for Maharashtra Hackathon.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-slate-300 transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 transition-colors">Terms of Mandi Linkage</span>
            <span>•</span>
            <span className="text-green-400 font-medium">Digital India & MahaAgri</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
