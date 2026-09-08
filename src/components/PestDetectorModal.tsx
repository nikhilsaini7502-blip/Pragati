import React, { useState } from 'react';
import { X, Bug, Camera, Upload, AlertCircle, CheckCircle2, Leaf, Beaker } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PestDetectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PestAnalysisResult {  isCropDetected?: boolean;
  diseaseName: string;
  confidence: string;
  severity: string;
  identificationDetails: string;
  homeRemedy: string;
  chemicalCure: string;
}

export const PestDetectorModal: React.FC<PestDetectorModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [summary, setSummary] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<PestAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setActiveImage(event.target?.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!activeImage) return;
    setIsScanning(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze-pest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: activeImage,
          summary: summary,
          language: language,
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }

      const data = await response.json();
      if (data.success && data.result) {
        setResult(data.result);
      } else {
        throw new Error(data.error || 'Could not identify pests/diseases.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-5 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Bug className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">AI Pest & Disease Detector</h2>
              <p className="text-red-100 text-xs font-medium">Upload a photo for instant cure recommendations</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Image Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700">Upload Crop Photo</label>
              <div className="relative group rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center aspect-square transition-all hover:border-red-400">
                {activeImage ? (
                  <img src={activeImage} alt="Crop to analyze" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-slate-400 p-6 text-center gap-2">
                    <Camera className="w-10 h-10 mb-1 opacity-50" />
                    <p className="text-sm font-medium text-slate-600">Tap to upload photo</p>
                    <p className="text-[10px]">Clear, detailed photos work best</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Right: Summary Input */}
            <div className="space-y-3 flex flex-col">
              <label className="block text-sm font-bold text-slate-700">Farmer's Summary / Symptoms</label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="E.g., Leaves are turning yellow with brown spots, noticed it 3 days ago..."
                className="w-full h-full min-h-[150px] p-4 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-sm resize-none"
              ></textarea>
              
              <button
                onClick={handleAnalyze}
                disabled={!activeImage || isScanning}
                className="w-full py-3 px-4 mt-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Bug className="w-4 h-4" />
                    Detect Disease & Cure
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 border border-red-200 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Results Area */}
          {result && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 pt-4 border-t border-slate-100">
              
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-red-900">{result.diseaseName}</h3>
                    <p className="text-sm text-red-700 mt-1">{result.identificationDetails}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="px-2.5 py-1 bg-red-200 text-red-800 rounded-lg text-xs font-bold whitespace-nowrap">
                      {result.severity} Severity
                    </span>
                    <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider">
                      {result.confidence} Match
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Home Remedy */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-green-800 font-bold">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <h4>Organic / Home Remedy</h4>
                  </div>
                  <p className="text-sm text-green-900 leading-relaxed whitespace-pre-wrap">
                    {result.homeRemedy}
                  </p>
                </div>

                {/* Chemical Cure */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-blue-800 font-bold">
                    <Beaker className="w-5 h-5 text-blue-600" />
                    <h4>Chemical / Medicinal Cure</h4>
                  </div>
                  <p className="text-sm text-blue-900 leading-relaxed whitespace-pre-wrap">
                    {result.chemicalCure}
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
