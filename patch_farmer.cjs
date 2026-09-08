const fs = require('fs');
let content = fs.readFileSync('src/components/FarmerDashboard.tsx', 'utf8');

// Imports
content = content.replace("import React from 'react';", "import React, { useState, useEffect } from 'react';");
content = content.replace("Plus } from 'lucide-react';", "Plus, Bell, X, DollarSign, Building } from 'lucide-react';");

const stateInit = `
  const { t, language } = useLanguage();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Simulate incoming notifications for farmer
    const timer1 = setTimeout(() => {
      setNotifications(prev => [{
        id: '1',
        title: language === 'mr' ? 'लक्ष्य दर गाठला! 🚀' : language === 'hi' ? 'लक्ष्य मूल्य तक पहुँच गया! 🚀' : 'Target Price Reached! 🚀',
        message: language === 'mr' ? 'नाशिक लाल कांद्याने तुमचे लक्ष्य ₹२४००/क्विंटल गाठले आहे. विक्रीसाठी योग्य वेळ.' : language === 'hi' ? 'नासिक लाल प्याज आपके ₹2400/क्विंटल के लक्ष्य तक पहुँच गया है।' : 'Nashik Red Onion has reached your target of ₹2400/Qtl. Good time to sell.',
        time: 'Just now',
        type: 'price',
        read: false
      }, ...prev]);
    }, 5000);

    const timer2 = setTimeout(() => {
      setNotifications(prev => [{
        id: '2',
        title: language === 'mr' ? 'खरेदीदाराची आवड! 🤝' : language === 'hi' ? 'खरीदार की रुचि! 🤝' : 'Buyer Interest! 🤝',
        message: language === 'mr' ? 'रिलायन्स रिटेलने तुमच्या ५० क्विंटल कांद्याच्या लॉटमध्ये रस दाखवला आहे.' : language === 'hi' ? 'रिलायंस रिटेल ने आपके 50 क्विंटल प्याज के लॉट में रुचि दिखाई है।' : 'Reliance Retail has shown interest in your 50 Qtl Onion lot.',
        time: '2 mins ago',
        type: 'buyer',
        read: false
      }, ...prev]);
    }, 15000);

    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [language]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
`;
content = content.replace("  const { t, language } = useLanguage();", stateInit);

const headerOriginal = `      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 sm:hidden"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 rounded-full bg-green-600 text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-md">
            {language === 'mr' ? 'रा' : language === 'hi' ? 'रा' : 'RP'}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-bold text-lg sm:text-xl text-slate-900">
                {t('farmerGreeting')}
              </h2>
              <ShieldCheck className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-sm text-slate-500 font-medium">
              {language === 'mr' ? 'पिंपळगाव बसवंत, नाशिक' : language === 'hi' ? 'पिंपलगांव बसवंत, नाशिक' : 'Pimpalgaon Baswant, Nashik'}
            </p>
          </div>
        </div>
      </div>`;

const headerReplacement = `      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 sm:hidden"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 rounded-full bg-green-600 text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-md">
            {language === 'mr' ? 'रा' : language === 'hi' ? 'रा' : 'RP'}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-bold text-lg sm:text-xl text-slate-900">
                {t('farmerGreeting')}
              </h2>
              <ShieldCheck className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-sm text-slate-500 font-medium">
              {language === 'mr' ? 'पिंपळगाव बसवंत, नाशिक' : language === 'hi' ? 'पिंपलगांव बसवंत, नाशिक' : 'Pimpalgaon Baswant, Nashik'}
            </p>
          </div>
        </div>
        
        {/* Notifications Dropdown */}
        <div className="relative self-end sm:self-center">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) markAsRead();
            }}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 relative cursor-pointer transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden text-left">
              <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="font-bold text-sm text-slate-800">
                  {language === 'mr' ? 'सूचना (Notifications)' : language === 'hi' ? 'सूचनाएं' : 'Notifications'}
                </h3>
                <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                   <div className="p-6 text-center text-sm text-slate-500">
                     No new notifications
                   </div>
                ) : (
                  notifications.map(notif => (
                    <div key={notif.id} className={\`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors \${notif.read ? 'opacity-70' : 'bg-blue-50/30'}\`}>
                      <div className="flex gap-3">
                        <div className={\`w-8 h-8 rounded-full flex items-center justify-center shrink-0 \${notif.type === 'price' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}\`}>
                          {notif.type === 'price' ? <DollarSign className="w-4 h-4" /> : <Building className="w-4 h-4" />}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{notif.title}</h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                          <span className="text-[10px] text-slate-400 font-medium mt-2 block">{notif.time}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>`;

content = content.replace(headerOriginal, headerReplacement);

fs.writeFileSync('src/components/FarmerDashboard.tsx', content, 'utf8');
console.log("Patched");
