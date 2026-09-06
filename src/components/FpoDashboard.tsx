import React, { useState } from 'react';
import {
  Building2,
  Users,
  Warehouse,
  TrendingUp,
  PackageCheck,
  ShieldCheck,
  Plus,
  ArrowLeft,
  DollarSign,
  Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FpoDashboardProps {
  onBackToHome: () => void;
  openVisionModal: () => void;
}

export const FpoDashboard: React.FC<FpoDashboardProps> = ({ onBackToHome, openVisionModal }) => {
  const { t, language } = useLanguage();
  const [pooledLots, setPooledLots] = useState([
    {
      id: 'FPO-POOL-01',
      commodity: 'Red Onion (Grade A)',
      farmersCount: 28,
      totalQuantityQuintals: 420,
      targetPrice: 2450,
      collectedAt: 'Niphad Cold Storage Hub',
      storageCapacityUsed: '78%',
      status: 'Bulk Auction Open',
    },
    {
      id: 'FPO-POOL-02',
      commodity: 'Yellow Soybean JS-335',
      farmersCount: 42,
      totalQuantityQuintals: 850,
      targetPrice: 4750,
      collectedAt: 'Latur Central Warehouse',
      storageCapacityUsed: '62%',
      status: 'Contract Negotiating',
    },
    {
      id: 'FPO-POOL-03',
      commodity: 'Medium Staple Cotton',
      farmersCount: 19,
      totalQuantityQuintals: 310,
      targetPrice: 7350,
      collectedAt: 'Jalgaon Ginning Yard',
      storageCapacityUsed: '45%',
      status: 'Direct Mill Bidding',
    },
  ]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Profile - Natural Tones with Amber Accent */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <button
            onClick={onBackToHome}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 md:hidden cursor-pointer"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-amber-600/30 shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-slate-900">
                {language === 'mr' ? 'गोदावरी व्हॅली शेतकरी उत्पादक कंपनी (FPO)' : language === 'hi' ? 'गोदावरी वैली किसान उत्पादक कंपनी (FPO)' : 'Godavari Valley Farmer Producer Co. (FPO)'}
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                {language === 'mr' ? '४८०+ सदस्य शेतकरी' : language === 'hi' ? '480+ सदस्य किसान' : '480+ Member Farmers'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {language === 'mr' ? 'रजि. क्र: U01409MH2022PTC38921 • निफाड, नाशिक जिल्हा' : language === 'hi' ? 'पंजीकरण संख्या: U01409MH2022PTC38921 • निफाड, नाशिक' : 'Reg No: U01409MH2022PTC38921 • Niphad, Nashik District'}
            </p>
          </div>
        </div>

        <button
          onClick={openVisionModal}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'mr' ? 'नवीन एकत्रित पूल तयार करा' : language === 'hi' ? 'नया बल्क पूल बनाएं' : 'Create New Bulk Pool'}</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{language === 'mr' ? 'एकत्रित शेतमाल' : language === 'hi' ? 'एकत्रित फसल' : 'Total Produce Pooled'}</span>
            <Layers className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-xl font-extrabold text-slate-900">1,580 Qtl</p>
          <span className="text-[11px] text-green-700 font-semibold">{language === 'mr' ? '+२४% मागील महिन्यापेक्षा' : language === 'hi' ? '+24% पिछले माह से' : '+24% vs last month'}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{language === 'mr' ? 'शेतकऱ्यांना वाढीव नफा' : language === 'hi' ? 'किसानों को सामूहिक प्रीमियम' : 'Collective Price Premium'}</span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-xl font-extrabold text-green-700">+ ₹160 / Qtl</p>
          <span className="text-[11px] text-slate-500">{language === 'mr' ? 'दलाल कमिशन शून्य बचत' : language === 'hi' ? 'बिचौलिया कमीशन शून्य बचत' : 'Zero middleman commission savings'}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{language === 'mr' ? 'शीतगृह साठा वापर' : language === 'hi' ? 'कोल्ड स्टोरेज क्षमता उपयोग' : 'Cold Storage Occupancy'}</span>
            <Warehouse className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xl font-extrabold text-slate-900">72% (1,200 MT)</p>
          <span className="text-[11px] text-blue-700 font-semibold">{language === 'mr' ? 'निफाड हब • तापमान नियंत्रित' : language === 'hi' ? 'निफाड हब • तापमान नियंत्रित' : 'Niphad Hub • Temperature Controlled'}</span>
        </div>
      </div>

      {/* Pooled Bulk Lots for Auction */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              {language === 'mr' ? 'एफपीओ एकत्रित लिलाव लॉट्स' : language === 'hi' ? 'एफपीओ बल्क नीलामी लॉट्स' : 'FPO Aggregated Auction Lots'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'mr' ? 'लहान शेतकऱ्यांचा माल एकत्र करून मोठ्या खरेदीदार कंपन्यांशी थेट स्पर्धा' : language === 'hi' ? 'छोटे किसानों का माल एकत्रित कर कॉरपोरेट खरीदारों से बेहतर मूल्य प्राप्त करें' : 'Aggregating produce from smallholders to command higher corporate contract prices'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {pooledLots.map((pool) => (
            <div
              key={pool.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 transition-all bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{pool.commodity}</span>
                  <span className="text-[10px] font-mono bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                    {pool.id}
                  </span>
                </div>
                <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3">
                  <span>{language === 'mr' ? 'शेतकरी संख्या:' : language === 'hi' ? 'किसान संख्या:' : 'Farmers:'} <strong className="text-slate-900">{pool.farmersCount}</strong></span>
                  <span>•</span>
                  <span>{language === 'mr' ? 'एकूण वजन:' : language === 'hi' ? 'कुल मात्रा:' : 'Total Volume:'} <strong className="text-green-700">{pool.totalQuantityQuintals} Qtl</strong></span>
                  <span>•</span>
                  <span>{language === 'mr' ? 'गोदाम:' : language === 'hi' ? 'गोदाम:' : 'Warehouse:'} {pool.collectedAt}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block">{language === 'mr' ? 'किमान बोली दर' : language === 'hi' ? 'न्यूनतम बोली मूल्य' : 'Reserve Bid'}</span>
                  <span className="text-sm font-extrabold text-amber-800">₹{pool.targetPrice} / Qtl</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  {pool.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
