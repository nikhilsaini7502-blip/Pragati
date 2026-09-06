import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  CloudRain,
  Sun,
  AlertTriangle,
  Calendar,
  Sparkles,
  HelpCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  Sliders,
  ChevronDown,
  Info,
  Droplets,
  Wind,
  Layers,
  Bot
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ReferenceArea
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import {
  CROP_FORECAST_CONFIGS,
  CropForecastConfig,
  WeatherScenario,
  ForecastDataPoint
} from '../data/priceForecastData';

interface PriceForecastProps {
  onOpenGeminiAdvisor?: (query: string) => void;
}

export const PriceForecast: React.FC<PriceForecastProps> = ({ onOpenGeminiAdvisor }) => {
  const { language } = useLanguage();

  // Selected crop config
  const [selectedCropId, setSelectedCropId] = useState<string>('onion_nashik');
  // Weather scenario
  const [weatherScenario, setWeatherScenario] = useState<WeatherScenario>('forecast');
  // Horizon view
  const [forecastHorizon, setForecastHorizon] = useState<'7d' | '14d'>('7d');
  // Chart layer toggles
  const [showConfidenceBands, setShowConfidenceBands] = useState<boolean>(true);
  const [showArrivalVolume, setShowArrivalVolume] = useState<boolean>(true);

  // Active crop configuration
  const activeCrop = useMemo(() => {
    return CROP_FORECAST_CONFIGS.find((c) => c.id === selectedCropId) || CROP_FORECAST_CONFIGS[0];
  }, [selectedCropId]);

  // Combined timeline data (Historical + Forecast under active scenario)
  const chartData = useMemo(() => {
    const historical = activeCrop.historicalPoints.map((pt) => ({
      ...pt,
      historicalPrice: pt.actualPrice,
      forecastPrice: pt.isToday ? pt.actualPrice : undefined, // Connect the line at today
      arrivalK: Math.round(pt.arrivalVolume / 1000),
    }));

    const scenarioPoints = activeCrop.forecastScenarios[weatherScenario] || activeCrop.forecastScenarios.forecast;
    const limitPoints = forecastHorizon === '7d' ? scenarioPoints.slice(0, 6) : scenarioPoints;

    const forecasted = limitPoints.map((pt) => ({
      ...pt,
      historicalPrice: undefined,
      forecastPrice: pt.projectedPrice,
      arrivalK: Math.round(pt.arrivalVolume / 1000),
    }));

    return [...historical, ...forecasted];
  }, [activeCrop, weatherScenario, forecastHorizon]);

  // Dynamic metrics under current scenario
  const activePeak = useMemo(() => {
    const scenarioPoints = activeCrop.forecastScenarios[weatherScenario];
    let maxPt = scenarioPoints[0];
    for (const pt of scenarioPoints) {
      if ((pt.projectedPrice || 0) > (maxPt.projectedPrice || 0)) {
        maxPt = pt;
      }
    }
    const currentPrice = activeCrop.currentModalPrice;
    const peakPrice = maxPt.projectedPrice || currentPrice;
    const netGain = peakPrice - currentPrice;
    const gainPercent = ((netGain / currentPrice) * 100).toFixed(1);

    return {
      peakPrice,
      peakDate: maxPt.date,
      peakDayLabel: maxPt.dayLabel,
      netGain,
      gainPercent,
      weatherFactor: maxPt.weatherFactorRupees,
    };
  }, [activeCrop, weatherScenario]);

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data: ForecastDataPoint & { historicalPrice?: number; forecastPrice?: number; arrivalK?: number } =
      payload[0]?.payload;

    if (!data) return null;

    const isFuture = !data.isHistorical && !data.isToday;

    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl border border-slate-700 text-xs space-y-2 max-w-xs z-50">
        <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-200">{data.date}</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                data.isToday
                  ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                  : isFuture
                  ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
                  : 'bg-slate-700 text-slate-300'
              }`}
            >
              {data.isToday
                ? (language === 'mr' ? 'आजचा थेट व्यवहार' : 'Today (Live)')
                : isFuture
                ? (language === 'mr' ? 'अंदाजित' : 'Projected')
                : (language === 'mr' ? 'ऐतिहासिक' : 'Historical')}
            </span>
          </div>
          {data.isOptimalSell && (
            <span className="bg-amber-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
              ⭐ Peak Sell Day
            </span>
          )}
        </div>

        {/* Price display */}
        <div>
          <span className="text-slate-400 text-[11px] block font-medium">
            {isFuture
              ? (language === 'mr' ? 'अंदाजित बाजारभाव (Modal Forecast)' : 'Projected Modal Price')
              : (language === 'mr' ? 'बाजारभाव (Modal Rate)' : 'APMC Modal Rate')}
          </span>
          <span className="text-base sm:text-lg font-extrabold text-emerald-400 font-mono">
            ₹{(data.historicalPrice || data.forecastPrice || 0).toLocaleString('en-IN')}{' '}
            <span className="text-xs text-slate-300 font-normal">/ Qtl</span>
          </span>

          {isFuture && data.upperConfidence && data.lowerConfidence && showConfidenceBands && (
            <p className="text-[10px] text-slate-300 font-mono mt-0.5">
              Confidence Range: ₹{data.lowerConfidence.toLocaleString('en-IN')} – ₹{data.upperConfidence.toLocaleString('en-IN')}
            </p>
          )}
        </div>

        {/* Arrival volume */}
        <div className="flex items-center justify-between text-[11px] bg-slate-800/80 px-2.5 py-1.5 rounded-lg">
          <span className="text-slate-300">{language === 'mr' ? 'मंडी आवक (Arrivals):' : 'Mandi Arrivals:'}</span>
          <span className="font-bold text-amber-300 font-mono">
            {data.arrivalVolume.toLocaleString('en-IN')} Qtl
          </span>
        </div>

        {/* Weather on that day */}
        <div className="text-[11px] bg-slate-800/80 p-2 rounded-lg space-y-1">
          <div className="flex items-center justify-between font-semibold">
            <span className="text-slate-300 flex items-center gap-1">
              <span>🌦️</span>
              <span>{data.weatherCondition}</span>
            </span>
            <span className="text-slate-200 font-mono">{data.weatherTemp}°C</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Rain: {data.rainfallMm}mm</span>
            <span>Humidity: {data.humidityPercent}% RH</span>
          </div>
          {data.weatherFactorRupees !== 0 && (
            <div className="text-[10px] pt-1 border-t border-slate-700/80 text-emerald-300 font-medium">
              Weather Impact: {data.weatherFactorRupees > 0 ? `+₹${data.weatherFactorRupees}` : `-₹${Math.abs(data.weatherFactorRupees)}`}/Qtl
            </div>
          )}
        </div>

        {/* Event Note */}
        {data.eventNote && (
          <p className="text-[10px] text-amber-200 italic leading-snug">
            📌 {data.eventNote}
          </p>
        )}
      </div>
    );
  };

  const handleAskGeminiAdvisor = () => {
    if (!onOpenGeminiAdvisor) return;

    const cropName = language === 'mr' ? activeCrop.nameMr : language === 'hi' ? activeCrop.nameHi : activeCrop.nameEn;
    const mandiName = language === 'mr' ? activeCrop.primaryMandiMr : language === 'hi' ? activeCrop.primaryMandiHi : activeCrop.primaryMandi;
    const query = `Provide a detailed actionable advisory on the price forecast for ${cropName} in ${mandiName}. Current modal rate is ₹${activeCrop.currentModalPrice}/Qtl, and projected peak is ₹${activePeak.peakPrice}/Qtl on ${activePeak.peakDayLabel} under the current ${activeCrop.weatherSummary.rainfallMm}mm unseasonal rain forecast. Should I sell now or hold for the peak selling window?`;

    onOpenGeminiAdvisor(query);
  };

  return (
    <div id="price-forecast-section" className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-6">
      
      {/* 1. Header & Context */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-sm shadow-emerald-700/30 shrink-0">
            <TrendingUp className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                {language === 'mr'
                  ? 'बाजारभाव भविष्यवेध व हवामान प्रभाव (Price Forecast)'
                  : language === 'hi'
                  ? 'मूल्य पूर्वानुमान एवं मौसम प्रभाव (Price Forecast)'
                  : 'Agro-Price Forecast & Weather Impact Engine'}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                AI Multi-Variable Model
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'mr'
                ? 'मागील ऐतिहासिक बाजारभाव ट्रेंड आणि स्थानिक अवकाळी हवामानाचा भविष्यातील दरांवर होणारा अचूक अंदाज'
                : language === 'hi'
                ? 'गत ऐतिहासिक मंडी ट्रेंड एवं स्थानीय मौसम कारकों द्वारा भविष्य के मूल्यों का सटीक अनुमान'
                : 'Projects future APMC modal rates by combining 14-day historical trends with local precipitation and harvest disruption factors'}
            </p>
          </div>
        </div>

        {/* Commodity Selector Dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-900 text-xs font-bold py-2 pl-3 pr-8 rounded-xl cursor-pointer focus:ring-2 focus:ring-emerald-600 focus:outline-hidden transition-colors"
            >
              {CROP_FORECAST_CONFIGS.map((crop) => (
                <option key={crop.id} value={crop.id}>
                  {language === 'mr' ? crop.nameMr : language === 'hi' ? crop.nameHi : crop.nameEn} • {crop.primaryMandi}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 2. Key Forecast Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Current Modal */}
        <div className="bg-slate-50 rounded-xl p-3 sm:p-3.5 border border-slate-200">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 block">
            {language === 'mr' ? 'आजचा दर (Current Modal)' : 'Current Modal Rate'}
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono">
              ₹{activeCrop.currentModalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-slate-500">/ Qtl</span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            {language === 'mr' ? '७ दिवसांची सरासरी:' : '7-Day Avg:'} ₹{activeCrop.historical7dAvg}
          </span>
        </div>

        {/* Projected Peak */}
        <div className="bg-emerald-50/80 rounded-xl p-3 sm:p-3.5 border border-emerald-300">
          <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800 block">
            {language === 'mr' ? 'अंदाजित उच्चांकी दर (Projected Peak)' : 'Projected Peak Rate'}
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-lg sm:text-xl font-extrabold text-emerald-800 font-mono">
              ₹{activePeak.peakPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-emerald-700">
              (+{activePeak.gainPercent}%)
            </span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-700 block mt-0.5">
            {activePeak.peakDayLabel} ({activePeak.peakDate})
          </span>
        </div>

        {/* Weather Impact Factor */}
        <div className="bg-sky-50/80 rounded-xl p-3 sm:p-3.5 border border-sky-300">
          <span className="text-[10px] uppercase tracking-wider font-bold text-sky-800 block">
            {language === 'mr' ? 'हवामान प्रभाव (Weather Impact)' : 'Weather Factor Impact'}
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-lg sm:text-xl font-extrabold text-sky-900 font-mono">
              +{activePeak.weatherFactor > 0 ? `₹${activePeak.weatherFactor}` : `₹0`}
            </span>
            <span className="text-[10px] text-sky-700">/ Qtl premium</span>
          </div>
          <span className="text-[10px] font-medium text-sky-700 block mt-0.5 truncate">
            {activeCrop.weatherSummary.rainfallMm}mm rain arrival freeze
          </span>
        </div>

        {/* Recommended Sell Window */}
        <div className="bg-amber-50/80 rounded-xl p-3 sm:p-3.5 border border-amber-300">
          <span className="text-[10px] uppercase tracking-wider font-bold text-amber-800 block">
            {language === 'mr' ? 'योग्य विक्री कालावधी (Sell Window)' : 'Optimal Selling Window'}
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-sm sm:text-base font-extrabold text-amber-950">
              {activeCrop.recommendedSellWindow.fromDay} – {activeCrop.recommendedSellWindow.toDay}
            </span>
          </div>
          <span className="text-[10px] font-medium text-amber-800 block mt-0.5">
            {language === 'mr' ? 'पावसाच्या काळात भाववाढ' : 'Supply squeeze during rain'}
          </span>
        </div>
      </div>

      {/* 3. Weather Scenario & Chart Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
        {/* Weather Scenario Switcher */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1 mr-1">
            <Sliders className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">{language === 'mr' ? 'हवामान परिस्थिती:' : 'Weather Scenario:'}</span>
          </span>
          
          <button
            onClick={() => setWeatherScenario('forecast')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              weatherScenario === 'forecast'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>🌧️</span>
            <span>{language === 'mr' ? 'अपेक्षित पाऊस (Expected)' : 'Expected Showers'}</span>
          </button>

          <button
            onClick={() => setWeatherScenario('heavy_rain')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              weatherScenario === 'heavy_rain'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>⛈️</span>
            <span>{language === 'mr' ? 'मुसळधार पाऊस (+३५ मिमी)' : 'Severe Rain (+35mm)'}</span>
          </button>

          <button
            onClick={() => setWeatherScenario('dry_spell')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              weatherScenario === 'dry_spell'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>☀️</span>
            <span>{language === 'mr' ? 'कोरडे हवामान (Dry)' : 'Dry Spell'}</span>
          </button>
        </div>

        {/* View Options */}
        <div className="flex items-center gap-2">
          {/* Horizon toggle */}
          <div className="flex items-center bg-white rounded-lg p-0.5 border border-slate-200 text-[11px] font-semibold">
            <button
              onClick={() => setForecastHorizon('7d')}
              className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                forecastHorizon === '7d' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setForecastHorizon('14d')}
              className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                forecastHorizon === '14d' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              14 Days
            </button>
          </div>

          {/* Toggle Layers */}
          <button
            onClick={() => setShowConfidenceBands(!showConfidenceBands)}
            className={`px-2 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
              showConfidenceBands
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-white text-slate-500 border-slate-200'
            }`}
            title="Toggle Confidence Corridor"
          >
            ± Bands
          </button>

          <button
            onClick={() => setShowArrivalVolume(!showArrivalVolume)}
            className={`px-2 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
              showArrivalVolume
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-white text-slate-500 border-slate-200'
            }`}
            title="Toggle Mandi Arrival Volume"
          >
            Arrivals (Qtl)
          </button>
        </div>
      </div>

      {/* 4. Chart Visualization Component */}
      <div className="bg-slate-900/95 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-lg text-white space-y-3">
        {/* Chart Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-slate-300 font-medium">
                {language === 'mr' ? 'मागील प्रत्यक्ष दर' : 'Historical Actuals (Solid)'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 border-t-2 border-dashed border-emerald-400 inline-block" />
              <span className="text-emerald-300 font-medium">
                {language === 'mr' ? 'अंदाजित दर (Weather Projected)' : 'AI Forecast (Dashed)'}
              </span>
            </div>
            {showArrivalVolume && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-xs bg-amber-500/50 inline-block" />
                <span className="text-amber-300 font-medium">
                  {language === 'mr' ? 'मंडी आवक' : 'Arrival Volume'}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Updated today with IMD Nashik Doppler radar feed</span>
          </div>
        </div>

        {/* Main Recharts Area & Composed Chart */}
        <div className="w-full h-72 sm:h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 15, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="historicalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="confidenceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.6} />

              <XAxis
                dataKey="dayLabel"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                axisLine={{ stroke: '#475569' }}
                tickLine={{ stroke: '#475569' }}
              />

              {/* Left Y Axis: Price */}
              <YAxis
                yAxisId="priceAxis"
                stroke="#10b981"
                domain={['auto', 'auto']}
                tick={{ fill: '#a7f3d0', fontSize: 10, fontFamily: 'monospace' }}
                axisLine={{ stroke: '#334155' }}
                tickLine={{ stroke: '#334155' }}
                tickFormatter={(val) => `₹${val}`}
              />

              {/* Right Y Axis: Arrival Volume in Thousand Quintals */}
              {showArrivalVolume && (
                <YAxis
                  yAxisId="volumeAxis"
                  orientation="right"
                  stroke="#f59e0b"
                  domain={[0, 'auto']}
                  tick={{ fill: '#fde68a', fontSize: 9, fontFamily: 'monospace' }}
                  axisLine={{ stroke: '#334155' }}
                  tickLine={{ stroke: '#334155' }}
                  tickFormatter={(val) => `${val}k`}
                />
              )}

              <Tooltip content={<CustomTooltip />} />

              {/* Separation line at Today */}
              <ReferenceLine
                x="Today"
                yAxisId="priceAxis"
                stroke="#f59e0b"
                strokeDasharray="4 4"
                label={{
                  value: 'Today (Live)',
                  fill: '#fbbf24',
                  fontSize: 10,
                  fontWeight: 700,
                  position: 'top',
                }}
              />

              {/* Arrival Volume Bars (shows drop in arrivals during rain!) */}
              {showArrivalVolume && (
                <Bar
                  yAxisId="volumeAxis"
                  dataKey="arrivalK"
                  fill="#f59e0b"
                  opacity={0.35}
                  barSize={12}
                  radius={[4, 4, 0, 0]}
                  name="Arrivals (k Qtl)"
                />
              )}

              {/* Shaded Confidence Upper/Lower Corridor */}
              {showConfidenceBands && (
                <Area
                  yAxisId="priceAxis"
                  type="monotone"
                  dataKey="upperConfidence"
                  stroke="none"
                  fill="url(#confidenceGrad)"
                  name="Confidence Range"
                />
              )}

              {/* Historical Actual Price Area */}
              <Area
                yAxisId="priceAxis"
                type="monotone"
                dataKey="historicalPrice"
                stroke="#10b981"
                strokeWidth={2.5}
                fill="url(#historicalGrad)"
                name="Historical APMC Modal"
                activeDot={{ r: 5, fill: '#34d399', stroke: '#064e3b', strokeWidth: 2 }}
              />

              {/* AI Forecast Projected Price Line */}
              <Line
                yAxisId="priceAxis"
                type="monotone"
                dataKey="forecastPrice"
                stroke="#34d399"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={{ r: 4, fill: '#10b981', stroke: '#ffffff', strokeWidth: 1.5 }}
                activeDot={{ r: 6, fill: '#fbbf24', stroke: '#ffffff', strokeWidth: 2 }}
                name="Projected Price"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Timeline Event Badge indicators */}
        <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-950 border border-blue-600 text-blue-300 font-semibold flex items-center gap-1">
              <span>🌧️</span>
              <span>Day +2 to +4: Rain Disruption</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-300 font-bold flex items-center gap-1">
              <span>⭐</span>
              <span>Day +5: Peak Modal Window (₹{activePeak.peakPrice})</span>
            </span>
          </div>
          <span className="text-slate-400 italic">
            *Tap any chart point for micro-weather & arrival data
          </span>
        </div>
      </div>

      {/* 5. Weather Drivers & Local Factors Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
            <CloudRain className="w-4 h-4 text-sky-600" />
            <span>
              {language === 'mr'
                ? 'हवामान घटक व दर वाढीची कारणे (Weather Price Drivers)'
                : language === 'hi'
                ? 'मौसम कारक एवं मूल्य वृद्धि के कारण (Weather Price Drivers)'
                : 'Local Weather Drivers Behind This Price Shift'}
            </span>
          </h4>
          <span className="text-[11px] text-slate-500 font-medium">
            {activeCrop.district} ({activeCrop.primaryMandi})
          </span>
        </div>

        {/* Live Weather Impact Radar Banner */}
        <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{activeCrop.weatherSummary.icon}</span>
            <div>
              <p className="text-xs font-bold text-sky-950">
                {language === 'mr'
                  ? activeCrop.weatherSummary.mr
                  : language === 'hi'
                  ? activeCrop.weatherSummary.hi
                  : activeCrop.weatherSummary.en}
              </p>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-sky-800 font-semibold">
                <span className="flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-sky-600" />
                  <span>Rainfall: {activeCrop.weatherSummary.rainfallMm} mm</span>
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-sky-600" />
                  <span>Humidity: {activeCrop.weatherSummary.humidity}% RH</span>
                </span>
              </div>
            </div>
          </div>

          <span className="self-start sm:self-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
            {activeCrop.weatherSummary.alertLevel === 'critical' ? 'Critical Weather Alert' : 'Arrival Squeeze Warning'}
          </span>
        </div>

        {/* Specific Factor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {activeCrop.weatherDrivers.map((driver, idx) => (
            <div
              key={idx}
              className="bg-slate-50 hover:bg-white rounded-xl p-3 border border-slate-200 hover:border-slate-300 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {language === 'mr' ? driver.factorMr : language === 'hi' ? driver.factorHi : driver.factorEn}
                </p>
                <span className="text-xs font-mono font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                  +₹{driver.impactRupees}/Qtl
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {language === 'mr'
                  ? driver.descriptionMr
                  : language === 'hi'
                  ? driver.descriptionHi
                  : driver.descriptionEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Actionable Selling Recommendation & Gemini AI Advisory Button */}
      <div className="bg-linear-to-r from-emerald-50 via-slate-50 to-emerald-50 p-4 sm:p-5 rounded-2xl border border-emerald-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <h4 className="text-xs sm:text-sm font-bold text-emerald-950">
              {language === 'mr' ? 'तज्ज्ञ शेतकरी सल्ला (Action Advisory):' : 'Expert Farmer Action Advisory:'}
            </h4>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {language === 'mr'
              ? activeCrop.recommendedSellWindow.adviceMr
              : language === 'hi'
              ? activeCrop.recommendedSellWindow.adviceHi
              : activeCrop.recommendedSellWindow.adviceEn}
          </p>
        </div>

        {/* Ask Gemini Advisor button */}
        {onOpenGeminiAdvisor && (
          <button
            onClick={handleAskGeminiAdvisor}
            className="self-start sm:self-center shrink-0 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
          >
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>
              {language === 'mr'
                ? 'जेमिनी एआय सल्लागार विचारा'
                : language === 'hi'
                ? 'जेमिनी एआई से पूछें'
                : 'Ask Gemini Advisor'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          </button>
        )}
      </div>

    </div>
  );
};
