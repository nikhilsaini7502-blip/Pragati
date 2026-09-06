import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Building2,
  Briefcase,
  Tractor,
  Phone,
  MapPin,
  FileText,
  AlertCircle,
  Sparkles,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UserRole } from '../types';

interface RoleRegistrationModalProps {
  isOpen: boolean;
  role: UserRole;
  onClose: () => void;
  onRegisterSuccess: (role: UserRole, profile: any) => void;
  onSkip: (role: UserRole) => void;
}

export const RoleRegistrationModal: React.FC<RoleRegistrationModalProps> = ({
  isOpen,
  role,
  onClose,
  onRegisterSuccess,
  onSkip,
}) => {
  const { language } = useLanguage();

  // Common Form States
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Nashik');
  const [taluka, setTaluka] = useState('Niphad');
  
  // Farmer Specific
  const [landAcres, setLandAcres] = useState('4.5');
  const [primaryCrop, setPrimaryCrop] = useState('Onion (कांदा)');
  const [hasKandaChawl, setHasKandaChawl] = useState(true);
  const [aadhaarOrKisanId, setAadhaarOrKisanId] = useState('');

  // Buyer Specific
  const [companyName, setCompanyName] = useState('MahaAgro Retail Pvt Ltd');
  const [gstin, setGstin] = useState('27AABCM1234F1Z8');
  const [unifiedLicense, setUnifiedLicense] = useState('MH-APMC-TRD-9042');
  const [buyerType, setBuyerType] = useState('Corporate Wholesaler');

  // FPO Specific
  const [fpoName, setFpoName] = useState('Sahyadri Farmers Producer Co. Ltd');
  const [fpoCin, setFpoCin] = useState('U01111MH2018PTC304921');
  const [memberFarmersCount, setMemberFarmersCount] = useState('650');
  const [primaryCommodities, setPrimaryCommodities] = useState('Onion, Grapes, Soybean');

  // Mandi Admin Specific
  const [mandiYard, setMandiYard] = useState('Lasalgaon APMC (लासलगाव)');
  const [designation, setDesignation] = useState('Secretary / Senior Market Assayer');
  const [employeeCode, setEmployeeCode] = useState('MH-APMC-NSK-084');
  const [officialEmail, setOfficialEmail] = useState('sec.lasalgaon@apmc.maharashtra.gov.in');

  if (!isOpen || role === 'landing') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile = {
      role,
      fullName: fullName || (role === 'farmer' ? 'Rameshwar Patil' : role === 'buyer' ? 'Vikas Agarwal' : role === 'fpo' ? 'Nitin Jadhav' : 'S. K. Deshmukh'),
      phone: phone || '+91 98221 44521',
      district,
      taluka,
      registeredAt: new Date().toISOString(),
      ...(role === 'farmer' && { landAcres, primaryCrop, hasKandaChawl, aadhaarOrKisanId }),
      ...(role === 'buyer' && { companyName, gstin, unifiedLicense, buyerType }),
      ...(role === 'fpo' && { fpoName, fpoCin, memberFarmersCount, primaryCommodities }),
      ...(role === 'admin' && { mandiYard, designation, employeeCode, officialEmail }),
    };

    // Save to localStorage for persistence
    localStorage.setItem(`pragati_profile_${role}`, JSON.stringify(profile));
    onRegisterSuccess(role, profile);
  };

  const getRoleConfig = () => {
    switch (role) {
      case 'farmer':
        return {
          title: language === 'mr' ? 'शेतकरी नोंदणी' : language === 'hi' ? 'किसान पंजीकरण' : 'Register as Farmer',
          subtitle: language === 'mr' ? 'महाराष्ट्र थेट शेतमाल खरेदी व एआय गुणवत्ता चाचणी' : language === 'hi' ? 'महाराष्ट्र प्रत्यक्ष कृषि उपज खरीद एवं एआई गुणवत्ता परीक्षण' : 'Direct produce listing, AI grading, and assured escrow bank payments',
          badge: language === 'mr' ? 'शेतकरी पोर्टल' : language === 'hi' ? 'किसान पोर्टल' : 'Farmer Portal',
          icon: '🚜',
          color: 'green',
          skipText: language === 'mr' ? 'नोंदणी नको, थेट शेतकरी डॅशबोर्डवर जा →' : language === 'hi' ? 'पंजीकरण छोड़ें, सीधे किसान डैशबोर्ड पर जाएं →' : 'Skip & Continue to Farmer Dashboard →',
          submitText: language === 'mr' ? 'नोंदणी पूर्ण करा आणि डॅशबोर्ड उघडा' : language === 'hi' ? 'पंजीकरण पूरा करें और डैशबोर्ड खोलें' : 'Complete Registration & Open Dashboard',
        };
      case 'buyer':
        return {
          title: language === 'mr' ? 'व्यापारी व खरेदीदार नोंदणी' : language === 'hi' ? 'व्यापारी एवं खरीदार पंजीकरण' : 'Register as Corporate / Mandi Buyer',
          subtitle: language === 'mr' ? 'शेतकऱ्यांकडून थेट मोठ्या प्रमाणावर शेतमाल खरेदीसाठी नोंदणी' : language === 'hi' ? 'किसानों से प्रत्यक्ष थोक कृषि उपज खरीद हेतु पंजीकरण' : 'Institutional procurement, digital contracts, and unified e-NAM trading',
          badge: language === 'mr' ? 'खरेदीदार पोर्टल' : language === 'hi' ? 'खरीदार पोर्टल' : 'Buyer Portal',
          icon: '💼',
          color: 'blue',
          skipText: language === 'mr' ? 'नोंदणी नको, थेट खरेदी डॅशबोर्डवर जा →' : language === 'hi' ? 'पंजीकरण छोड़ें, सीधे खरीद डैशबोर्ड पर जाएं →' : 'Skip & Continue to Procurement Dashboard →',
          submitText: language === 'mr' ? 'नोंदणी करा व खरेदी सुरू करा' : language === 'hi' ? 'पंजीकरण करें और खरीद शुरू करें' : 'Complete Buyer Registration',
        };
      case 'fpo':
        return {
          title: language === 'mr' ? 'शेतकरी उत्पादक कंपनी (FPO) नोंदणी' : language === 'hi' ? 'किसान उत्पादक संगठन (FPO) पंजीकरण' : 'Register as Farmer Producer Organization (FPO)',
          subtitle: language === 'mr' ? 'एकत्रित शेतमाल संकलन, बल्क वाटाघाटी व थेट कॉर्पोरेट विक्री' : language === 'hi' ? 'एकत्रित उपज संकलन, थोक सौदेबाजी और प्रत्यक्ष संस्थागत बिक्री' : 'Aggregate farmer produce, negotiate bulk supply contracts, and dispatch',
          badge: language === 'mr' ? 'FPO संस्था' : language === 'hi' ? 'FPO संगठन' : 'FPO Portal',
          icon: '🏢',
          color: 'orange',
          skipText: language === 'mr' ? 'नोंदणी नको, थेट FPO डॅशबोर्डवर जा →' : language === 'hi' ? 'पंजीकरण छोड़ें, सीधे FPO डैशबोर्ड पर जाएं →' : 'Skip & Continue to FPO Dashboard →',
          submitText: language === 'mr' ? 'FPO नोंदणी पूर्ण करा' : language === 'hi' ? 'FPO पंजीकरण पूरा करें' : 'Complete FPO Registration',
        };
      case 'admin':
      default:
        return {
          title: language === 'mr' ? 'बाजार समिती व प्रशासक नोंदणी' : language === 'hi' ? 'मंडी समिति एवं प्रशासक पंजीकरण' : 'Register as APMC & Mandi Admin',
          subtitle: language === 'mr' ? 'महाराष्ट्र राज्य कृषी पणन मंडळ व ३०५+ बाजार समिती नियंत्रण' : language === 'hi' ? 'महाराष्ट्र राज्य कृषि विपणन बोर्ड एवं मंडी सचिव प्रशासनिक नियंत्रण' : 'State Mandi oversight, real-time arrival supervision, and dispute arbitration',
          badge: language === 'mr' ? 'APMC Mandi Admin' : language === 'hi' ? 'APMC Mandi Admin' : 'APMC Mandi Admin',
          icon: '🛡️',
          color: 'slate',
          skipText: language === 'mr' ? 'नोंदणी नको, थेट प्रशासन डॅशबोर्डवर जा →' : language === 'hi' ? 'पंजीकरण छोड़ें, सीधे प्रशासक कंसोल पर जाएं →' : 'Skip & Continue to Mandi Admin Console →',
          submitText: language === 'mr' ? 'प्रशासक लॉगिन / नोंदणी करा' : language === 'hi' ? 'प्रशासक लॉगिन / पंजीकरण करें' : 'Complete Admin Registration',
        };
    }
  };

  const config = getRoleConfig();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Header with Government emblem & Natural Earthy styling */}
        <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shadow-inner shrink-0">
              {config.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-white">
                  {config.title}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  {config.badge}
                </span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-1">
                {config.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer shrink-0"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Skip Notice Banner (Highlights that registration is optional!) */}
        <div className="bg-amber-50/90 border-b border-amber-200 px-5 py-2.5 flex items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>{language === 'mr' ? 'नोंदणी ऐच्छिक आहे:' : language === 'hi' ? 'पंजीकरण वैकल्पिक है:' : 'Registration is Optional:'}</strong>{' '}
              {language === 'mr'
                ? 'तुम्ही आता नोंदणी न करताही थेट डॅशबोर्ड वापरू शकता.'
                : language === 'hi'
                ? 'आप बिना पंजीकरण किए भी सीधे डैशबोर्ड का उपयोग कर सकते हैं।'
                : 'You can skip registration anytime and explore the dashboard immediately.'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onSkip(role)}
            className="font-bold underline text-amber-950 hover:text-amber-800 shrink-0 cursor-pointer flex items-center gap-1 text-xs"
          >
            <span>{language === 'mr' ? 'वगळा (Skip)' : language === 'hi' ? 'छोड़ें (Skip)' : 'Skip Now'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[72vh] overflow-y-auto">
          
          {/* General Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {role === 'fpo'
                  ? (language === 'mr' ? 'अधिकृत प्रतिनिधीचे नाव:' : 'Authorized Representative Name:')
                  : (language === 'mr' ? 'पूर्ण नाव (Full Name):' : language === 'hi' ? 'पूरा नाम:' : 'Full Legal Name:')}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={role === 'farmer' ? 'उदा. ज्ञानेश्वर पाटील' : 'e.g. Rameshwar Patil'}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'mr' ? 'मोबाईल नंबर (WhatsApp / SMS):' : language === 'hi' ? 'मोबाइल नंबर:' : 'Mobile Number (SMS / Alerts):'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs font-bold text-slate-500">+91</span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98221 44521"
                  className="w-full pl-11 pr-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-mono"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'mr' ? 'जिल्हा (District):' : language === 'hi' ? 'जिला:' : 'District:'}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="Nashik">Nashik (नाशिक)</option>
                <option value="Jalgaon">Jalgaon (जळगाव)</option>
                <option value="Latur">Latur (लातूर)</option>
                <option value="Pune">Pune (पुणे)</option>
                <option value="Solapur">Solapur (सोलापूर)</option>
                <option value="Ahmednagar">Ahmednagar (अहमदनगर)</option>
                <option value="Akola">Akola (अकोला)</option>
                <option value="Sangli">Sangli (सांगली)</option>
                <option value="Kolhapur">Kolhapur (कोल्हापूर)</option>
                <option value="Amravati">Amravati (अमरावती)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'mr' ? 'तालुका / गाव (Taluka / Village):' : language === 'hi' ? 'तालुका / गांव:' : 'Taluka / Village:'}
              </label>
              <input
                type="text"
                value={taluka}
                onChange={(e) => setTaluka(e.target.value)}
                placeholder="e.g. Niphad / Pimpalgaon"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Role Specific Fields */}
          {role === 'farmer' && (
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
              <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <Tractor className="w-4 h-4 text-emerald-700" />
                <span>{language === 'mr' ? 'शेतजमीन व पीक तपशील:' : language === 'hi' ? 'कृषि भूमि एवं फसल विवरण:' : 'Agricultural Land & Crop Details:'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-emerald-900 mb-1">
                    {language === 'mr' ? 'एकूण शेतजमीन (एकर):' : 'Total Land (Acres):'}
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={landAcres}
                    onChange={(e) => setLandAcres(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-emerald-300 bg-white text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-emerald-900 mb-1">
                    {language === 'mr' ? 'मुख्य पीक (Primary Crop):' : 'Primary Produce:'}
                  </label>
                  <select
                    value={primaryCrop}
                    onChange={(e) => setPrimaryCrop(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-emerald-300 bg-white text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="Onion (कांदा)">Nashik Red Onion (कांदा)</option>
                    <option value="Cotton (कापूस)">BT Cotton (कापूस)</option>
                    <option value="Soybean (सोयाबीन)">Yellow Soybean (सोयाबीन)</option>
                    <option value="Pomegranate (डाळिंब)">Bhagwa Pomegranate (डाळिंब)</option>
                    <option value="Grapes (द्राक्षे)">Export Grapes (द्राक्षे)</option>
                    <option value="Wheat (गहू)">Lokwan Wheat (गहू)</option>
                    <option value="Tomato (टोमॅटो)">Hybrid Tomato (टोमॅटो)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-emerald-950 font-medium">
                  <input
                    type="checkbox"
                    checked={hasKandaChawl}
                    onChange={(e) => setHasKandaChawl(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>
                    {language === 'mr'
                      ? 'माझ्याकडे हवा खेळती असणारी कांदा चाळ / साठवणूक सुविधा उपलब्ध आहे.'
                      : 'I have ventilated Kanda Chawl / on-farm storage facility.'}
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-[11px] text-emerald-900 mb-1">
                  {language === 'mr' ? '७/१२ उतारा क्रमांक किंवा पीएम-किसान आयडी (ऐच्छिक):' : '7/12 Survey No. or PM-KISAN ID (Optional):'}
                </label>
                <input
                  type="text"
                  value={aadhaarOrKisanId}
                  onChange={(e) => setAadhaarOrKisanId(e.target.value)}
                  placeholder="e.g. MH/2024/098412"
                  className="w-full px-3 py-1.5 rounded-lg border border-emerald-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-mono"
                />
              </div>
            </div>
          )}

          {role === 'buyer' && (
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-3">
              <h4 className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-blue-700" />
                <span>{language === 'mr' ? 'खरेदीदार कंपनी व परवाना तपशील:' : 'Procurement Entity & Mandi License:'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-blue-900 mb-1">
                    {language === 'mr' ? 'कंपनी / व्यापारी पेढीचे नाव:' : 'Firm / Corporate Name:'}
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-blue-300 bg-white text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-900 mb-1">
                    {language === 'mr' ? 'खरेदीदार प्रकार:' : 'Buyer Category:'}
                  </label>
                  <select
                    value={buyerType}
                    onChange={(e) => setBuyerType(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-blue-300 bg-white text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  >
                    <option value="Corporate Wholesaler">Corporate Wholesaler / Retail</option>
                    <option value="Food Processing Industry">Food Processing & Dehydration Unit</option>
                    <option value="Exporters">Agricultural Exporter (Gulf & Far-East)</option>
                    <option value="APMC Commission Agent">APMC Licensed Commission Agent (आडत्या)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-blue-900 mb-1">
                    GSTIN / PAN:
                  </label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-blue-300 bg-white text-xs text-slate-900 font-mono focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-900 mb-1">
                    {language === 'mr' ? 'एकत्रित कृषी व्यापार परवाना क्रमांक:' : 'Unified APMC Trader License No:'}
                  </label>
                  <input
                    type="text"
                    value={unifiedLicense}
                    onChange={(e) => setUnifiedLicense(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-blue-300 bg-white text-xs text-slate-900 font-mono focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {role === 'fpo' && (
            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 space-y-3">
              <h4 className="text-xs font-bold text-orange-950 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-orange-700" />
                <span>{language === 'mr' ? 'एफपीओ कंपनी व शेतकरी सदस्य संख्या:' : 'FPO Incorporation & Member Strength:'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-orange-900 mb-1">
                    {language === 'mr' ? 'FPO चे नोंदणीकृत नाव:' : 'FPO Registered Name:'}
                  </label>
                  <input
                    type="text"
                    value={fpoName}
                    onChange={(e) => setFpoName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-orange-300 bg-white text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-orange-900 mb-1">
                    {language === 'mr' ? 'एकूण जोडलेले शेतकरी सदस्य:' : 'Total Active Member Farmers:'}
                  </label>
                  <input
                    type="number"
                    value={memberFarmersCount}
                    onChange={(e) => setMemberFarmersCount(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-orange-300 bg-white text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-orange-900 mb-1">
                  {language === 'mr' ? 'कंपनी नोंदणी क्रमांक (CIN / Registration No.):' : 'CIN / FPO Registration Certificate No:'}
                </label>
                <input
                  type="text"
                  value={fpoCin}
                  onChange={(e) => setFpoCin(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-orange-300 bg-white text-xs text-slate-900 font-mono focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {role === 'admin' && (
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-slate-700" />
                <span>{language === 'mr' ? 'बाजार समिती व प्रशासकीय अधिकार:' : 'APMC Mandi Yard & Administrative Desk:'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-800 mb-1">
                    {language === 'mr' ? 'बाजार समिती यार्ड:' : 'APMC Mandi Board:'}
                  </label>
                  <input
                    type="text"
                    value={mandiYard}
                    onChange={(e) => setMandiYard(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-800 mb-1">
                    {language === 'mr' ? 'पदनाम / हुद्दा:' : 'Official Designation:'}
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-800 mb-1">
                    {language === 'mr' ? 'कर्मचारी ओळख क्रमांक (Desk Code):' : 'Officer Desk / Employee Code:'}
                  </label>
                  <input
                    type="text"
                    value={employeeCode}
                    onChange={(e) => setEmployeeCode(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-mono text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-800 mb-1">
                    {language === 'mr' ? 'शासकीय ईमेल (Gov Email):' : 'Official APMC Email:'}
                  </label>
                  <input
                    type="email"
                    value={officialEmail}
                    onChange={(e) => setOfficialEmail(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-mono text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Escrow Guarantee Trust Seal */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>{language === 'mr' ? 'महाडीबीटी व ई-नाम सुरक्षितता:' : 'MahaDBT & e-NAM Verified Security:'}</strong>{' '}
              {language === 'mr'
                ? 'नोंदणीकृत खात्यांना थेट शासकीय एस्क्रो व आरबीआय मान्यताप्राप्त बँक सुरक्षितता मिळते.'
                : 'Registered entities enjoy direct 2-hour RBI-compliant escrow settlements and state trade dispute protection.'}
            </span>
          </div>

          {/* Action Buttons: Explicit Skip vs Submit */}
          <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* SKIP BUTTON - Highly visible and straightforward */}
            <button
              type="button"
              onClick={() => onSkip(role)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{config.skipText}</span>
            </button>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{config.submitText}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
