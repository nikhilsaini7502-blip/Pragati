import React, { useState } from 'react';
import {
  CloudRain,
  Sun,
  CloudSun,
  Droplets,
  Wind,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  RefreshCw,
  Thermometer,
  ShieldAlert,
  Info,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface WeatherData {
  district: string;
  districtLocal: { mr: string; hi: string };
  region: string;
  temperature: number;
  tempMin: number;
  tempMax: number;
  feelsLike: number;
  humidity: number;
  rainfallProbability: number;
  expectedRainfallMm: number;
  windSpeedKmH: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Rain Showers' | 'Thunderstorm' | 'Humid Overcast';
  conditionLocal: { mr: string; hi: string };
  harvestIndex: 'Optimal' | 'Caution' | 'Unfavorable';
  optimalHarvestHours: string;
  alerts: {
    type: 'warning' | 'info' | 'critical';
    title: string;
    titleLocal: { mr: string; hi: string };
    message: string;
    messageLocal: { mr: string; hi: string };
    cropsAffected: string[];
  }[];
  forecast: {
    day: string;
    dayLocal: { mr: string; hi: string };
    temp: string;
    rainProb: number;
    humidity: number;
    condition: string;
    harvestRating: 'Safe' | 'Caution' | 'Avoid';
  }[];
}

const DISTRICT_WEATHER: Record<string, WeatherData> = {
  Nashik: {
    district: 'Nashik',
    districtLocal: { mr: 'नाशिक (पिंपळगाव/लासलगाव)', hi: 'नाशिक (पिंपलगांव/लासलगांव)' },
    region: 'North Maharashtra Onion & Grape Belt',
    temperature: 29,
    tempMin: 21,
    tempMax: 33,
    feelsLike: 31,
    humidity: 78,
    rainfallProbability: 65,
    expectedRainfallMm: 14.5,
    windSpeedKmH: 16,
    condition: 'Rain Showers',
    conditionLocal: { mr: 'अवकाळी पावसाची शक्यता', hi: 'बेमौसम बारिश की संभावना' },
    harvestIndex: 'Caution',
    optimalHarvestHours: '07:30 AM - 12:00 PM',
    alerts: [
      {
        type: 'critical',
        title: 'Unseasonal Rain Warning (Next 18 Hrs)',
        titleLocal: {
          mr: 'अवकाळी पाऊस इशारा (पुढील १८ तास)',
          hi: 'बेमौसम बारिश चेतावनी (अगले 18 घंटे)',
        },
        message: 'Pre-monsoon thundershowers (12-18mm) expected in Niphad & Chandwad. Cover open-field Onion drying stacks immediately with waterproof tarpaulins.',
        messageLocal: {
          mr: 'निफाड व चांदवड पट्ट्यात १२-१८ मिमी पावसाची शक्यता. शेतात वाळत घातलेला कांदा तातडीने ताडपत्रीने झाकून सुरक्षित ठेवावा.',
          hi: 'निफाड व चांदवड़ क्षेत्र में 12-18 मिमी बारिश का अनुमान। खुले खेत में सूख रहे प्याज को तुरंत तिरपाल से ढकें।',
        },
        cropsAffected: ['Onion (कांदा)', 'Grapes (द्राक्षे)', 'Pomegranate'],
      },
      {
        type: 'warning',
        title: 'High Humidity Fungal Risk (78% RH)',
        titleLocal: {
          mr: 'जास्त आर्द्रता बुरशीजन्य रोगाचा धोका (७८% RH)',
          hi: 'अधिक नमी फफूंद रोग जोखिम (78% RH)',
        },
        message: 'Relative humidity exceeds safe curing limits. Delay packing in gunny bags until moisture drops below 11% to prevent black mold and rot.',
        messageLocal: {
          mr: 'आर्द्रता वाढल्याने साठवणुकीत कांदा सडण्याची शक्यता. बारदान्यात पॅक करण्यापूर्वी पूर्ण कोरडा होऊ द्या.',
          hi: 'नमी अधिक होने से प्याज में सड़न का खतरा। बोरियों में भरने से पहले पूरी तरह सूखने दें।',
        },
        cropsAffected: ['Onion', 'Tomato'],
      },
    ],
    forecast: [
      {
        day: 'Today',
        dayLocal: { mr: 'आज', hi: 'आज' },
        temp: '29° / 21°',
        rainProb: 65,
        humidity: 78,
        condition: 'Scattered Showers',
        harvestRating: 'Caution',
      },
      {
        day: 'Tomorrow',
        dayLocal: { mr: 'उद्या', hi: 'कल' },
        temp: '31° / 20°',
        rainProb: 40,
        humidity: 70,
        condition: 'Partly Cloudy',
        harvestRating: 'Safe',
      },
      {
        day: 'Day After',
        dayLocal: { mr: 'परवा', hi: 'परसों' },
        temp: '33° / 22°',
        rainProb: 15,
        humidity: 58,
        condition: 'Sunny & Dry',
        harvestRating: 'Safe',
      },
    ],
  },
  Pune: {
    district: 'Pune',
    districtLocal: { mr: 'पुणे (जुन्नर/आंबेगाव)', hi: 'पुणे (जुन्नर/आंबेगांव)' },
    region: 'Western Ghats Vegetable Belt',
    temperature: 28,
    tempMin: 20,
    tempMax: 32,
    feelsLike: 30,
    humidity: 72,
    rainfallProbability: 35,
    expectedRainfallMm: 4.0,
    windSpeedKmH: 14,
    condition: 'Partly Cloudy',
    conditionLocal: { mr: 'अंशतः ढगाळ वातावरण', hi: 'आंशिक रूप से बादल' },
    harvestIndex: 'Optimal',
    optimalHarvestHours: '07:00 AM - 02:00 PM',
    alerts: [
      {
        type: 'info',
        title: 'Favorable Morning Harvesting Window',
        titleLocal: {
          mr: 'सकाळच्या वेळी सुलभ काढणी वेळ',
          hi: 'सुबह की अनुकूल कटाई अवधि',
        },
        message: 'Morning humidity (65-72%) is optimal for harvesting leafy vegetables and tomatoes. Finish sorting before afternoon cloud build-up.',
        messageLocal: {
          mr: 'टोमॅटो व पालेभाज्या काढणीसाठी सकाळची वेळ अनुकूल आहे. दुपारपूर्वी ग्रेडिंग पूर्ण करून बाजारात पाठवा.',
          hi: 'टमाटर व सब्जियों की कटाई के लिए सुबह का समय उत्तम है। दोपहर से पहले ग्रेडिंग पूरी करें।',
        },
        cropsAffected: ['Tomato', 'Onion', 'Capsicum'],
      },
    ],
    forecast: [
      { day: 'Today', dayLocal: { mr: 'आज', hi: 'आज' }, temp: '28° / 20°', rainProb: 35, humidity: 72, condition: 'Partly Cloudy', harvestRating: 'Safe' },
      { day: 'Tomorrow', dayLocal: { mr: 'उद्या', hi: 'कल' }, temp: '30° / 21°', rainProb: 25, humidity: 65, condition: 'Clear Sky', harvestRating: 'Safe' },
      { day: 'Day After', dayLocal: { mr: 'परवा', hi: 'परसों' }, temp: '32° / 22°', rainProb: 20, humidity: 60, condition: 'Sunny', harvestRating: 'Safe' },
    ],
  },
  Jalgaon: {
    district: 'Jalgaon',
    districtLocal: { mr: 'जळगाव (केळी व कापूस पट्टा)', hi: 'जलगांव (केला व कपास क्षेत्र)' },
    region: 'Khandesh Cotton & Banana Belt',
    temperature: 36,
    tempMin: 24,
    tempMax: 39,
    feelsLike: 39,
    humidity: 48,
    rainfallProbability: 10,
    expectedRainfallMm: 0,
    windSpeedKmH: 18,
    condition: 'Sunny',
    conditionLocal: { mr: 'कडक ऊन व उष्ण हवामान', hi: 'तेज धूप व गर्म मौसम' },
    harvestIndex: 'Optimal',
    optimalHarvestHours: '06:00 AM - 10:30 AM',
    alerts: [
      {
        type: 'warning',
        title: 'High Afternoon Heat (39°C Peak)',
        titleLocal: {
          mr: 'दुपारी तीव्र उष्णता (३९°C)',
          hi: 'दोपहर में तेज गर्मी (39°C)',
        },
        message: 'Harvest Cotton and Banana bunches early morning to prevent rapid moisture desiccation and fiber brittleness.',
        messageLocal: {
          mr: 'कापूस वेचणी व केळी कापणी सकाळी १० पूर्वी आटोपावी. कडक उन्हामुळे शेतमालाची प्रत खराब होऊ शकते.',
          hi: 'कपास व केले की कटाई सुबह 10 बजे से पहले पूरी करें। तेज धूप से गुणवत्ता प्रभावित हो सकती है।',
        },
        cropsAffected: ['Cotton (कापूस)', 'Banana (केळी)'],
      },
    ],
    forecast: [
      { day: 'Today', dayLocal: { mr: 'आज', hi: 'आज' }, temp: '36° / 24°', rainProb: 10, humidity: 48, condition: 'Sunny', harvestRating: 'Safe' },
      { day: 'Tomorrow', dayLocal: { mr: 'उद्या', hi: 'कल' }, temp: '38° / 25°', rainProb: 5, humidity: 44, condition: 'Hot & Dry', harvestRating: 'Safe' },
      { day: 'Day After', dayLocal: { mr: 'परवा', hi: 'परसों' }, temp: '39° / 26°', rainProb: 5, humidity: 42, condition: 'Sunny', harvestRating: 'Safe' },
    ],
  },
  Latur: {
    district: 'Latur',
    districtLocal: { mr: 'लातूर (सोयाबीन व डाळी)', hi: 'लातूर (सोयाबीन व दालें)' },
    region: 'Marathwada Pulses & Oilseeds Hub',
    temperature: 33,
    tempMin: 22,
    tempMax: 35,
    feelsLike: 34,
    humidity: 56,
    rainfallProbability: 20,
    expectedRainfallMm: 1.2,
    windSpeedKmH: 12,
    condition: 'Partly Cloudy',
    conditionLocal: { mr: 'अंशतः ढगाळ', hi: 'आंशिक बादल' },
    harvestIndex: 'Optimal',
    optimalHarvestHours: '08:00 AM - 04:00 PM',
    alerts: [
      {
        type: 'info',
        title: 'Ideal Soybean Moisture Window (10-12%)',
        titleLocal: {
          mr: 'सोयाबीनसाठी योग्य ओलावा (१०-१२%)',
          hi: 'सोयाबीन हेतु उपयुक्त नमी (10-12%)',
        },
        message: 'Current dry conditions ensure optimal pod threshed moisture. Mandi buyers offering zero-deduction rates for dry lots.',
        messageLocal: {
          mr: 'सध्याच्या कोरड्या हवामानामुळे मळणी केलेले सोयाबीन थेट विक्रीयोग्य आहे. बाजारात चांगला भाव मिळेल.',
          hi: 'मौसम अनुकूल रहने से सूखा सोयाबीन बिना किसी कटौती के उच्चतम मूल्य प्राप्त कर रहा है।',
        },
        cropsAffected: ['Soybean (सोयाबीन)', 'Tur (तूर)'],
      },
    ],
    forecast: [
      { day: 'Today', dayLocal: { mr: 'आज', hi: 'आज' }, temp: '33° / 22°', rainProb: 20, humidity: 56, condition: 'Partly Cloudy', harvestRating: 'Safe' },
      { day: 'Tomorrow', dayLocal: { mr: 'उद्या', hi: 'कल' }, temp: '34° / 23°', rainProb: 15, humidity: 52, condition: 'Sunny', harvestRating: 'Safe' },
      { day: 'Day After', dayLocal: { mr: 'परवा', hi: 'परसों' }, temp: '35° / 23°', rainProb: 10, humidity: 50, condition: 'Dry', harvestRating: 'Safe' },
    ],
  },
  Solapur: {
    district: 'Solapur',
    districtLocal: { mr: 'सोलापूर (डाळिंब व कांदा)', hi: 'सोलापुर (अनार व प्याज)' },
    region: 'South Maharashtra Horticultural Zone',
    temperature: 34,
    tempMin: 23,
    tempMax: 37,
    feelsLike: 36,
    humidity: 52,
    rainfallProbability: 25,
    expectedRainfallMm: 2.0,
    windSpeedKmH: 15,
    condition: 'Partly Cloudy',
    conditionLocal: { mr: 'हलके ढग व ऊन', hi: 'हल्के बादल व धूप' },
    harvestIndex: 'Optimal',
    optimalHarvestHours: '07:00 AM - 01:00 PM',
    alerts: [
      {
        type: 'info',
        title: 'Safe Pomegranate & Onion Curing',
        titleLocal: {
          mr: 'डाळिंब व कांदा काढणीसाठी अनुकूल वातावरण',
          hi: 'अनार व प्याज कटाई के लिए अनुकूल मौसम',
        },
        message: 'Low ambient humidity facilitates rapid post-harvest skin tightening. Suitable for long-distance transport to Mumbai/Pune markets.',
        messageLocal: {
          mr: 'कमी आर्द्रतेमुळे डाळिंबाची प्रत उत्कृष्ट टिकून राहील. लांब पल्ल्याच्या वाहतुकीसाठी माल तयार करा.',
          hi: 'कम नमी से अनार की चमक बनी रहेगी। लंबी दूरी के परिवहन के लिए माल तैयार करें।',
        },
        cropsAffected: ['Pomegranate (डाळिंब)', 'Onion'],
      },
    ],
    forecast: [
      { day: 'Today', dayLocal: { mr: 'आज', hi: 'आज' }, temp: '34° / 23°', rainProb: 25, humidity: 52, condition: 'Partly Cloudy', harvestRating: 'Safe' },
      { day: 'Tomorrow', dayLocal: { mr: 'उद्या', hi: 'कल' }, temp: '35° / 24°', rainProb: 20, humidity: 50, condition: 'Sunny', harvestRating: 'Safe' },
      { day: 'Day After', dayLocal: { mr: 'परवा', hi: 'परसों' }, temp: '36° / 24°', rainProb: 15, humidity: 48, condition: 'Sunny', harvestRating: 'Safe' },
    ],
  },
};

interface WeatherWidgetProps {
  onAskGeminiAdvisor?: (query: string) => void;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ onAskGeminiAdvisor }) => {
  const { language } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Nashik');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Just now (11:45 AM)');

  const weather = DISTRICT_WEATHER[selectedDistrict] || DISTRICT_WEATHER.Nashik;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastUpdated(`Updated ${timeString}`);
    }, 600);
  };

  const getWeatherIcon = (cond: string) => {
    if (cond.includes('Rain') || cond.includes('Showers')) {
      return <CloudRain className="w-8 h-8 text-blue-500 animate-bounce" />;
    }
    if (cond.includes('Sunny') || cond.includes('Hot')) {
      return <Sun className="w-8 h-8 text-amber-500 animate-spin-slow" />;
    }
    return <CloudSun className="w-8 h-8 text-amber-600" />;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
      {/* Top Header Bar: District Selector & Live Agro-Meteorology Banner */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 shrink-0">
            <CloudRain className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base sm:text-lg text-white">
                {language === 'mr'
                  ? 'थेट कृषी हवामान व काढणी सल्लागार'
                  : language === 'hi'
                  ? 'लाइव कृषि मौसम एवं कटाई सलाहकार'
                  : 'Real-Time Agro-Weather & Harvest Advisory'}
              </h3>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                Live Feed
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {language === 'mr'
                ? 'पाऊस, तापमान आणि हवेतील आर्द्रता विश्लेषण • पीक गुणवत्ता संरक्षण'
                : language === 'hi'
                ? 'बारिश, तापमान व आर्द्रता विश्लेषण • फसल गुणवत्ता सुरक्षा'
                : 'Rainfall, temperature & humidity alerts to protect crop quality & timing'}
            </p>
          </div>
        </div>

        {/* Right side controls: District Selector + Refresh */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="appearance-none bg-slate-800 text-white text-xs font-semibold pl-3 pr-8 py-2 rounded-xl border border-slate-700 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
            >
              {Object.keys(DISTRICT_WEATHER).map((dist) => (
                <option key={dist} value={dist}>
                  {language === 'mr'
                    ? DISTRICT_WEATHER[dist].districtLocal.mr
                    : language === 'hi'
                    ? DISTRICT_WEATHER[dist].districtLocal.hi
                    : `${dist} District`}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={handleRefresh}
            title="Refresh Live Weather"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-green-400' : ''}`} />
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 pt-0 space-y-4">
        {/* Real-Time Metrics Cards (Temperature, Rain Probability, Humidity, Wind) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* 1. Temperature */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-600" />
                {language === 'mr' ? 'तापमान' : language === 'hi' ? 'तापमान' : 'Temperature'}
              </span>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-sm font-medium">
                {weather.tempMin}° - {weather.tempMax}°C
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {weather.temperature}°C
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {language === 'mr'
                ? `जाणवणारे तापमान: ${weather.feelsLike}°C`
                : language === 'hi'
                ? `महसूस: ${weather.feelsLike}°C`
                : `Feels like ${weather.feelsLike}°C`}
            </p>
          </div>

          {/* 2. Rainfall & Precipitation */}
          <div className={`rounded-xl p-3.5 space-y-1 border transition-all ${
            weather.rainfallProbability > 50
              ? 'bg-blue-50/80 border-blue-300'
              : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs">
              <span className={`font-semibold flex items-center gap-1 ${
                weather.rainfallProbability > 50 ? 'text-blue-900' : 'text-slate-500'
              }`}>
                <CloudRain className="w-3.5 h-3.5 text-blue-600" />
                {language === 'mr' ? 'पाऊस शक्यता' : language === 'hi' ? 'वर्षा संभावना' : 'Rain Probability'}
              </span>
              {weather.rainfallProbability > 50 && (
                <span className="text-[10px] bg-blue-200/80 text-blue-900 px-1.5 py-0.2 rounded-sm font-bold animate-pulse">
                  Alert
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl sm:text-3xl font-black ${
                weather.rainfallProbability > 50 ? 'text-blue-800' : 'text-slate-900'
              }`}>
                {weather.rainfallProbability}%
              </span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">
              {weather.expectedRainfallMm > 0
                ? `${weather.expectedRainfallMm} mm ${language === 'mr' ? 'अपेक्षित' : language === 'hi' ? 'अनुमानित' : 'forecast'}`
                : language === 'mr' ? 'पावसाची शक्यता नाही' : language === 'hi' ? 'शुष्क मौसम' : 'Dry conditions'}
            </p>
          </div>

          {/* 3. Relative Humidity */}
          <div className={`rounded-xl p-3.5 space-y-1 border transition-all ${
            weather.humidity > 75
              ? 'bg-amber-50/70 border-amber-300'
              : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs">
              <span className={`font-semibold flex items-center gap-1 ${
                weather.humidity > 75 ? 'text-amber-900' : 'text-slate-500'
              }`}>
                <Droplets className="w-3.5 h-3.5 text-blue-600" />
                {language === 'mr' ? 'हवेतील आर्द्रता' : language === 'hi' ? 'आर्द्रता (नमी)' : 'Humidity (RH)'}
              </span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-sm font-bold ${
                weather.humidity > 75 ? 'bg-amber-200 text-amber-900' : 'bg-green-100 text-green-800'
              }`}>
                {weather.humidity > 75
                  ? language === 'mr' ? 'जास्त' : language === 'hi' ? 'अधिक' : 'Elevated'
                  : language === 'mr' ? 'योग्य' : language === 'hi' ? 'सामान्य' : 'Normal'}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl sm:text-3xl font-black ${
                weather.humidity > 75 ? 'text-amber-900' : 'text-slate-900'
              }`}>
                {weather.humidity}%
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              {weather.humidity > 75
                ? language === 'mr' ? 'बुरशीजन्य रोगाची जोखीम' : language === 'hi' ? 'फफूंद रोग का जोखिम' : 'High fungal spore risk'
                : language === 'mr' ? 'साठवणुकीसाठी सुरक्षित' : language === 'hi' ? 'भंडारण हेतु सुरक्षित' : 'Safe for storage'}
            </p>
          </div>

          {/* 4. Wind Speed & Field Conditions */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-slate-700" />
                {language === 'mr' ? 'वाऱ्याचा वेग' : language === 'hi' ? 'हवा की गति' : 'Wind Speed'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {weather.windSpeedKmH < 20 ? 'Mild' : 'Breezy'}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {weather.windSpeedKmH}
              </span>
              <span className="text-xs text-slate-500 font-semibold">km/h</span>
            </div>
            <p className="text-[11px] text-slate-500">
              {weather.windSpeedKmH <= 15
                ? language === 'mr' ? 'औषध फवारणीसाठी योग्य' : language === 'hi' ? 'छिड़काव हेतु उत्तम' : 'Safe for pesticide spray'
                : language === 'mr' ? 'फवारणी टाळावी' : language === 'hi' ? 'छिड़काव से बचें' : 'High spray drift risk'}
            </p>
          </div>
        </div>

        {/* Harvest Index & Recommended Window Strip */}
        <div className="p-3.5 rounded-xl bg-green-50/70 border border-green-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-green-950 uppercase tracking-wide">
                  {language === 'mr' ? 'काढणी अनुकूलता निर्देशांक:' : language === 'hi' ? 'कटाई अनुकूलता सूचकांक:' : 'Harvest Feasibility Index:'}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  weather.harvestIndex === 'Optimal'
                    ? 'bg-green-600 text-white'
                    : weather.harvestIndex === 'Caution'
                    ? 'bg-amber-500 text-white'
                    : 'bg-red-600 text-white'
                }`}>
                  {weather.harvestIndex === 'Optimal'
                    ? language === 'mr' ? 'उत्कृष्ट वेळ (Optimal)' : language === 'hi' ? 'उत्तम समय (Optimal)' : 'Optimal Window'
                    : weather.harvestIndex === 'Caution'
                    ? language === 'mr' ? 'सावधगिरी (Caution)' : language === 'hi' ? 'सावधानी (Caution)' : 'Caution Advised'
                    : language === 'mr' ? 'काढणी टाळा (Unfavorable)' : language === 'hi' ? 'कटाई टालें (Unfavorable)' : 'Unfavorable'}
                </span>
              </div>
              <p className="text-xs text-green-900 mt-0.5">
                {language === 'mr'
                  ? `आजची सर्वोत्तम काढणी वेळ: ${weather.optimalHarvestHours} (कमी आर्द्रता व कोरडे वातावरण)`
                  : language === 'hi'
                  ? `आज का सर्वोत्तम कटाई समय: ${weather.optimalHarvestHours} (कम नमी व सूखा समय)`
                  : `Best Field Harvest Window: ${weather.optimalHarvestHours} (Lower dew & optimal curing)`}
              </p>
            </div>
          </div>

          {onAskGeminiAdvisor && (
            <button
              onClick={() =>
                onAskGeminiAdvisor(
                  `How will current weather (${weather.temperature}°C, ${weather.humidity}% humidity, and ${weather.rainfallProbability}% rain chance) in ${weather.district} affect onion/soybean harvesting and storage quality? What immediate precautions should farmers take?`
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-green-300 hover:bg-green-100 text-green-900 text-xs font-bold shadow-xs cursor-pointer transition-transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-green-700" />
              <span>{language === 'mr' ? 'जेमिनी हवामान सल्ला' : language === 'hi' ? 'जेमिनी मौसम सलाह' : 'Ask Gemini Weather Impact'}</span>
            </button>
          )}
        </div>

        {/* Real-time Agricultural Weather Alerts */}
        <div className="space-y-2.5">
          {weather.alerts.map((alert, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex items-start gap-3 shadow-2xs ${
                alert.type === 'critical'
                  ? 'bg-red-50/80 border-red-300 text-red-950'
                  : alert.type === 'warning'
                  ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                  : 'bg-blue-50/80 border-blue-200 text-blue-950'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {alert.type === 'critical' ? (
                  <AlertTriangle className="w-5 h-5 text-red-600 animate-pulse" />
                ) : alert.type === 'warning' ? (
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                ) : (
                  <Info className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div className="space-y-1 text-xs flex-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="font-bold text-sm">
                    {language === 'mr' ? alert.titleLocal.mr : language === 'hi' ? alert.titleLocal.hi : alert.title}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-slate-500">{lastUpdated}</span>
                  </div>
                </div>
                <p className="leading-relaxed">
                  {language === 'mr' ? alert.messageLocal.mr : language === 'hi' ? alert.messageLocal.hi : alert.message}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-semibold text-slate-600">
                    {language === 'mr' ? 'संबंधित पिके:' : language === 'hi' ? 'प्रभावित फसलें:' : 'Crops Protected:'}
                  </span>
                  {alert.cropsAffected.map((crop, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-2 py-0.5 rounded-md bg-white/80 border border-slate-300 text-[10px] font-medium"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3-Day Agricultural Outlook */}
        <div className="border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-green-700" />
              {language === 'mr' ? '३ दिवसांचा शेती हवामान अंदाज' : language === 'hi' ? '3 दिवसीय कृषि मौसम पूर्वानुमान' : '3-Day Agricultural Forecast & Harvest Rating'}
            </span>
            <span className="text-[11px] text-slate-500 font-normal">
              IMD & AGMARKNET Sync
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {weather.forecast.map((f, fIdx) => (
              <div
                key={fIdx}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-2"
              >
                <div>
                  <span className="font-bold text-slate-900 block">
                    {language === 'mr' ? f.dayLocal.mr : language === 'hi' ? f.dayLocal.hi : f.day}
                  </span>
                  <span className="text-[11px] text-slate-500">{f.condition}</span>
                </div>
                <div className="text-right space-y-0.5">
                  <span className="font-bold text-slate-800 text-xs block">{f.temp}</span>
                  <div className="flex items-center gap-1 text-[10px]">
                    <span className="text-blue-600 font-medium">🌧 {f.rainProb}%</span>
                    <span>•</span>
                    <span className="text-slate-600">💧 {f.humidity}%</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-md text-[10px] font-bold shrink-0 ${
                    f.harvestRating === 'Safe'
                      ? 'bg-green-100 text-green-800'
                      : f.harvestRating === 'Caution'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {f.harvestRating === 'Safe'
                    ? language === 'mr' ? 'सुरक्षित' : language === 'hi' ? 'सुरक्षित' : 'Safe'
                    : f.harvestRating === 'Caution'
                    ? language === 'mr' ? 'सावध' : language === 'hi' ? 'सावधानी' : 'Caution'
                    : language === 'mr' ? 'टाळा' : language === 'hi' ? 'टालें' : 'Avoid'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
