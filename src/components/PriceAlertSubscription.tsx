import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellRing,
  Smartphone,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Trash2,
  Send,
  Plus,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Clock,
  ShieldCheck,
  ChevronDown,
  Volume2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PriceAlertSubscription } from '../types';
import {
  maharashtraDistricts,
  cropCommodityList,
  defaultSubscriptions,
} from '../data/priceSuggesterData';

interface PriceAlertSubscriptionProps {
  onOpenGeminiAdvisor?: (query: string) => void;
}

export const PriceAlertSubscriptionSection: React.FC<PriceAlertSubscriptionProps> = ({
  onOpenGeminiAdvisor,
}) => {
  const { language } = useLanguage();

  // Subscriptions state with localStorage persistence
  const [subscriptions, setSubscriptions] = useState<PriceAlertSubscription[]>(() => {
    try {
      const saved = localStorage.getItem('pragati_price_subscriptions');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return defaultSubscriptions;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pragati_price_subscriptions', JSON.stringify(subscriptions));
    } catch (e) {
      console.error(e);
    }
  }, [subscriptions]);

  // Form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Nashik');
  const [selectedCrop, setSelectedCrop] = useState<string>('Onion (Red)');
  const [selectedMandi, setSelectedMandi] = useState<string>('Lasalgaon APMC');
  const [phone, setPhone] = useState<string>('+91 98221 44521');
  const [enableSms, setEnableSms] = useState<boolean>(true);
  const [enablePush, setEnablePush] = useState<boolean>(true);
  const [enableWhatsapp, setEnableWhatsapp] = useState<boolean>(true);
  const [triggerType, setTriggerType] = useState<'spike' | 'dip' | 'crosses_above' | 'daily_bell'>('spike');
  const [thresholdValue, setThresholdValue] = useState<number>(5);

  // Test Alert & Push feedback state
  const [activeTestAlert, setActiveTestAlert] = useState<{
    title: string;
    message: string;
    channel: 'sms' | 'push';
    timestamp: string;
  } | null>(null);
  const [pushPermissionStatus, setPushPermissionStatus] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  // Update mandis when district changes
  const activeDistrictConfig = maharashtraDistricts.find(
    (d) => d.nameEn.toLowerCase() === selectedDistrict.toLowerCase()
  ) || maharashtraDistricts[0];

  const handleDistrictChange = (distName: string) => {
    setSelectedDistrict(distName);
    const dist = maharashtraDistricts.find((d) => d.nameEn === distName);
    if (dist && dist.primaryMandis.length > 0) {
      setSelectedMandi(dist.primaryMandis[0].nameEn);
    }
  };

  // Request browser push notification permission
  const requestPushPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setPushPermissionStatus(permission);
        if (permission === 'granted') {
          new Notification('Pragati (प्रगती) Mandi Alert Service', {
            body: 'Push notifications are now enabled! You will receive instant price fluctuation alerts.',
            icon: '/favicon.ico',
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Add new subscription
  const handleAddSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enableSms && !enablePush && !enableWhatsapp) {
      alert('Please select at least one notification channel (SMS, Push, or WhatsApp).');
      return;
    }

    const newSub: PriceAlertSubscription = {
      id: `sub-${Date.now()}`,
      district: selectedDistrict,
      commodity: selectedCrop,
      mandi: selectedMandi,
      phone: phone || '+91 98221 44521',
      channels: {
        sms: enableSms,
        push: enablePush,
        whatsapp: enableWhatsapp,
      },
      triggerType,
      thresholdValue: Number(thresholdValue) || 5,
      active: true,
      createdAt: 'Just now',
      lastTriggered: 'Active & Listening for Mandi Bids',
      lastAlertMessage: `Monitoring ${selectedCrop} at ${selectedMandi}. Alert will trigger upon ${
        triggerType === 'spike'
          ? `+${thresholdValue}% surge`
          : triggerType === 'dip'
          ? `-${thresholdValue}% drop`
          : triggerType === 'crosses_above'
          ? `crossing ₹${thresholdValue}/Qtl`
          : '08:30 AM Daily Mandi Bell'
      }.`,
    };

    setSubscriptions([newSub, ...subscriptions]);
    setShowAddForm(false);
    setFormSuccessMessage(
      language === 'mr'
        ? 'दर चढ-उतार अलर्ट यशस्वीपणे सुरू झाला! (Alert Subscribed Successfully)'
        : language === 'hi'
        ? 'मूल्य उतार-चढ़ाव अलर्ट सफलतापूर्वक शुरू हुआ! (Alert Subscribed Successfully)'
        : 'Price fluctuation alert subscribed successfully!'
    );
    setTimeout(() => setFormSuccessMessage(null), 4000);
  };

  // Toggle active
  const handleToggleSub = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, active: !sub.active } : sub))
    );
  };

  // Delete subscription
  const handleDeleteSub = (id: string) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
  };

  // Trigger simulated live SMS & Push test alert
  const triggerTestAlert = (sub: PriceAlertSubscription) => {
    const alertTitle = `[GOV-MAHAGRI ALERT] ${sub.commodity} in ${sub.mandi}`;
    const alertMsg =
      sub.triggerType === 'spike'
        ? `HIGH PRICE SURGE: ${sub.commodity} modal price in ${sub.mandi} jumped +₹160/Qtl (+${sub.thresholdValue}%) today due to lower arrivals. Target rate reached! Visit Pragati to match with buyers.`
        : sub.triggerType === 'crosses_above'
        ? `TARGET ACHIEVED: ${sub.commodity} crossed ₹${sub.thresholdValue}/Qtl in ${sub.mandi} (Current: ₹${sub.thresholdValue + 80}/Qtl). High bidding activity recorded.`
        : `DAILY MANDI BULLETIN: ${sub.mandi} ${sub.commodity} opened today with 12,400 Qtl arrivals. Modal rate ₹2,420/Qtl (+4.2%). Weather dry.`;

    setActiveTestAlert({
      title: alertTitle,
      message: alertMsg,
      channel: sub.channels.push ? 'push' : 'sms',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    // Native browser push notification if granted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(alertTitle, {
          body: alertMsg,
          icon: '/favicon.ico',
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs shadow-amber-500/30 shrink-0">
            <BellRing className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                {language === 'mr'
                  ? 'बाजारभाव चढ-उतार अलर्ट सेवा (SMS व Push Notifications)'
                  : language === 'hi'
                  ? 'मंडी भाव उतार-चढ़ाव अलर्ट सेवा (SMS एवं Push Notifications)'
                  : 'Mandi Price Fluctuation Alerts (Push & SMS)'}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                DLT Verified
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {language === 'mr'
                ? 'तुमच्या जिल्ह्यातील पिकांचे भाव वाढले किंवा घसरले की थेट मोबाईलवर मोफत एसएमएस व नोटिफिकेशन मिळवा'
                : language === 'hi'
                ? 'अपने जिले की फसलों के भाव बढ़ने या गिरने पर सीधे मोबाइल पर मुफ्त SMS और नोटिफिकेशन प्राप्त करें'
                : 'Get instant, automated alerts via SMS, WhatsApp, and browser push when crop prices fluctuate in your district'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>
              {showAddForm
                ? (language === 'mr' ? 'फॉर्म बंद करा' : language === 'hi' ? 'फॉर्म बंद करें' : 'Close Form')
                : (language === 'mr' ? 'नवीन अलर्ट जोडा' : language === 'hi' ? 'नया अलर्ट जोड़ें' : 'Subscribe New Alert')}
            </span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {formSuccessMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 shadow-2xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{formSuccessMessage}</span>
        </div>
      )}

      {/* Live Simulated Handset Alert Modal / Toast */}
      {activeTestAlert && (
        <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-700 animate-in slide-in-from-top-3 duration-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500 animate-pulse" />
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 font-mono">
                    {activeTestAlert.title}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {activeTestAlert.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-mono">
                  {activeTestAlert.message}
                </p>
                <div className="pt-1 flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Delivered via MahAgri Gateway
                  </span>
                  <span>•</span>
                  <span>Network: Jio/Airtel/BSNL Push Active</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveTestAlert(null)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Push Notification Permission Quick Bar */}
      {pushPermissionStatus !== 'granted' && (
        <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-blue-950">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              {language === 'mr'
                ? 'मोबाईल किंवा कॉम्प्युटर स्क्रीनवर थेट पॉप-अप अलर्ट मिळवण्यासाठी परमिशन द्या.'
                : language === 'hi'
                ? 'सीधे स्क्रीन पर लाइव पॉप-अप अलर्ट प्राप्त करने के लिए पुश परमिशन सक्रिय करें।'
                : 'Enable Browser Web Push alerts to receive instant screen notifications when rates jump.'}
            </span>
          </div>
          <button
            onClick={requestPushPermission}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-2xs"
          >
            {language === 'mr' ? 'पुश नोटिफिकेशन्स सुरू करा (Allow)' : language === 'hi' ? 'पुश शुरू करें (Allow)' : 'Allow Push Alerts'}
          </button>
        </div>
      )}

      {/* Add Subscription Form (Collapsible) */}
      {showAddForm && (
        <form
          onSubmit={handleAddSubscription}
          className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-300 space-y-4 shadow-2xs animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-600" />
              <span>
                {language === 'mr'
                  ? 'तुमचा नवीन दर अलर्ट सेट करा'
                  : language === 'hi'
                  ? 'अपना नया मूल्य अलर्ट सेट करें'
                  : 'Configure Your New Fluctuation Alert'}
              </span>
            </h4>
            <span className="text-xs text-slate-500">
              {language === 'mr' ? '100% मोफत शासकीय सेवा' : language === 'hi' ? '100% निःशुल्क सरकारी सेवा' : '100% Free Govt. Service'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* District Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'mr' ? '१. तुमचा जिल्हा (District):' : language === 'hi' ? '1. आपका जिला (District):' : '1. Select District:'}
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                {maharashtraDistricts.map((dist) => (
                  <option key={dist.id} value={dist.nameEn}>
                    {language === 'mr' ? dist.nameMr : language === 'hi' ? dist.nameHi : dist.nameEn} ({dist.nameEn})
                  </option>
                ))}
              </select>
            </div>

            {/* Mandi Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'mr' ? '२. संबंधित एपीएमसी मंडी:' : language === 'hi' ? '2. संबंधित एपीएमसी मंडी:' : '2. Primary APMC Mandi:'}
              </label>
              <select
                value={selectedMandi}
                onChange={(e) => setSelectedMandi(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                {activeDistrictConfig.primaryMandis.map((m) => (
                  <option key={m.id} value={m.nameEn}>
                    {language === 'mr' ? m.nameMr : language === 'hi' ? m.nameHi : m.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Crop Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'mr' ? '३. शेतमाल (Commodity):' : language === 'hi' ? '3. फसल (Commodity):' : '3. Commodity Crop:'}
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                {cropCommodityList.map((crop) => (
                  <option key={crop.nameEn} value={crop.nameEn}>
                    {language === 'mr' ? crop.nameMr : language === 'hi' ? crop.nameHi : crop.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Trigger condition */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'mr' ? '४. अलर्ट कधी पाठवायचा? (Condition):' : language === 'hi' ? '4. अलर्ट कब भेजा जाए? (Condition):' : '4. Fluctuation Trigger Condition:'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTriggerType('spike');
                    setThresholdValue(5);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    triggerType === 'spike'
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-2xs'
                      : 'bg-white border-slate-300 text-slate-700'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'mr' ? 'भाव वाढल्यास (+%)' : language === 'hi' ? 'भाव बढ़ने पर (+%)' : 'Price Surge (+%)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTriggerType('crosses_above');
                    setThresholdValue(2500);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    triggerType === 'crosses_above'
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-2xs'
                      : 'bg-white border-slate-300 text-slate-700'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{language === 'mr' ? 'टार्गेट ओलांडल्यास (₹)' : language === 'hi' ? 'लक्ष्य पार होने पर (₹)' : 'Target Rate (₹/Qtl)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTriggerType('dip');
                    setThresholdValue(5);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    triggerType === 'dip'
                      ? 'bg-red-100 border-red-400 text-red-900 shadow-2xs'
                      : 'bg-white border-slate-300 text-slate-700'
                  }`}
                >
                  <TrendingDown className="w-3.5 h-3.5 text-red-600" />
                  <span>{language === 'mr' ? 'भाव घसरल्यास (-%)' : language === 'hi' ? 'भाव गिरने पर (-%)' : 'Price Drop (-%)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTriggerType('daily_bell');
                    setThresholdValue(0);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    triggerType === 'daily_bell'
                      ? 'bg-blue-100 border-blue-400 text-blue-900 shadow-2xs'
                      : 'bg-white border-slate-300 text-slate-700'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>{language === 'mr' ? 'सकाळी ८:३० बुलेटिन' : language === 'hi' ? 'सुबह 8:30 बुलेटिन' : 'Daily 08:30 AM'}</span>
                </button>
              </div>

              {/* Threshold input */}
              {triggerType === 'spike' && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-slate-600">{language === 'mr' ? 'किमान वाढ:' : language === 'hi' ? 'न्यूनतम वृद्धि:' : 'Min Surge:'}</span>
                  <select
                    value={thresholdValue}
                    onChange={(e) => setThresholdValue(Number(e.target.value))}
                    className="p-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-800"
                  >
                    <option value={3}>+3% वाढ (Surge)</option>
                    <option value={5}>+5% वाढ (Surge - Recommended)</option>
                    <option value={10}>+10% मोठी तेजी (High Surge)</option>
                    <option value={15}>+15% विक्रम दर (Peak Spike)</option>
                  </select>
                </div>
              )}

              {triggerType === 'crosses_above' && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-slate-600">{language === 'mr' ? 'अपेक्षित दर:' : language === 'hi' ? 'अपेक्षित मूल्य:' : 'Threshold Rate:'}</span>
                  <div className="relative flex-1">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      value={thresholdValue}
                      onChange={(e) => setThresholdValue(Number(e.target.value))}
                      placeholder="e.g. 2500"
                      className="w-full pl-6 pr-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-800"
                    />
                  </div>
                  <span className="text-xs text-slate-500">/ Qtl</span>
                </div>
              )}
            </div>

            {/* Channels & Phone */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                {language === 'mr' ? '५. अलर्ट पाठवण्याचे माध्यम (Channels):' : language === 'hi' ? '5. अलर्ट भेजने का माध्यम (Channels):' : '5. Notification Channels & Mobile:'}
              </label>

              <div className="space-y-1.5 bg-white p-2.5 rounded-xl border border-slate-300">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableSms}
                    onChange={(e) => setEnableSms(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                  <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                  <span>SMS Alert (मोफत शासकीय एसएमएस)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enablePush}
                    onChange={(e) => setEnablePush(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <Bell className="w-3.5 h-3.5 text-blue-600" />
                  <span>Browser Web Push (मोबाईल/डेस्कटॉप स्क्रीन)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableWhatsapp}
                    onChange={(e) => setEnableWhatsapp(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp MahAgri Bot Daily Summary</span>
                </label>
              </div>

              {/* Mobile Input */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                  {language === 'mr' ? 'मोबाईल नंबर (SMS साठी):' : language === 'hi' ? 'मोबाइल नंबर (SMS हेतु):' : 'Mobile Number (for SMS):'}
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98221 44521"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-mono text-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold cursor-pointer"
            >
              {language === 'mr' ? 'रद्द करा' : language === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{language === 'mr' ? 'अलर्ट सुरू करा (Activate Alert)' : language === 'hi' ? 'अलर्ट सक्रिय करें (Activate Alert)' : 'Activate Fluctuation Alert'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Active Subscriptions Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600">
            {language === 'mr'
              ? `सक्रिय दर अलर्ट सूची (${subscriptions.length})`
              : language === 'hi'
              ? `सक्रिय मूल्य अलर्ट सूची (${subscriptions.length})`
              : `Active Price Subscriptions (${subscriptions.length})`}
          </h4>
          <span className="text-[11px] text-slate-400">
            {language === 'mr' ? 'सर्व बदल आपोआप सेव्ह होतात' : language === 'hi' ? 'सभी बदलाव स्वतः सहेजते हैं' : 'Auto-synced locally'}
          </span>
        </div>

        {subscriptions.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-xs text-slate-500 space-y-2">
            <Bell className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-bold text-slate-700">No active price subscriptions yet</p>
            <p>Subscribe above to get immediate SMS or Push alerts when your crop price rises or falls.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs"
            >
              Subscribe Your First Alert
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className={`p-4 rounded-xl border transition-all space-y-3 relative ${
                  sub.active
                    ? 'bg-slate-50/70 border-slate-300 hover:border-amber-400 shadow-2xs'
                    : 'bg-slate-100/50 border-slate-200 opacity-60'
                }`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-amber-100 text-amber-900 border border-amber-200">
                        {sub.district}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {sub.commodity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {sub.mandi}
                    </p>
                  </div>

                  {/* Toggle Switch */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleSub(sub.id)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                        sub.active ? 'bg-amber-600' : 'bg-slate-300'
                      }`}
                      title={sub.active ? 'Pause Alert' : 'Resume Alert'}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                          sub.active ? 'translate-x-4.5' : 'translate-x-1'
                        }`}
                      />
                    </button>

                    <button
                      onClick={() => handleDeleteSub(sub.id)}
                      className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete Subscription"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Trigger Condition Pill */}
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Trigger
                    </span>
                    <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                      {sub.triggerType === 'spike' ? (
                        <>
                          <TrendingUp className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">+{sub.thresholdValue}% Price Surge</span>
                        </>
                      ) : sub.triggerType === 'dip' ? (
                        <>
                          <TrendingDown className="w-3 h-3 text-red-600" />
                          <span className="text-red-700">-{sub.thresholdValue}% Price Dip</span>
                        </>
                      ) : sub.triggerType === 'crosses_above' ? (
                        <>
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span className="text-amber-700">&gt; ₹{sub.thresholdValue}/Qtl</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span className="text-blue-700">08:30 AM Daily Mandi Bell</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Active Channels */}
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-100 text-[10px] text-slate-500">
                    <span className="font-semibold">Channels:</span>
                    {sub.channels.sms && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200">
                        SMS ({sub.phone.slice(-4)})
                      </span>
                    )}
                    {sub.channels.push && (
                      <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 font-bold border border-blue-200">
                        Web Push
                      </span>
                    )}
                    {sub.channels.whatsapp && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                        WhatsApp
                      </span>
                    )}
                  </div>
                </div>

                {/* Last Triggered & Test Button */}
                <div className="flex items-center justify-between gap-2 pt-1 text-[11px]">
                  <span className="text-slate-400 truncate">
                    {sub.lastTriggered || 'Listening for updates'}
                  </span>
                  <button
                    onClick={() => triggerTestAlert(sub)}
                    className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[11px] flex items-center gap-1 shrink-0 transition-colors cursor-pointer border border-amber-300/80"
                    title="Simulate immediate SMS and Web Push delivery"
                  >
                    <Send className="w-3 h-3" />
                    <span>{language === 'mr' ? 'चाचणी एसएमएस पाठवा' : language === 'hi' ? 'टेस्ट एसएमएस भेजें' : 'Send Test Alert'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
