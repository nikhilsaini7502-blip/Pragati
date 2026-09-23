import 'package:flutter/material.dart';

class LanguageProvider with ChangeNotifier {
  Locale _currentLocale = const Locale('en');

  Locale get currentLocale => _currentLocale;
  String get currentLanguageCode => _currentLocale.languageCode;

  void setLocale(String langCode) {
    if (['en', 'mr', 'hi'].contains(langCode)) {
      _currentLocale = Locale(langCode);
      notifyListeners();
    }
  }

  String translate(String key) {
    final lang = _currentLocale.languageCode;
    return _translations[lang]?[key] ?? _translations['en']?[key] ?? key;
  }

  static const Map<String, Map<String, String>> _translations = {
    'en': {
      'app_title': 'PRAGATI - Agri-KITE',
      'gov_tag': 'Department of Agriculture, Govt. of Maharashtra',
      'scan_crop': 'AI Crop Quality Scan',
      'diagnose_pest': 'Diagnose Pest / Disease',
      'mandi_rates': 'Live APMC Mandi Rates',
      'buyer_match': 'Direct Buyer Escrow',
      'purity_score': 'Purity Score',
      'grade': 'Quality Grade',
      'shelf_life': 'Est. Shelf Life',
      'msp_bonus': 'Mandi Price Impact',
      'invalid_image': 'Invalid Image Detected',
      'reupload_prompt': 'Please capture a clear photo of real agricultural produce.',
      'hold_verdict': 'HOLD (Expected +₹380/Qtl)',
      'sell_verdict': 'SELL NOW',
    },
    'mr': {
      'app_title': 'प्रगती - कृषी-काईट',
      'gov_tag': 'कृषी विभाग, महाराष्ट्र शासन',
      'scan_crop': 'AI पीक गुणवत्ता तपासणी',
      'diagnose_pest': 'रोग व कीड निदान',
      'mandi_rates': 'थेट बाजारभाव (APMC)',
      'buyer_match': 'थेट खरेदीदार व एस्क्रो करार',
      'purity_score': 'शुद्धता गुणांक',
      'grade': 'गुणवत्ता प्रत',
      'shelf_life': 'अंदाजित साठवणूक काळ',
      'msp_bonus': 'दर फरक',
      'invalid_image': 'अयोग्य फोटो आढळला',
      'reupload_prompt': 'कृपया प्रत्यक्ष शेतातील पिकाचा अथवा धान्याचा स्पष्ट फोटो काढा.',
      'hold_verdict': 'थांबा (HOLD - भाववाढीची शक्यता)',
      'sell_verdict': 'आता विका (SELL NOW)',
    },
    'hi': {
      'app_title': 'प्रगति - कृषि-काइट',
      'gov_tag': 'कृषि विभाग, महाराष्ट्र शासन',
      'scan_crop': 'AI फसल गुणवत्ता जांच',
      'diagnose_pest': 'कीट एवं रोग निदान',
      'mandi_rates': 'लाइव मंडी भाव (APMC)',
      'buyer_match': 'सीधे खरीदार व एस्क्रो अनुबंध',
      'purity_score': 'शुद्धता स्कोर',
      'grade': 'गुणवत्ता ग्रेड',
      'shelf_life': 'अनुमानित शेल्फ लाइफ',
      'msp_bonus': 'मूल्य प्रभाव',
      'invalid_image': 'अमान्य फोटो का पता चला',
      'reupload_prompt': 'कृपया वास्तविक कृषि उत्पाद की स्पष्ट तस्वीर खींचें।',
      'hold_verdict': 'रोकें (HOLD - मूल्य वृद्धि अपेक्षित)',
      'sell_verdict': 'अभी बेचें (SELL NOW)',
    },
  };
}
