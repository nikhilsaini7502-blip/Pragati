import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

interface Translations {
  [key: string]: {
    en: string;
    mr: string;
    hi: string;
  };
}

export const translations: Translations = {
  appName: {
    en: 'Pragati',
    mr: 'प्रगती',
    hi: 'प्रगति',
  },
  tagline: {
    en: 'Strengthening Market Linkages & Price Discovery for Farmers',
    mr: 'शेतकऱ्यांसाठी थेट बाजारपेठ आणि अचूक भाव शोध प्रणाली',
    hi: 'किसानों के लिए प्रत्यक्ष बाजार जुड़ाव और सही मूल्य निर्धारण',
  },
  deptName: {
    en: 'Govt. of Maharashtra • Dept. of Skills, Employment, and Innovation',
    mr: 'महाराष्ट्र शासन • कौशल्य, रोजगार, उद्योजकता व नाविन्यता विभाग',
    hi: 'महाराष्ट्र शासन • कौशल, रोजगार, उद्यमिता एवं नवाचार विभाग',
  },
  aiSearchBarPlaceholder: {
    en: "Ask Gemini: Today's Mandi Prices or Crop Advice (e.g. Nashik Onion rate)...",
    mr: "जेमिनीला विचारा: आजचे बाजारभाव किंवा पीक सल्ला (उदा. नाशिक कांदा भाव)...",
    hi: "जेमिनी से पूछें: आज के मंडी भाव या फसल सलाह (उदा. नाशिक प्याज भाव)...",
  },
  roleFarmer: {
    en: 'Farmer',
    mr: 'शेतकरी',
    hi: 'किसान',
  },
  roleFarmerDesc: {
    en: 'Check live Mandi rates, get AI holding advice, and sell directly with zero middleman cuts.',
    mr: 'थेट थेट बाजारभाव तपासा, जेमिनी एआय सल्ला घ्या आणि खात्रीशीर भावात शेतमाल विका.',
    hi: 'लाइव मंडी भाव देखें, एआई होल्डिंग सलाह लें और बिचौलियों के बिना सीधे बेचें।',
  },
  roleBuyer: {
    en: 'Buyer',
    mr: 'खरेदीदार',
    hi: 'खरीदार',
  },
  roleBuyerDesc: {
    en: 'Access verified Maharashtra farm lots, live APMC analytics, and secured escrow procurement.',
    mr: 'प्रमाणित शेतमालाची थेट खरेदी, एपीएमसी डेटा आणि सुरक्षित एस्क्रो व्यवहार करा.',
    hi: 'सत्यापित कृषि उपज, लाइव एपीएमसी डेटा और सुरक्षित एस्क्रो खरीद।',
  },
  roleFpo: {
    en: 'FPO',
    mr: 'शेतकरी गट (FPO)',
    hi: 'किसान उत्पादक संगठन (FPO)',
  },
  roleFpoDesc: {
    en: 'Aggregate smallholder produce, unlock bulk auction rates, and manage shared cold storage.',
    mr: 'शेतकऱ्यांचा माल एकत्र करून मोठ्या खरेदीदारांशी थेट स्पर्धा आणि चांगला दर मिळवा.',
    hi: 'किसानों की फसल इकट्ठा कर थोक नीलामी और बेहतर मूल्य प्राप्त करें।',
  },
  roleAdmin: {
    en: 'APMC & Mandi Admin',
    mr: 'एपीएमसी व कृषी प्रशासन',
    hi: 'एपीएमसी एवं मंडी प्रशासन',
  },
  roleAdminDesc: {
    en: 'Monitor state-wide arrival volumes, oversee price stability, and address farmer grievances.',
    mr: 'राज्यातील आवक आणि भाव नियंत्रण, शेतकरी तक्रार निवारण आणि पारदर्शक व्यवहार.',
    hi: 'मंडी आवक और मूल्य नियंत्रण, किसान शिकायत निवारण और पारदर्शी व्यवस्था।',
  },
  // Key Features
  aiVisionTitle: {
    en: 'Verify Quality via AI',
    mr: 'एआय द्वारे गुणवत्ता तपासणी',
    hi: 'एआई द्वारा गुणवत्ता जांच',
  },
  aiVisionSubtitle: {
    en: 'Powered by Google Gemini Vision. Instant computer-vision grading without Mandi bias.',
    mr: 'गुगल जेमिनी व्हिजन द्वारे झटपट प्रतवारी व योग्य बाजारभावाची हमी.',
    hi: 'गूगल जेमिनी विज़न द्वारा त्वरित ग्रेडिंग और निष्पक्ष मूल्यांकन।',
  },
  trackLogisticsTitle: {
    en: 'Track Logistics & Escrow',
    mr: 'वाहतूक व पुरवठा ट्रॅकिंग',
    hi: 'परिवहन व लॉजिस्टिक्स ट्रैकिंग',
  },
  trackLogisticsSubtitle: {
    en: 'Real-time farm-to-warehouse GPS & temperature tracking for perishables.',
    mr: 'शेतापासून गोदामापर्यंत जीपीएस व तापमान नियंत्रण थेट mobileवर.',
    hi: 'खेत से गोदाम तक जीपीएस और तापमान की लाइव ट्रैकिंग।',
  },
  smartEscrowTitle: {
    en: 'Smart Contract & Escrow',
    mr: 'स्मार्ट कॉन्ट्रॅक्ट आणि सुरक्षित एस्क्रो',
    hi: 'स्मार्ट कॉन्ट्रैक्ट एवं सुरक्षित एस्क्रो',
  },
  smartEscrowSubtitle: {
    en: 'Govt.-monitored escrow account guarantees payment into farmer account in 2 hours.',
    mr: 'शासन मान्य एस्क्रो खाते: वजन होताच २ तासांत पैसे थेट बँक खात्यात.',
    hi: 'सरकारी एस्क्रो गारंटी: तौल होते ही २ घंटे में सीधे बैंक खाते में भुगतान।',
  },
  // Farmer Dashboard
  farmerGreeting: {
    en: 'Welcome, Rameshwar Patil! (Nashik District)',
    mr: 'नमस्कार, रामेश्वर जी! (नाशिक जिल्हा)',
    hi: 'नमस्कार, रामेश्वर जी! (नाशिक जिला)',
  },
  addNewLot: {
    en: 'Add New Lot',
    mr: 'नवीन शेतमाल नोंदवा',
    hi: 'नई फसल लॉट जोड़ें',
  },
  takePhotoAI: {
    en: 'Scan Crop with Camera (AI Grading)',
    mr: 'कॅमेऱ्याने फोटो काढा (एआय गुणवत्ता चाचणी)',
    hi: 'कैमरे से फोटो लें (एआई गुणवत्ता जांच)',
  },
  liveMandiPrices: {
    en: 'Live Maharashtra Mandi Prices',
    mr: 'महाराष्ट्रातील थेट बाजारभाव',
    hi: 'महाराष्ट्र के लाइव मंडी भाव',
  },
  aiAdvisorTitle: {
    en: 'Gemini AI Advisory',
    mr: 'जेमिनी एआय पीक व विक्री सल्ला',
    hi: 'जेमिनी एआई फसल एवं विक्रय सलाह',
  },
  aiAdvisorText: {
    en: 'Gemini Suggestion: Hold your Onion stock for 5 days. Price expected to rise by ₹200/quintal due to lower arrivals in Lasalgaon & Nashik Mandis.',
    mr: 'जेमिनी सल्ला: आपला कांदा ५ दिवस राखून ठेवा. लासलगाव व नाशिक बाजारपेठेत आवक घटल्याने भावात प्रति क्विंटल ₹२०० वाढ अपेक्षित आहे.',
    hi: 'जेमिनी सलाह: अपना प्याज ५ दिन रोक कर रखें। लासलगांव और नाशिक मंडियों में आवक घटने से भाव में ₹२००/क्विंटल की वृद्धि संभव है।',
  },
  // Buyer Dashboard
  buyerDashboardTitle: {
    en: 'Procurement Intelligence Dashboard',
    mr: 'थेट खरेदी व बाजार विश्लेषण डॅशबोर्ड',
    hi: 'खरीद विश्लेषण एवं बाजार डैशबोर्ड',
  },
  aiMatchmakingTitle: {
    en: 'AI Matchmaking: Verified Farmers for You',
    mr: 'एआय शिफारस: आपल्या गरजेनुसार थेट शेतकरी',
    hi: 'एआई सिफारिश: आपकी मांग अनुसार सत्यापित किसान',
  },
  // Grievance
  grievanceRedressal: {
    en: 'Help & Complaints',
    mr: 'मदत आणि तक्रारी',
    hi: 'सहायता और शिकायतें',
  },
  helpline: {
    en: 'Kisan Call Center: 1800-180-1551 | Pragati Toll Free: 1800-120-8040',
    mr: 'किसान कॉल सेंटर: १८००-१८०-१५५१ | प्रगती हेल्पलाईन: १८००-१२०-८०४०',
    hi: 'किसान कॉल सेंटर: 1800-180-1551 | प्रगति हेल्पलाइन: 1800-120-8040',
  },
  backToHome: {
    en: 'Home',
    mr: 'मुख्यपृष्ठ',
    hi: 'मुख्य पृष्ठ',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en'); // Defaults to English

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    if (translations[key] && translations[key]['en']) {
      return translations[key]['en'];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
