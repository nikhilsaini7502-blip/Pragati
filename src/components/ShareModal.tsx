import React, { useState, useEffect } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  QrCode,
  MessageSquare,
  Send,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Users
} from 'lucide-react';
import QRCode from 'qrcode';
import { useLanguage } from '../context/LanguageContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [linkType, setLinkType] = useState<'live' | 'shared'>('live');

  // Working Live Dev URL (accessible right now)
  const devUrl = 'https://ais-dev-xlklmvjrxdm2t5a32vv6uj-472301756424.asia-east1.run.app';
  // AI Studio Share URL (activated when user clicks 'Share' button in AI Studio top bar)
  const sharedUrl = 'https://ais-pre-xlklmvjrxdm2t5a32vv6uj-472301756424.asia-east1.run.app';

  // Dynamic origin if available, fallback to devUrl
  const currentOrigin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : devUrl;
  const activeLiveUrl = currentOrigin.includes('localhost') ? devUrl : currentOrigin;

  const shareUrl = linkType === 'live' ? activeLiveUrl : sharedUrl;

  const shareText =
    language === 'mr'
      ? `नमस्कार शेतकरी बंधूंनो! महाराष्ट्र शासनाचे 'प्रगती (Pragati)' ॲप वापरा. यामध्ये थेट ३०५+ बाजार समित्यांचे आजचे अचूक भाव, Google Gemini AI द्वारे पिकांची गुणवत्ता तपासणी, हवामान आणि पाऊस अलर्ट, व थेट बँक खात्यात पैसे मिळण्याची सुविधा आहे. आत्ताच भेट द्या: ${shareUrl}`
      : language === 'hi'
      ? `नमस्कार किसान भाइयों! महाराष्ट्र शासन का 'प्रगति (Pragati)' ऐप उपयोग करें। यहां 305+ मंडियों के लाइव भाव, गूगल जेमिनी एआई फसल ग्रेडिंग, बारिश व मौसम अलर्ट, और सुरक्षित भुगतान उपलब्ध है। अभी देखें: ${shareUrl}`
      : `Namaskar! Access Maharashtra Govt's 'Pragati (प्रगती)' platform for real-time 305+ APMC Mandi rates, Google Gemini AI crop quality grading, weather & harvest alerts, and instant DBT escrow payments: ${shareUrl}`;

  useEffect(() => {
    if (isOpen && shareUrl) {
      QRCode.toDataURL(shareUrl, {
        width: 260,
        margin: 1.5,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error('Failed to generate QR code', err));
    }
  }, [isOpen, shareUrl]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pragati (प्रगती) - Maharashtra Govt Agri Market Linkages',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Native share canceled or failed', err);
      }
    } else {
      handleCopy();
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header - Slate Natural Tone */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-green-400 shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-white">
                  {language === 'mr' ? 'प्रगती ॲप लिंक मित्रांना पाठवा' : language === 'hi' ? 'प्रगति ऐप लिंक दोस्तों को साझा करें' : 'Share Pragati with Friends & Farmers'}
                </h3>
              </div>
              <p className="text-xs text-slate-300">
                {language === 'mr'
                  ? 'शेतकरी मित्र, FPO सदस्य आणि खरेदीदारांना जोडण्यासाठी लिंक शेअर करा'
                  : language === 'hi'
                  ? 'किसान मित्रों, एफपीओ और खरीदारों को जोड़ने हेतु लिंक शेयर करें'
                  : 'Invite fellow farmers, FPOs & buyers to direct market linkages'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Link Type Selector Tabs */}
          <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
            <button
              onClick={() => setLinkType('live')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                linkType === 'live'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{language === 'mr' ? 'लाईव्ह चालू लिंक (Live)' : language === 'hi' ? 'लाइव चालू लिंक (Live)' : 'Live Link (Working Now)'}</span>
            </button>
            <button
              onClick={() => setLinkType('shared')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                linkType === 'shared'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'mr' ? 'पब्लिक शेअर लिंक (Shared)' : language === 'hi' ? 'पब्लिक शेयर लिंक (Shared)' : 'Public Share Link'}</span>
            </button>
          </div>

          {/* Explanation Alert for Page Not Found */}
          {linkType === 'shared' ? (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-amber-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {language === 'mr' ? 'ही लिंक कशी सुरू करावी (How to activate):' : language === 'hi' ? 'यह लिंक कैसे सक्रिय करें:' : 'How to activate Public Shared Link:'}
              </p>
              <p className="text-amber-800 leading-relaxed text-[11px]">
                {language === 'mr'
                  ? 'जर या लिंकवर "Page not found" दिसत असेल, तर वरील Google AI Studio च्या उजव्या कोपऱ्यात असलेल्या "Share" बटनावर क्लिक करा. त्यामुळे हे ॲप सर्वांसाठी पब्लिश होईल.'
                  : language === 'hi'
                  ? 'यदि इस लिंक पर "Page not found" दिखे, तो ऊपर Google AI Studio के ऊपरी दाएं कोने में "Share" बटन पर क्लिक करें। इससे ऐप सभी के लिए लाइव हो जाएगा।'
                  : 'If you see "Page not found", click the "Share" button in the top-right toolbar of Google AI Studio. This deploys and activates the public URL for external viewers.'}
              </p>
              <button
                onClick={() => setLinkType('live')}
                className="text-emerald-700 font-bold underline cursor-pointer text-[11px] block mt-1"
              >
                {language === 'mr' ? 'किंवा लगेच काम करणारी "Live Link" वापरा →' : language === 'hi' ? 'या तुरंत काम करने वाली "Live Link" उपयोग करें →' : 'Or switch to the Working Live Link →'}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="font-semibold text-[11px] leading-tight">
                {language === 'mr'
                  ? 'ही लिंक सध्या चालू आहे आणि कोणत्याही ब्राऊझर किंवा टॅबमध्ये लगेच उघडते.'
                  : language === 'hi'
                  ? 'यह लिंक तुरंत सक्रिय है और किसी भी ब्राउज़र या नए टैब में तुरंत खुलती है।'
                  : 'Active Live URL: Opens immediately in any browser or mobile window.'}
              </span>
            </div>
          )}

          {/* Quick Copy Link Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {linkType === 'live'
                  ? (language === 'mr' ? 'थेट चालू लिंक (Active URL):' : language === 'hi' ? 'सक्रिय लिंक (Active URL):' : 'Active Live Link:')
                  : (language === 'mr' ? 'पब्लिक शेअर लिंक (Shared URL):' : language === 'hi' ? 'शेयर्ड लिंक (Shared URL):' : 'Public Shared Link:')}
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {linkType === 'live' ? 'ais-dev' : 'ais-pre'}
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 border border-slate-300">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full bg-transparent text-xs text-slate-800 font-mono font-medium outline-hidden select-all"
              />
              <button
                onClick={handleCopy}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-2xs ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'कॉपी झाले!' : language === 'hi' ? 'कॉपी हुआ!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'कॉपी करा' : language === 'hi' ? 'कॉपी करें' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Open in New Tab Button */}
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
            <span>{language === 'mr' ? 'नवीन टॅबमध्ये उघडून तपासा (Open in New Tab)' : language === 'hi' ? 'नए टैब में खोलकर देखें (Open in New Tab)' : 'Test / Open Link in New Tab'}</span>
          </a>

          {/* Quick Share Buttons (WhatsApp, Telegram, Native Share) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{language === 'mr' ? 'व्हाट्सअ‍ॅपवर शेअर करा' : language === 'hi' ? 'व्हाट्सएप पर शेयर करें' : 'Share on WhatsApp'}</span>
            </a>

            <button
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{language === 'mr' ? 'इतर ॲप्सवर पाठवा' : language === 'hi' ? 'अन्य ऐप्स पर भेजें' : 'More Share Options'}</span>
            </button>
          </div>

          {/* QR Code Section for Scanning in Mandi / Field */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm shrink-0">
              {qrCodeDataUrl ? (
                <img
                  src={qrCodeDataUrl}
                  alt="Pragati Sharable QR Code"
                  className="w-28 h-28 object-contain"
                />
              ) : (
                <div className="w-28 h-28 flex items-center justify-center bg-slate-100 rounded-lg">
                  <QrCode className="w-10 h-10 text-slate-400 animate-pulse" />
                </div>
              )}
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-slate-800">
                <QrCode className="w-4 h-4 text-green-700" />
                <span>{language === 'mr' ? 'कॅमेऱ्याने थेट स्कॅन करा' : language === 'hi' ? 'कैमरे से सीधे स्कैन करें' : 'Scan Directly with Any Phone'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'mr'
                  ? 'तुमच्या गावातील शेतकरी मित्रांना मोबाईल कॅमेऱ्याने हा कोड स्कॅन करायला सांगा. थेट ॲप उघडेल.'
                  : language === 'hi'
                  ? 'मित्रों को फोन कैमरे से यह क्यूआर कोड स्कैन करने को कहें। सीधे ऐप लोड हो जाएगा।'
                  : 'Scan with mobile camera or Google Lens to immediately open Pragati.'}
              </p>
              <div className="pt-0.5 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-green-700 font-semibold">
                <span>✓ Instant Load</span>
                <span>•</span>
                <span>✓ No Download</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span className="text-slate-500 text-[11px]">
            Govt. of Maharashtra • Department of Skills & Innovation
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold cursor-pointer text-xs"
          >
            {language === 'mr' ? 'बंद करा' : language === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
