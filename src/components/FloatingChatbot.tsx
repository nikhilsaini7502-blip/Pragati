import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, Sparkles, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FloatingChatbot: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial greeting when opened for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: language === 'mr' 
            ? 'नमस्कार! मी प्रगती AI आहे. मी तुम्हाला शेतमाल विक्री, बाजारभाव किंवा वेबसाईट बद्दल कशी मदत करू शकतो?' 
            : language === 'hi'
            ? 'नमस्ते! मैं प्रगति AI हूँ। मैं आपकी फसल बिक्री, बाजार भाव या वेबसाइट के बारे में कैसे मदद कर सकता हूँ?'
            : 'Hello! I am Pragati AI. How can I help you with crop sales, market prices, or navigating the website?'
        }
      ]);
    }
  }, [isOpen, language, messages.length]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const quickReplies = {
    en: [
      "How to sell crop?",
      "Check Onion price",
      "What is Smart Escrow?",
      "How FPOs can join?"
    ],
    hi: [
      "फसल कैसे बेचें?",
      "प्याज का भाव देखें",
      "स्मार्ट एस्क्रो क्या है?",
      "FPO कैसे जुड़ें?"
    ],
    mr: [
      "पीक कसे विकावे?",
      "कांद्याचे भाव तपासा",
      "स्मार्ट एस्क्रो काय आहे?",
      "FPO कसे सामील होऊ शकतात?"
    ]
  };

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return;
    
    const userMsg = text.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMsg, language }),
      });
      
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: language === 'mr' ? 'तांत्रिक त्रुटी. कृपया पुन्हा प्रयत्न करा.' : language === 'hi' ? 'तकनीकी त्रुटि। कृपया पुनः प्रयास करें।' : 'Technical error. Please try again.'
        }]);
      }
    } catch (error) {
      console.error('Error fetching chat:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: language === 'mr' ? 'तांत्रिक त्रुटी. कृपया पुन्हा प्रयत्न करा.' : language === 'hi' ? 'तकनीकी त्रुटि। कृपया पुनः प्रयास करें।' : 'Technical error. Please try again.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const currentQuickReplies = language === 'mr' ? quickReplies.mr : language === 'hi' ? quickReplies.hi : quickReplies.en;

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl flex items-center justify-center z-50 ${isOpen ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'} transition-all`}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[90vw] sm:w-[380px] h-[550px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-green-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">
                    Pragati AI Assistant
                  </h3>
                  <p className="text-[10px] text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    {language === 'mr' ? 'ऑनलाइन' : language === 'hi' ? 'ऑनलाइन' : 'Online'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-green-600 text-white rounded-tr-sm' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm whitespace-pre-wrap'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies Options */}
            {!isTyping && (
              <div className="px-3 pb-2 pt-1 bg-slate-50 overflow-x-auto whitespace-nowrap scrollbar-none border-t border-slate-100 flex gap-2">
                {currentQuickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(reply)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-green-200 text-green-700 hover:bg-green-50 text-[11px] font-semibold transition-colors shadow-sm"
                  >
                    {reply} <ChevronRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={
                    language === 'mr' ? 'तुमचा प्रश्न विचारा...' : 
                    language === 'hi' ? 'अपना प्रश्न पूछें...' : 
                    'Ask a question...'
                  }
                  className="w-full pl-4 pr-12 py-2.5 bg-slate-100 border-transparent focus:bg-white focus:border-green-500 rounded-xl text-sm outline-none border transition-all"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-1 p-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
