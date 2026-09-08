import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Camera,
  Truck,
  ShieldCheck,
  TrendingUp,
  Building2,
  Users,
  Briefcase,
  Shield,
  ArrowRight,
  CheckCircle2,
  Flame,
  Scale,
  Award,
  Share2,
  UserPlus,
  HelpCircle,
  Tractor,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UserRole } from '../types';
import { liveMandiPrices, geminiSearchPresets } from '../data/mockData';
import { RoleRegistrationModal } from './RoleRegistrationModal';

interface LandingPageProps {
  onSelectRole: (role: UserRole) => void;
  openVisionModal: () => void;
  openLogisticsModal: () => void;
  openGeminiModal: (initialQuery?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectRole,
  openVisionModal,
  openLogisticsModal,
  openGeminiModal,
}) => {
  const { t, language } = useLanguage();
  const [searchInput, setSearchInput] = useState('');
  const [registeringRole, setRegisteringRole] = useState<UserRole | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openGeminiModal(searchInput || undefined);
  };

  const handleRegisterSuccess = (role: UserRole, profile: any) => {
    setRegisteringRole(null);
    setToastMessage(
      language === 'mr'
        ? `${profile.fullName || 'नोंदणी'} यशस्वी झाली! डॅशबोर्ड सुरू होत आहे...`
        : language === 'hi'
        ? `${profile.fullName || 'पंजीकरण'} सफल हुआ! डैशबोर्ड लोड हो रहा है...`
        : `Registration successful for ${profile.fullName || 'User'}! Launching dashboard...`
    );
    setTimeout(() => {
      setToastMessage(null);
      onSelectRole(role);
    }, 900);
  };

  const handleSkip = (role: UserRole) => {
    setRegisteringRole(null);
    onSelectRole(role);
  };

  return (
    <div className="space-y-10">
      {/* 1. Hero Section with Natural Tones Earthy Gradient & Prominent AI Search */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 sm:p-10 md:p-12 shadow-xl border border-slate-200">
        
        {/* Farm Background Image with green gradient overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c10?q=80&w=2070&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-emerald-800/90 to-teal-950/95" />

        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        {/* Natural Tones warm blur flares */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-green-400/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-amber-400/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          {/* Official badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-green-50 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
            <span>{t('deptName')}</span>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-black tracking-tight leading-none text-white drop-shadow-2xl">
              PRAGATI
            </h1>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl font-serif font-semibold italic text-amber-100 uppercase tracking-[0.2em] drop-shadow-lg">
              {language === 'mr' ? 'महाराष्ट्र शासन' : language === 'hi' ? 'महाराष्ट्र सरकार' : 'By Govt of Maharashtra'}
            </p>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-white mt-8">
            {language === 'mr' ? (
              <>
                शेतकऱ्यांना थेट बाजारपेठ आणि <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-green-200 to-white">
                  अचूक एआय भाव शोध प्रणाली
                </span>
              </>
            ) : language === 'hi' ? (
              <>
                किसानों के लिए प्रत्यक्ष बाजार और <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-green-200 to-white">
                  सटीक एआई मूल्य निर्धारण प्रणाली
                </span>
              </>
            ) : (
              <>
                Direct Market Linkages & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-green-200 to-white">
                  AI Price Discovery for Farmers
                </span>
              </>
            )}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed mt-4">
            {language === 'mr'
              ? 'दलालांचे कमिशन संपवून गुगल जेमिनी एआय गुणवत्ता तपासणी, ३०५+ बाजार समित्यांचे थेट भाव आणि २ तासांत खात्रीशीर एस्क्रो बँक पेमेंट.'
              : language === 'hi'
              ? 'बिचौलियों के कमीशन को समाप्त कर गूगल जेमिनी एआई ग्रेडिंग, 305+ एपीएमसी लाइव मूल्य और 2 घंटे में सुरक्षित एस्क्रो बैंक भुगतान।'
              : 'Eliminating middlemen commissions with Google Gemini AI crop grading, 305+ Maharashtra APMC real-time price discovery, and secure 2-hour escrow bank settlements.'}
          </p>
        </div>
      </section>

      {/* Registration Success Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-700 flex items-center gap-2.5 animate-in slide-in-from-top-3 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 2. Role Selection Grid: 4 Cards with Register & Skip Options */}
      <section className="space-y-4">
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <UserPlus className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'नोंदणी व थेट प्रवेश प्रणाली' : language === 'hi' ? 'पंजीकरण एवं सीधा प्रवेश' : 'Role Registration & Direct Access'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {language === 'mr' ? 'आपली भूमिका निवडा किंवा नोंदणी करा' : language === 'hi' ? 'अपनी भूमिका चुनें या पंजीकरण करें' : 'Select Your Role or Register'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            {language === 'mr'
              ? 'नोंदणी करून शासकीय लाभ मिळवा किंवा कोणत्याही भूमिकेसाठी "Skip (वगळा)" निवडून त्वरित थेट डॅशबोर्ड वापरा.'
              : language === 'hi'
              ? 'पंजीकरण कर आधिकारिक लाभ लें या किसी भी भूमिका के लिए "Skip (छोड़ें)" चुनकर तुरंत सीधा डैशबोर्ड खोलें।'
              : 'Register for verified benefits or click "Skip" on any role to immediately access the live dashboard.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Farmer */}
          <div
            onClick={() => setRegisteringRole('farmer')}
            className="group relative bg-green-50/70 rounded-2xl p-5 border-2 border-green-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-xl bg-green-600 text-white flex items-center justify-center text-xl font-bold shadow-sm shadow-green-600/30">
                🚜
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">
                    {t('roleFarmer')}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                    {language === 'mr' ? 'शेतकरी पोर्टल' : language === 'hi' ? 'किसान पोर्टल' : 'Farmer'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {t('roleFarmerDesc')}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-green-200/80 space-y-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setRegisteringRole('farmer');
                }}
                className="w-full py-2 px-3 rounded-xl bg-green-700 hover:bg-green-800 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'शेतकरी नोंदणी करा' : language === 'hi' ? 'किसान पंजीकरण' : 'Register as Farmer'}</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRole('farmer');
                }}
                className="w-full py-1 text-center text-xs font-bold text-green-800 hover:text-green-950 flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <span>{language === 'mr' ? 'वगळा (Skip to Dashboard) →' : language === 'hi' ? 'छोड़ें (Skip to Dashboard) →' : 'Skip to Dashboard →'}</span>
              </button>
            </div>
          </div>

          {/* Card 2: Buyer */}
          <div
            onClick={() => setRegisteringRole('buyer')}
            className="group relative bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-sm shadow-blue-600/30">
                💼
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {t('roleBuyer')}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-100">
                    {language === 'mr' ? 'खरेदीदार' : language === 'hi' ? 'खरीदार' : 'Corporate'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {t('roleBuyerDesc')}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setRegisteringRole('buyer');
                }}
                className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'खरेदीदार नोंदणी करा' : language === 'hi' ? 'खरीदार पंजीकरण' : 'Register as Buyer'}</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRole('buyer');
                }}
                className="w-full py-1 text-center text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <span>{language === 'mr' ? 'वगळा (Skip to Dashboard) →' : language === 'hi' ? 'छोड़ें (Skip to Dashboard) →' : 'Skip to Dashboard →'}</span>
              </button>
            </div>
          </div>

          {/* Card 3: FPO */}
          <div
            onClick={() => setRegisteringRole('fpo')}
            className="group relative bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-orange-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center text-xl font-bold shadow-sm shadow-orange-600/30">
                🏢
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-700 transition-colors">
                    {t('roleFpo')}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-100">
                    {language === 'mr' ? 'FPO संस्था' : language === 'hi' ? 'FPO संगठन' : 'Aggregate'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {t('roleFpoDesc')}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setRegisteringRole('fpo');
                }}
                className="w-full py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'FPO नोंदणी करा' : language === 'hi' ? 'FPO पंजीकरण' : 'Register as FPO'}</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRole('fpo');
                }}
                className="w-full py-1 text-center text-xs font-bold text-orange-700 hover:text-orange-900 flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <span>{language === 'mr' ? 'वगळा (Skip to Dashboard) →' : language === 'hi' ? 'छोड़ें (Skip to Dashboard) →' : 'Skip to Dashboard →'}</span>
              </button>
            </div>
          </div>

          {/* Card 4: Admin */}
          <div
            onClick={() => setRegisteringRole('admin')}
            className="group relative bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-slate-800 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xl font-bold shadow-sm">
                🛡️
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                    {t('roleAdmin')}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                    {language === 'mr' ? 'APMC Mandi' : language === 'hi' ? 'APMC Mandi' : 'APMC Mandi'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {t('roleAdminDesc')}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setRegisteringRole('admin');
                }}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'APMC Admin नोंदणी' : language === 'hi' ? 'APMC Admin पंजीकरण' : 'Register APMC Admin'}</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRole('admin');
                }}
                className="w-full py-1 text-center text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <span>{language === 'mr' ? 'वगळा (Skip to Dashboard) →' : language === 'hi' ? 'छोड़ें (Skip to Dashboard) →' : 'Skip to Dashboard →'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Role Registration Modal with Skip Option */}
        {registeringRole && (
          <RoleRegistrationModal
            isOpen={registeringRole !== null}
            role={registeringRole}
            onClose={() => setRegisteringRole(null)}
            onRegisterSuccess={handleRegisterSuccess}
            onSkip={handleSkip}
          />
        )}
      </section>

      {/* 3. Features to Highlight (Natural Tones) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {language === 'mr' ? 'प्रगती क्रांतीकारी वैशिष्ट्ये' : language === 'hi' ? 'प्रगति के प्रमुख नवाचार' : 'Key Platform Innovations'}
          </h3>
          <p className="text-xs text-slate-500">
            {language === 'mr' ? 'थेट चाचणीसाठी खालील कोणत्याही पर्यायावर क्लिक करा' : language === 'hi' ? 'लाइव सिमुलेशन देखने के लिए किसी भी सुविधा पर क्लिक करें' : 'Click any innovation below to launch interactive live simulation'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Feature 1: Verify Quality via AI */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center border border-green-100">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-green-700">
                  Google Gemini Vision
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  {t('aiVisionTitle')}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {t('aiVisionSubtitle')}
                </p>
              </div>
            </div>

            <button
              onClick={openVisionModal}
              className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-98 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>{language === 'mr' ? 'कॅमेऱ्याने गुणवत्ता तपासा (AI Scan)' : language === 'hi' ? 'कैमरे से गुणवत्ता जांचें (AI Scan)' : 'Inspect Quality via AI Vision'}</span>
            </button>
          </div>

          {/* Feature 2: Track Logistics */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-blue-700">
                  Smart Cold Chain & GPS
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  {t('trackLogisticsTitle')}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {t('trackLogisticsSubtitle')}
                </p>
              </div>
            </div>

            <button
              onClick={openLogisticsModal}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-98 cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              <span>{language === 'mr' ? 'थेट वाहतूक स्थिती पहा (Live Tracker)' : language === 'hi' ? 'लाइव शिपमेंट ट्रैकिंग देखें' : 'Track Live Cold-Chain Shipment'}</span>
            </button>
          </div>

          {/* Feature 3: Smart Contract & Escrow */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-amber-700">
                  DBT Escrow Guarantee
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  {t('smartEscrowTitle')}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {t('smartEscrowSubtitle')}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-semibold text-[11px] leading-relaxed">
                {language === 'mr' ? '१००% शासकीय हमी: व्यापाऱ्याने पैसे रोखल्यास शासनाकडून विनाविलंब भरपाई.' : language === 'hi' ? '100% सरकारी गारंटी: तौल होते ही 2 घंटे में डीबीटी द्वारा सीधा बैंक भुगतान।' : '100% Govt. Guarantee: Automated 2-hour DBT bank settlement upon weighment validation.'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Live Mandi Prices Snapshot Section (Natural Tones) */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {t('liveMandiPrices')}
              </h3>
              <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold animate-pulse">
                LIVE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Real-time modal rates from Lasalgaon, Jalgaon, Latur, and Sangli APMC
            </p>
          </div>

          <button
            onClick={() => onSelectRole('farmer')}
            className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>{language === 'mr' ? 'सर्व जिल्हे व बाजार समित्या पहा' : language === 'hi' ? 'सभी जिले व मंडियां देखें' : 'View All Districts & Mandis'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {liveMandiPrices.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-green-300 transition-colors space-y-2.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    {language === 'mr' ? item.commodityLocal.mr : language === 'hi' ? item.commodityLocal.hi : item.commodity}
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    {item.mandi} • {language === 'mr' ? 'आवक' : language === 'hi' ? 'आवक' : 'Arrival'}: {item.arrivalVolume}
                  </span>
                </div>
                <span
                  className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                    item.trend === 'up'
                      ? 'bg-green-100 text-green-800'
                      : item.trend === 'down'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-slate-200 text-slate-800'
                  }`}
                >
                  {item.trend === 'up' ? `+₹${item.change}` : item.trend === 'down' ? `-₹${Math.abs(item.change)}` : (language === 'mr' ? 'स्थिर' : language === 'hi' ? 'स्थिर' : 'Stable')}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1.5 border-t border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 block">{language === 'mr' ? 'सरासरी भाव (Modal)' : language === 'hi' ? 'औसत भाव (Modal)' : 'Modal Price'}</span>
                  <span className="text-base font-extrabold text-green-700">
                    ₹{item.modalPrice.toLocaleString('en-IN')}{' '}
                    <span className="text-xs font-normal text-slate-500">/{language === 'mr' ? 'क्विंटल' : language === 'hi' ? 'क्विंटल' : 'Qtl'}</span>
                  </span>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  {language === 'mr' ? 'कमाल:' : language === 'hi' ? 'अधिकतम:' : 'Max:'} ₹{item.maxPrice.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Market Trend Alert Box matching Design HTML */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
          <div>
            <p className="text-xs font-bold text-blue-800 mb-0.5">{language === 'mr' ? 'बाजार दिशा • Market Trend' : language === 'hi' ? 'बाजार रुझान • Market Trend' : 'Market Trend • Intelligence'}</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              {language === 'mr'
                ? 'नाशिक व लातूर बाजारपेठेत आज आवक सामान्य आहे. संध्याकाळपर्यंत भावात तेजीची शक्यता. शेतकऱ्यांनी घाईगडबडीत कमी भावात माल विकू नये.'
                : language === 'hi'
                ? 'नाशिक और लातूर मंडियों में आज आवक सामान्य है। शाम तक भाव में तेजी की संभावना है। किसान जल्दबाजी में कम भाव पर बिक्री न करें।'
                : 'Arrival volumes are moderate today across Nashik & Latur. Price uptick expected by evening. Farmers are advised to hold premium stock for higher realization.'}
            </p>
          </div>
        </div>

      </section>
    </div>
  );
};
