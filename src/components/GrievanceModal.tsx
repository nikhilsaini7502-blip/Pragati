import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle2, Phone, Building2, Send, Clock, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sampleGrievances } from '../data/mockData';
import { GrievanceTicket } from '../types';

interface GrievanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GrievanceModal: React.FC<GrievanceModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [tickets, setTickets] = useState<GrievanceTicket[]>(sampleGrievances);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Nashik');
  const [mandi, setMandi] = useState('Lasalgaon APMC');
  const [category, setCategory] = useState<GrievanceTicket['category']>('Price Discrepancy');
  const [description, setDescription] = useState('');
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !description) return;

    const newId = `MH-GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: GrievanceTicket = {
      id: newId,
      name,
      phone,
      category,
      district,
      mandi,
      description,
      status: 'Submitted',
      createdAt: 'Just now',
    };

    setTickets([newTicket, ...tickets]);
    setSubmittedToken(newId);
    setName('');
    setPhone('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header - Slate Natural Tone */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-white">
                  {language === 'mr'
                    ? 'शेतकरी तक्रार निवारण कक्ष'
                    : language === 'hi'
                    ? 'किसान शिकायत निवारण कक्ष'
                    : 'Farmer & Buyer Grievance Cell'}
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
                  Govt Redressal
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Department of Skills, Employment & Innovation • 24-Hr Resolution Mandate
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
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Success banner if submitted */}
          {submittedToken && (
            <div className="bg-green-50 border border-green-300 rounded-xl p-4 flex items-start gap-3 animate-in fade-in shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-green-950 text-sm">
                  {language === 'mr' ? 'तक्रार यशस्वीरित्या नोंदवली गेली! टोकन क्रमांक:' : language === 'hi' ? 'शिकायत सफलतापूर्वक दर्ज! टोकन नंबर:' : 'Grievance Registered Successfully! Token:'}{' '}
                  <span className="font-mono text-green-800 font-extrabold">{submittedToken}</span>
                </p>
                <p className="text-green-800">
                  {language === 'mr'
                    ? 'आपल्या नोंदणीकृत मोबाइल नंबरवर एसएमएस पाठवला आहे. एपीएमसी नोडल अधिकारी पुढील २४ तासांत संपर्क साधतील.'
                    : language === 'hi'
                    ? 'आपके पंजीकृत मोबाइल नंबर पर एसएमएस भेजा गया है। एपीएमसी नोडल अधिकारी 24 घंटे के भीतर संपर्क करेंगे।'
                    : 'SMS confirmation dispatched to registered mobile. Mandi Nodal Officer will address this ticket within 24 hours.'}
                </p>
              </div>
            </div>
          )}

          {/* Form to submit grievance */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {language === 'mr' ? 'नवीन तक्रार नोंदवा' : language === 'hi' ? 'नई शिकायत दर्ज करें' : 'Lodge a Formal Grievance'}
              </h4>
              <span className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" /> {language === 'mr' ? '२४ तासांत निवारण' : language === 'hi' ? '24 घंटे में निस्तारण' : '24h Resolution Guaranteed'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {language === 'mr' ? 'शेतकऱ्याचे / खरेदीदाराचे पूर्ण नाव:' : language === 'hi' ? 'किसान / खरीदार का नाम:' : 'Full Name:'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'mr' ? 'उदा. रामेश्वर पाटील' : language === 'hi' ? 'उदा. रामेश्वर पाटिल' : 'e.g. Rameshwar Patil'}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {language === 'mr' ? 'मोबाइल नंबर (SMS अपडेटसाठी):' : language === 'hi' ? 'मोबाइल नंबर (SMS हेतु):' : 'Mobile Number (for SMS updates):'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98221 XXXXX"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {language === 'mr' ? 'तक्रारीचा प्रकार:' : language === 'hi' ? 'शिकायत का प्रकार:' : 'Grievance Category:'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                >
                  <option value="Price Discrepancy">Price Discrepancy (भावात तफावत)</option>
                  <option value="Mandi Weighment Delay">Weighbridge Delay (वजन काट्यावर विलंब)</option>
                  <option value="Escrow Payment Hold">Escrow Payment Hold (पेमेंट अडकले)</option>
                  <option value="Quality Dispute">Quality Dispute (गुणवत्ता वाद)</option>
                  <option value="Transportation Delay">Transit Delay (वाहतूक विलंब)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {language === 'mr' ? 'जिल्हा:' : language === 'hi' ? 'जिला:' : 'District:'}
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                >
                  <option value="Nashik">Nashik</option>
                  <option value="Jalgaon">Jalgaon</option>
                  <option value="Latur">Latur</option>
                  <option value="Solapur">Solapur</option>
                  <option value="Amravati">Amravati</option>
                  <option value="Kolhapur">Kolhapur</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {language === 'mr' ? 'संबंधित बाजार समिती:' : language === 'hi' ? 'संबंधित मंडी:' : 'APMC Mandi:'}
                </label>
                <input
                  type="text"
                  value={mandi}
                  onChange={(e) => setMandi(e.target.value)}
                  placeholder="e.g. Lasalgaon APMC"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                {language === 'mr' ? 'तक्रारीचे सविस्तर वर्णन:' : language === 'hi' ? 'शिकायत का विस्तृत विवरण:' : 'Details of Grievance:'}
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  language === 'mr'
                    ? 'उदा. लासलगाव वजन काट्यावर नंबर असूनही ४ तास वाट पाहावी लागली...'
                    : language === 'hi'
                    ? 'उदा. लासलगांव वेइंग ब्रिज पर 4 घंटे इंतज़ार करना पड़ा...'
                    : 'e.g. Excessive weighbridge wait time despite pre-booked digital gate pass...'
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              {language === 'mr'
                ? 'शासकीय तक्रार दाखल करा (Submit)'
                : language === 'hi'
                ? 'शिकायत सबमिट करें (Submit)'
                : 'Submit Grievance to MSAMB Officer'}
            </button>
          </form>

          {/* Existing Grievance Tickets List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span>{language === 'mr' ? 'आपल्या अलीकडील तक्रारी:' : language === 'hi' ? 'हालिया दर्ज शिकायतें:' : 'Recent Tracked Tickets:'}</span>
              <span className="text-[11px] text-slate-500 font-normal">
                {language === 'mr' ? 'एकूण:' : language === 'hi' ? 'कुल:' : 'Total:'} {tickets.length}
              </span>
            </h4>

            <div className="space-y-2">
              {tickets.map((t) => (
                <div key={t.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-800">{t.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        t.status === 'Resolved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800 animate-pulse'
                      }`}
                    >
                      {t.status === 'Resolved'
                        ? language === 'mr' ? 'निवारण पूर्ण' : language === 'hi' ? 'निस्तारित' : 'Resolved'
                        : language === 'mr' ? 'प्रक्रियेत आहे' : language === 'hi' ? 'प्रक्रियाधीन' : 'In Review'}
                    </span>
                  </div>
                  <p className="font-medium text-slate-900">{t.category} • {t.mandi} ({t.district})</p>
                  <p className="text-slate-600 text-[11px] bg-slate-50 p-2 rounded-md">{t.description}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>
                      {language === 'mr' ? 'तक्रारदार:' : language === 'hi' ? 'शिकायतकर्ता:' : 'Complainant:'} {t.name}
                    </span>
                    <span>{t.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-amber-800 font-semibold">
            <Phone className="w-3.5 h-3.5" />
            <span>Toll-Free Helpline: 1800-120-8040 (Ext: 4)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium cursor-pointer"
          >
            {language === 'mr' ? 'बंद करा' : language === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
