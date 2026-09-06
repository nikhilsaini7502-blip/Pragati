import React, { useState } from 'react';
import { Sprout, Globe, PhoneCall, ShieldCheck, Menu, X, ArrowLeft, Building2, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UserRole, Language } from '../types';

interface NavbarProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  openGrievanceModal: () => void;
  openShareModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRole, setCurrentRole, openGrievanceModal, openShareModal }) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Official Government Top Bar with Natural Tones */}
      <div className="bg-slate-900 text-slate-300 text-xs px-3 sm:px-6 py-1.5 flex justify-between items-center tracking-wide border-b border-slate-800">
        <div className="flex items-center gap-2">
          {/* Government of Maharashtra Seal Representation */}
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-green-600/30 text-green-400 font-bold text-[10px] border border-green-500/40">
              GoM
            </span>
            <span className="font-semibold text-[11px] sm:text-xs text-slate-200 tracking-tight">
              {language === 'mr' ? 'महाराष्ट्र शासन • Government of Maharashtra' : language === 'hi' ? 'महाराष्ट्र शासन • Government of Maharashtra' : 'Government of Maharashtra • Govt. Initiative'}
            </span>
          </div>
          <span className="hidden md:inline-block text-slate-600">•</span>
          <span className="hidden md:inline-block text-slate-400 text-[11px]">
            {language === 'mr' ? 'कौशल्य, रोजगार, उद्योजकता व नाविन्यता विभाग' : language === 'hi' ? 'कौशल, रोजगार, उद्यमिता एवं नवाचार विभाग' : 'Dept. of Skills, Employment, and Innovation'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-slate-300 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-slate-400">System Online</span>
            <span className="text-slate-600">|</span>
            <PhoneCall className="w-3 h-3 text-green-400" />
            <span className="font-medium">1800-120-8040</span>
          </div>

          {/* Dedicated Side Language Selector Pill: English | Marathi | Hindi */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-full border border-slate-700 shadow-2xs">
            <Globe className="w-3 h-3 text-slate-400 ml-1.5 mr-1" />
            {languages.map((lang, idx) => (
              <React.Fragment key={lang.code}>
                {idx > 0 && <div className="w-px h-3 bg-slate-700 my-auto" />}
                <button
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    language === lang.code
                      ? 'bg-green-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title={`Switch to ${lang.label}`}
                >
                  {lang.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3">
          {currentRole !== 'landing' && (
            <button
              onClick={() => setCurrentRole('landing')}
              className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
              title={t('backToHome')}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t('backToHome')}</span>
            </button>
          )}

          <div
            onClick={() => setCurrentRole('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white shadow-sm shadow-green-600/30 group-hover:bg-green-700 transition-colors">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-green-800 leading-none">
                  Pragati {language !== 'en' && <span className="text-slate-700 font-extrabold text-lg sm:text-xl">प्रगती</span>}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-green-50 text-green-800 border border-green-200">
                  Govt. of Maharashtra
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-1">
                {language === 'mr' ? 'थेट बाजारपेठ • अचूक भाव शोध • पारदर्शक शेतकरी दुवा' : language === 'hi' ? 'प्रत्यक्ष बाजार • सटीक मूल्य निर्धारण • पारदर्शी किसान मंच' : 'Direct Market Linkage • AI Price Discovery • Transparent Farmer Network'}
              </p>
            </div>
          </div>
        </div>

        {/* Center/Right Role Navigation Pills for Desktop */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setCurrentRole('landing')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              currentRole === 'landing'
                ? 'bg-white text-green-800 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('backToHome')}
          </button>
          <button
            onClick={() => setCurrentRole('farmer')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentRole === 'farmer'
                ? 'bg-green-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-green-50 hover:text-green-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-green-300 inline-block"></span>
            {t('roleFarmer')}
          </button>
          <button
            onClick={() => setCurrentRole('buyer')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentRole === 'buyer'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-blue-50 hover:text-blue-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-300 inline-block"></span>
            {t('roleBuyer')}
          </button>
          <button
            onClick={() => setCurrentRole('fpo')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentRole === 'fpo'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-orange-50 hover:text-orange-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            {t('roleFpo')}
          </button>
          <button
            onClick={() => setCurrentRole('admin')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentRole === 'admin'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            {t('roleAdmin')}
          </button>
        </nav>

        {/* Right Action: Share Link & Help & Complaints */}
        <div className="flex items-center gap-2">
          {openShareModal && (
            <button
              onClick={openShareModal}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              title="Share app with friends & farmers"
            >
              <Share2 className="w-3.5 h-3.5 text-green-600" />
              <span className="hidden sm:inline">{language === 'mr' ? 'शेअर करा' : language === 'hi' ? 'शेयर करें' : 'Share'}</span>
            </button>
          )}

          <button
            onClick={openGrievanceModal}
            className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            title="Help & Complaints Portal"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>{t('grievanceRedressal')}</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-1">
            <button
              onClick={() => {
                setCurrentRole('farmer');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 cursor-pointer ${
                currentRole === 'farmer' ? 'bg-green-50 border-green-500 text-green-900 font-bold' : 'border-slate-200 text-slate-800'
              }`}
            >
              <span className="text-green-700">🌱 {t('roleFarmer')}</span>
              <span className="text-[10px] text-slate-500 font-normal">Add Lot, Live Mandi, AI Advice</span>
            </button>
            <button
              onClick={() => {
                setCurrentRole('buyer');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 cursor-pointer ${
                currentRole === 'buyer' ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold' : 'border-slate-200 text-slate-800'
              }`}
            >
              <span className="text-blue-700">💼 {t('roleBuyer')}</span>
              <span className="text-[10px] text-slate-500 font-normal">Mandi Analytics, AI Matching</span>
            </button>
            <button
              onClick={() => {
                setCurrentRole('fpo');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 cursor-pointer ${
                currentRole === 'fpo' ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold' : 'border-slate-200 text-slate-800'
              }`}
            >
              <span className="text-amber-700">🏢 {t('roleFpo')}</span>
              <span className="text-[10px] text-slate-500 font-normal">Bulk Aggregation & Storage</span>
            </button>
            <button
              onClick={() => {
                setCurrentRole('admin');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 cursor-pointer ${
                currentRole === 'admin' ? 'bg-slate-100 border-slate-700 text-slate-900 font-bold' : 'border-slate-200 text-slate-800'
              }`}
            >
              <span className="text-slate-900">🛡️ {t('roleAdmin')}</span>
              <span className="text-[10px] text-slate-500 font-normal">Mandi Overseer & Grievances</span>
            </button>
          </div>

          {openShareModal && (
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openShareModal();
                }}
                className="w-full py-2 px-3 rounded-lg bg-green-50 border border-green-200 text-green-800 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-green-600" />
                <span>{language === 'mr' ? 'मित्रांना ॲप लिंक पाठवा (Share Link)' : language === 'hi' ? 'मित्रों को ऐप लिंक साझा करें (Share Link)' : 'Share Pragati App with Friends'}</span>
              </button>
            </div>
          )}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>{language === 'mr' ? 'महाराष्ट्र शासन कृषी हेल्पलाईन:' : language === 'hi' ? 'महाराष्ट्र शासन कृषि हेल्पलाइन:' : 'Govt. of Maharashtra Agri Helpline:'}</span>
            <span className="font-bold text-green-700">1800-120-8040</span>
          </div>
        </div>
      )}
    </header>
  );
};
