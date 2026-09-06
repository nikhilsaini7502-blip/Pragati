export interface ForecastDataPoint {
  date: string;
  dayLabel: string;
  isHistorical: boolean;
  isToday?: boolean;
  actualPrice?: number;
  projectedPrice?: number;
  upperConfidence?: number;
  lowerConfidence?: number;
  arrivalVolume: number;
  weatherCondition: string;
  weatherTemp: number;
  rainfallMm: number;
  humidityPercent: number;
  weatherFactorRupees: number;
  eventNote?: string;
  isOptimalSell?: boolean;
}

export type WeatherScenario = 'forecast' | 'heavy_rain' | 'dry_spell';

export interface CropForecastConfig {
  id: string;
  nameEn: string;
  nameMr: string;
  nameHi: string;
  commodityType: 'onion' | 'cotton' | 'soybean' | 'tomato' | 'pomegranate' | 'wheat';
  district: string;
  districtMr: string;
  districtHi: string;
  primaryMandi: string;
  primaryMandiMr: string;
  primaryMandiHi: string;
  unit: string;
  currentModalPrice: number;
  historical7dAvg: number;
  historicalVolatility: string;
  projectedPeakPrice: number;
  projectedPeakDay: string;
  projectedChangePercent: number;
  recommendedSellWindow: {
    fromDay: string;
    toDay: string;
    adviceEn: string;
    adviceMr: string;
    adviceHi: string;
  };
  weatherSummary: {
    en: string;
    mr: string;
    hi: string;
    icon: string;
    alertLevel: 'warning' | 'critical' | 'normal';
    rainfallMm: number;
    humidity: number;
  };
  historicalPoints: ForecastDataPoint[];
  forecastScenarios: Record<WeatherScenario, ForecastDataPoint[]>;
  weatherDrivers: Array<{
    factorEn: string;
    factorMr: string;
    factorHi: string;
    impactRupees: number;
    descriptionEn: string;
    descriptionMr: string;
    descriptionHi: string;
    type: 'positive' | 'negative' | 'neutral';
  }>;
}

export const CROP_FORECAST_CONFIGS: CropForecastConfig[] = [
  // 1. Nashik Red Onion (Lasalgaon APMC)
  {
    id: 'onion_nashik',
    nameEn: 'Nashik Red Onion (Garva)',
    nameMr: 'नाशिक लाल कांदा (गरवा)',
    nameHi: 'नासिक लाल प्याज (गरवा)',
    commodityType: 'onion',
    district: 'Nashik',
    districtMr: 'नाशिक',
    districtHi: 'नासिक',
    primaryMandi: 'Lasalgaon APMC',
    primaryMandiMr: 'लासलगाव एपीएमसी',
    primaryMandiHi: 'लासलगांव एपीएमसी',
    unit: '₹ / Quintal',
    currentModalPrice: 2420,
    historical7dAvg: 2280,
    historicalVolatility: '±4.8% (Moderate-High)',
    projectedPeakPrice: 2740,
    projectedPeakDay: 'Day +5 (Sep 10)',
    projectedChangePercent: 13.2,
    recommendedSellWindow: {
      fromDay: 'Day +4',
      toDay: 'Day +6',
      adviceEn: 'Sell cured/covered stocks between Day +4 and Day +6 during rain-induced arrival shortage (+₹280 to +₹320/Qtl gain).',
      adviceMr: 'अवकाळी पावसामुळे आवक घटल्याने दिवस ४ ते ६ दरम्यान साठवलेला सुका कांदा विका (प्रति क्विंटल ₹२८० ते ३२० जास्त नफा).',
      adviceHi: 'बेमौसम बारिश के कारण मंडी आवक घटने पर दिन 4 से 6 के बीच सूखा प्याज बेचें (₹280 से ₹320 प्रति क्विंटल अतिरिक्त लाभ)।',
    },
    weatherSummary: {
      en: 'Unseasonal pre-monsoon showers (18-24mm) and 78% RH forecast across Niphad, Lasalgaon & Kalwan. Field harvest halted.',
      mr: 'निफाड, लासलगाव व कळवण पट्ट्यात १८-२४ मिमी अवकाळी पाऊस आणि ७८% आर्द्रता. शेतातील काढणी व वाहतूक ठप्प.',
      hi: 'निफाड, लासलगांव एवं कलवण क्षेत्र में 18-24 मिमी बेमौसम बारिश व 78% आर्द्रता का अनुमान। खेत की खुदाई व परिवहन बाधित।',
      icon: '🌧️',
      alertLevel: 'warning',
      rainfallMm: 22.4,
      humidity: 78,
    },
    historicalPoints: [
      { date: 'Aug 23', dayLabel: 'Aug 23', isHistorical: true, actualPrice: 2150, arrivalVolume: 17200, weatherCondition: 'Sunny', weatherTemp: 32, rainfallMm: 0, humidityPercent: 52, weatherFactorRupees: 0 },
      { date: 'Aug 25', dayLabel: 'Aug 25', isHistorical: true, actualPrice: 2180, arrivalVolume: 16800, weatherCondition: 'Clear', weatherTemp: 33, rainfallMm: 0, humidityPercent: 50, weatherFactorRupees: 0 },
      { date: 'Aug 27', dayLabel: 'Aug 27', isHistorical: true, actualPrice: 2210, arrivalVolume: 16100, weatherCondition: 'Dry Breeze', weatherTemp: 31, rainfallMm: 0, humidityPercent: 54, weatherFactorRupees: +10 },
      { date: 'Aug 29', dayLabel: 'Aug 29', isHistorical: true, actualPrice: 2260, arrivalVolume: 15400, weatherCondition: 'Partly Cloudy', weatherTemp: 31, rainfallMm: 1.2, humidityPercent: 58, weatherFactorRupees: +25 },
      { date: 'Aug 31', dayLabel: 'Aug 31', isHistorical: true, actualPrice: 2290, arrivalVolume: 15100, weatherCondition: 'Overcast', weatherTemp: 30, rainfallMm: 2.8, humidityPercent: 62, weatherFactorRupees: +40 },
      { date: 'Sep 02', dayLabel: 'Sep 02', isHistorical: true, actualPrice: 2340, arrivalVolume: 14600, weatherCondition: 'Light Rain', weatherTemp: 29, rainfallMm: 6.4, humidityPercent: 68, weatherFactorRupees: +75 },
      { date: 'Sep 04', dayLabel: 'Sep 04', isHistorical: true, actualPrice: 2380, arrivalVolume: 14100, weatherCondition: 'Scattered Showers', weatherTemp: 28, rainfallMm: 8.5, humidityPercent: 72, weatherFactorRupees: +110 },
      { date: 'Sep 05', dayLabel: 'Today', isHistorical: true, isToday: true, actualPrice: 2420, arrivalVolume: 13500, weatherCondition: 'Humid Overcast', weatherTemp: 29, rainfallMm: 11.2, humidityPercent: 78, weatherFactorRupees: +140, eventNote: 'Current Trade: Modal ₹2,420 • Rain front moving in' },
    ],
    forecastScenarios: {
      forecast: [
        { date: 'Sep 06', dayLabel: 'Day +1', isHistorical: false, projectedPrice: 2480, upperConfidence: 2540, lowerConfidence: 2420, arrivalVolume: 12200, weatherCondition: 'Rain Warning (14mm)', weatherTemp: 27, rainfallMm: 14.2, humidityPercent: 81, weatherFactorRupees: +170, eventNote: 'Showers start in Niphad taluka' },
        { date: 'Sep 07', dayLabel: 'Day +2', isHistorical: false, projectedPrice: 2540, upperConfidence: 2610, lowerConfidence: 2470, arrivalVolume: 10800, weatherCondition: 'Thunderstorm (22mm) 🌧️', weatherTemp: 26, rainfallMm: 22.0, humidityPercent: 86, weatherFactorRupees: +220, eventNote: 'Harvest halted; Mandi arrival down 28%' },
        { date: 'Sep 08', dayLabel: 'Day +3', isHistorical: false, projectedPrice: 2620, upperConfidence: 2700, lowerConfidence: 2550, arrivalVolume: 9600, weatherCondition: 'Heavy Downpour (26mm)', weatherTemp: 25, rainfallMm: 26.5, humidityPercent: 89, weatherFactorRupees: +270, eventNote: 'Severe road waterlogging; buyers bidding aggressively' },
        { date: 'Sep 09', dayLabel: 'Day +4', isHistorical: false, projectedPrice: 2690, upperConfidence: 2780, lowerConfidence: 2610, arrivalVolume: 9200, weatherCondition: 'Rain Easing (8mm)', weatherTemp: 27, rainfallMm: 8.2, humidityPercent: 82, weatherFactorRupees: +290, eventNote: 'Peak Mandi Supply Crunch • Prime Sell Window', isOptimalSell: true },
        { date: 'Sep 10', dayLabel: 'Day +5', isHistorical: false, projectedPrice: 2740, upperConfidence: 2830, lowerConfidence: 2660, arrivalVolume: 9800, weatherCondition: 'Clearing / Breezy', weatherTemp: 28, rainfallMm: 2.1, humidityPercent: 74, weatherFactorRupees: +310, eventNote: 'PROJECTED PEAK ₹2,740 (+13.2%)', isOptimalSell: true },
        { date: 'Sep 11', dayLabel: 'Day +6', isHistorical: false, projectedPrice: 2710, upperConfidence: 2800, lowerConfidence: 2620, arrivalVolume: 11400, weatherCondition: 'Partly Sunny', weatherTemp: 30, rainfallMm: 0, humidityPercent: 68, weatherFactorRupees: +250, eventNote: 'Dry cured stocks clearing at high premium', isOptimalSell: true },
        { date: 'Sep 12', dayLabel: 'Day +7', isHistorical: false, projectedPrice: 2640, upperConfidence: 2730, lowerConfidence: 2550, arrivalVolume: 13800, weatherCondition: 'Sunny / Dry', weatherTemp: 31, rainfallMm: 0, humidityPercent: 61, weatherFactorRupees: +180, eventNote: 'Tractor arrivals resume from rural fields' },
        { date: 'Sep 14', dayLabel: 'Day +9', isHistorical: false, projectedPrice: 2560, upperConfidence: 2660, lowerConfidence: 2470, arrivalVolume: 15900, weatherCondition: 'Clear Autumn', weatherTemp: 32, rainfallMm: 0, humidityPercent: 55, weatherFactorRupees: +110, eventNote: 'Arrival backlog enters Mandi' },
        { date: 'Sep 16', dayLabel: 'Day +11', isHistorical: false, projectedPrice: 2490, upperConfidence: 2580, lowerConfidence: 2400, arrivalVolume: 16500, weatherCondition: 'Sunny Normal', weatherTemp: 32, rainfallMm: 0, humidityPercent: 53, weatherFactorRupees: +60, eventNote: 'Prices stabilize near post-rain equilibrium' },
      ],
      heavy_rain: [
        { date: 'Sep 06', dayLabel: 'Day +1', isHistorical: false, projectedPrice: 2520, upperConfidence: 2600, lowerConfidence: 2450, arrivalVolume: 11400, weatherCondition: 'Heavy Storms (32mm) ⛈️', weatherTemp: 25, rainfallMm: 32.0, humidityPercent: 88, weatherFactorRupees: +220 },
        { date: 'Sep 07', dayLabel: 'Day +2', isHistorical: false, projectedPrice: 2610, upperConfidence: 2700, lowerConfidence: 2530, arrivalVolume: 8900, weatherCondition: 'Intense Rain (45mm)', weatherTemp: 24, rainfallMm: 45.0, humidityPercent: 92, weatherFactorRupees: +310 },
        { date: 'Sep 08', dayLabel: 'Day +3', isHistorical: false, projectedPrice: 2720, upperConfidence: 2830, lowerConfidence: 2620, arrivalVolume: 7400, weatherCondition: 'Flooded Access (28mm)', weatherTemp: 24, rainfallMm: 28.0, humidityPercent: 93, weatherFactorRupees: +390 },
        { date: 'Sep 09', dayLabel: 'Day +4', isHistorical: false, projectedPrice: 2810, upperConfidence: 2940, lowerConfidence: 2700, arrivalVolume: 6900, weatherCondition: 'Overcast Drizzle', weatherTemp: 26, rainfallMm: 12.0, humidityPercent: 88, weatherFactorRupees: +460, eventNote: 'Severe shortage: +₹390/Qtl surge for dry warehouse lots', isOptimalSell: true },
        { date: 'Sep 10', dayLabel: 'Day +5', isHistorical: false, projectedPrice: 2890, upperConfidence: 3020, lowerConfidence: 2780, arrivalVolume: 7200, weatherCondition: 'Slow Drainage', weatherTemp: 27, rainfallMm: 4.0, humidityPercent: 84, weatherFactorRupees: +510, eventNote: 'EXTREME PEAK ₹2,890 (+19.4%)', isOptimalSell: true },
        { date: 'Sep 11', dayLabel: 'Day +6', isHistorical: false, projectedPrice: 2840, upperConfidence: 2970, lowerConfidence: 2730, arrivalVolume: 9100, weatherCondition: 'Drying Ground', weatherTemp: 29, rainfallMm: 0, humidityPercent: 78, weatherFactorRupees: +440, isOptimalSell: true },
        { date: 'Sep 12', dayLabel: 'Day +7', isHistorical: false, projectedPrice: 2750, upperConfidence: 2870, lowerConfidence: 2640, arrivalVolume: 11800, weatherCondition: 'Partly Sunny', weatherTemp: 30, rainfallMm: 0, humidityPercent: 70, weatherFactorRupees: +350 },
        { date: 'Sep 14', dayLabel: 'Day +9', isHistorical: false, projectedPrice: 2630, upperConfidence: 2740, lowerConfidence: 2520, arrivalVolume: 14500, weatherCondition: 'Sunny', weatherTemp: 31, rainfallMm: 0, humidityPercent: 62, weatherFactorRupees: +220 },
        { date: 'Sep 16', dayLabel: 'Day +11', isHistorical: false, projectedPrice: 2540, upperConfidence: 2640, lowerConfidence: 2430, arrivalVolume: 16800, weatherCondition: 'Clear', weatherTemp: 32, rainfallMm: 0, humidityPercent: 56, weatherFactorRupees: +120 },
      ],
      dry_spell: [
        { date: 'Sep 06', dayLabel: 'Day +1', isHistorical: false, projectedPrice: 2430, upperConfidence: 2480, lowerConfidence: 2380, arrivalVolume: 14200, weatherCondition: 'Sunny Dry', weatherTemp: 33, rainfallMm: 0, humidityPercent: 48, weatherFactorRupees: +10 },
        { date: 'Sep 07', dayLabel: 'Day +2', isHistorical: false, projectedPrice: 2440, upperConfidence: 2500, lowerConfidence: 2390, arrivalVolume: 14500, weatherCondition: 'Clear Sky', weatherTemp: 34, rainfallMm: 0, humidityPercent: 46, weatherFactorRupees: +15 },
        { date: 'Sep 08', dayLabel: 'Day +3', isHistorical: false, projectedPrice: 2450, upperConfidence: 2520, lowerConfidence: 2400, arrivalVolume: 14800, weatherCondition: 'Hot Afternoon', weatherTemp: 34, rainfallMm: 0, humidityPercent: 44, weatherFactorRupees: +20 },
        { date: 'Sep 09', dayLabel: 'Day +4', isHistorical: false, projectedPrice: 2460, upperConfidence: 2530, lowerConfidence: 2410, arrivalVolume: 15200, weatherCondition: 'Dry', weatherTemp: 33, rainfallMm: 0, humidityPercent: 45, weatherFactorRupees: +25 },
        { date: 'Sep 10', dayLabel: 'Day +5', isHistorical: false, projectedPrice: 2470, upperConfidence: 2540, lowerConfidence: 2420, arrivalVolume: 15400, weatherCondition: 'Normal Weather', weatherTemp: 33, rainfallMm: 0, humidityPercent: 47, weatherFactorRupees: +30 },
        { date: 'Sep 11', dayLabel: 'Day +6', isHistorical: false, projectedPrice: 2475, upperConfidence: 2550, lowerConfidence: 2420, arrivalVolume: 15500, weatherCondition: 'Clear', weatherTemp: 32, rainfallMm: 0, humidityPercent: 48, weatherFactorRupees: +35 },
        { date: 'Sep 12', dayLabel: 'Day +7', isHistorical: false, projectedPrice: 2480, upperConfidence: 2560, lowerConfidence: 2430, arrivalVolume: 15700, weatherCondition: 'Sunny', weatherTemp: 32, rainfallMm: 0, humidityPercent: 49, weatherFactorRupees: +40 },
        { date: 'Sep 14', dayLabel: 'Day +9', isHistorical: false, projectedPrice: 2490, upperConfidence: 2580, lowerConfidence: 2440, arrivalVolume: 15900, weatherCondition: 'Clear', weatherTemp: 32, rainfallMm: 0, humidityPercent: 50, weatherFactorRupees: +50 },
        { date: 'Sep 16', dayLabel: 'Day +11', isHistorical: false, projectedPrice: 2500, upperConfidence: 2600, lowerConfidence: 2450, arrivalVolume: 16100, weatherCondition: 'Normal', weatherTemp: 32, rainfallMm: 0, humidityPercent: 51, weatherFactorRupees: +55 },
      ],
    },
    weatherDrivers: [
      {
        factorEn: 'Precipitation Delay on Field Harvest',
        factorMr: 'अवकाळी पावसामुळे काढणीत होणारा विलंब',
        factorHi: 'बेमौसम बारिश से खेत की खुदाई में देरी',
        impactRupees: +180,
        descriptionEn: 'Wet field mud halts tractor & manual harvest for 72-96 hours across Niphad/Yeola, slashing Mandi daily arrivals by 32%.',
        descriptionMr: 'ओल्या शेतामुळे निफाड व येवला पट्ट्यात ७२-९६ तास काढणी ठप्प; एपीएमसी आवक ३२% घसरल्याने दरात मोठी उसळी.',
        descriptionHi: 'गीली मिट्टी से निफाड व येवला में 72-96 घंटे खुदाई बंद; मंडी आवक में 32% गिरावट से भाव में जोरदार उछाल।',
        type: 'positive',
      },
      {
        factorEn: 'High Humidity Storage Premium',
        factorMr: 'उच्च आर्द्रतेमध्ये सुक्या कांद्याला वाढीव भाव',
        factorHi: 'उच्च आर्द्रता में सुरक्षित सूखे प्याज का प्रीमियम',
        impactRupees: +120,
        descriptionEn: '78% relative humidity risks neck rot in wet stock; buyers paying premium for certified dry well-ventilated stock.',
        descriptionMr: '७८% आर्द्रतेमुळे कच्च्या कांद्याला बुरशीचा धोका; चाळीत साठवलेल्या सुक्या ग्रेड-A कांद्याला खरेदीदारांकडून भरघोस भाव.',
        descriptionHi: '78% नमी में कच्चे माल में सड़न का खतरा; चाली में रखे सूखे ग्रेड-A माल को व्यापारियों द्वारा अधिक भाव।',
        type: 'positive',
      },
      {
        factorEn: 'Rural Road Transport Waterlogging',
        factorMr: 'ग्रामीण भागातील वाहतूक अडथळा',
        factorHi: 'ग्रामीण सड़कों पर जलभराव से परिवहन रुकावट',
        impactRupees: +70,
        descriptionEn: 'Flooded culverts in Chandwad taluka delay small pickup trucks entering Lasalgaon yard by 24-36 hrs.',
        descriptionMr: 'चांदवड व कळवण रस्त्यांवर पाणी साचल्याने लासलगाव आवक तात्पुरती घटली.',
        descriptionHi: 'सड़कों पर पानी भरने से लासलगांव मंडी में गाड़ियों की आवक 24-36 घंटे थमी।',
        type: 'positive',
      },
    ],
  },

  // 2. Jalgaon BT Cotton (Jalgaon APMC)
  {
    id: 'cotton_jalgaon',
    nameEn: 'Jalgaon BT Cotton (Medium Staple)',
    nameMr: 'जळगाव बीटी कापूस (२९ मिमी)',
    nameHi: 'जलगांव बीटी कपास (29 मिमी)',
    commodityType: 'cotton',
    district: 'Jalgaon',
    districtMr: 'जळगाव',
    districtHi: 'जलगांव',
    primaryMandi: 'Jalgaon APMC',
    primaryMandiMr: 'जळगाव एपीएमसी',
    primaryMandiHi: 'जलगांव एपीएमसी',
    unit: '₹ / Quintal',
    currentModalPrice: 7280,
    historical7dAvg: 7190,
    historicalVolatility: '±3.2% (Moderate)',
    projectedPeakPrice: 7540,
    projectedPeakDay: 'Day +6 (Sep 11)',
    projectedChangePercent: 3.6,
    recommendedSellWindow: {
      fromDay: 'Day +5',
      toDay: 'Day +8',
      adviceEn: 'Ginning mills will increase bids once morning dew & rain threat subsides; hold dry baled cotton for +₹260/Qtl gain.',
      adviceMr: 'सकाळचे धुके व पावसाची भीती संपल्यावर जिनिंग मिल्सकडून भाववाढ होईल; कोरडा कापूस दिवस ५ ते ८ दरम्यान विका.',
      adviceHi: 'ओस व बारिश की आशंका छंटने पर जिनिंग मिलों द्वारा भाव बढ़ेंगे; सूखा कपास दिन 5 से 8 के मध्य बेचें।',
    },
    weatherSummary: {
      en: 'High atmospheric moisture (74% RH) and isolated light drizzle (6mm). Ginning mills penalizing high moisture lots (>9%).',
      mr: 'हवेतील ओलावा (७४% आर्द्रता) आणि हलक्या पावसाची शक्यता (६ मिमी). जिनिंग मिल्स ९% पेक्षा जास्त ओलावा असलेल्या कापसावर कपात करत आहेत.',
      hi: 'वायुमंडलीय नमी (74%) और हल्की बूंदाबांदी (6 मिमी)। जिनिंग मिलें 9% से अधिक नमी वाले माल पर कटौती कर रही हैं।',
      icon: '⛅',
      alertLevel: 'normal',
      rainfallMm: 6.2,
      humidity: 74,
    },
    historicalPoints: [
      { date: 'Aug 23', dayLabel: 'Aug 23', isHistorical: true, actualPrice: 7080, arrivalVolume: 8200, weatherCondition: 'Clear', weatherTemp: 34, rainfallMm: 0, humidityPercent: 50, weatherFactorRupees: 0 },
      { date: 'Aug 25', dayLabel: 'Aug 25', isHistorical: true, actualPrice: 7120, arrivalVolume: 8500, weatherCondition: 'Sunny', weatherTemp: 35, rainfallMm: 0, humidityPercent: 48, weatherFactorRupees: 0 },
      { date: 'Aug 27', dayLabel: 'Aug 27', isHistorical: true, actualPrice: 7150, arrivalVolume: 8300, weatherCondition: 'Sunny', weatherTemp: 34, rainfallMm: 0, humidityPercent: 52, weatherFactorRupees: +10 },
      { date: 'Aug 29', dayLabel: 'Aug 29', isHistorical: true, actualPrice: 7190, arrivalVolume: 8100, weatherCondition: 'Breezy', weatherTemp: 33, rainfallMm: 0, humidityPercent: 56, weatherFactorRupees: +20 },
      { date: 'Aug 31', dayLabel: 'Aug 31', isHistorical: true, actualPrice: 7210, arrivalVolume: 8000, weatherCondition: 'Partly Cloudy', weatherTemp: 32, rainfallMm: 1.5, humidityPercent: 62, weatherFactorRupees: +30 },
      { date: 'Sep 02', dayLabel: 'Sep 02', isHistorical: true, actualPrice: 7240, arrivalVolume: 7900, weatherCondition: 'Overcast', weatherTemp: 31, rainfallMm: 3.2, humidityPercent: 67, weatherFactorRupees: +45 },
      { date: 'Sep 04', dayLabel: 'Sep 04', isHistorical: true, actualPrice: 7260, arrivalVolume: 7800, weatherCondition: 'Light Showers', weatherTemp: 30, rainfallMm: 4.8, humidityPercent: 71, weatherFactorRupees: +60 },
      { date: 'Sep 05', dayLabel: 'Today', isHistorical: true, isToday: true, actualPrice: 7280, arrivalVolume: 7650, weatherCondition: 'Humid Overcast', weatherTemp: 31, rainfallMm: 6.2, humidityPercent: 74, weatherFactorRupees: +70, eventNote: 'Current Trade: Modal ₹7,280 • Mills buying dry lots' },
    ],
    forecastScenarios: {
      forecast: [
        { date: 'Sep 06', dayLabel: 'Day +1', isHistorical: false, projectedPrice: 7310, upperConfidence: 7380, lowerConfidence: 7240, arrivalVolume: 7400, weatherCondition: 'Light Showers (4mm)', weatherTemp: 30, rainfallMm: 4.0, humidityPercent: 72, weatherFactorRupees: +80 },
        { date: 'Sep 07', dayLabel: 'Day +2', isHistorical: false, projectedPrice: 7350, upperConfidence: 7430, lowerConfidence: 7270, arrivalVolume: 7100, weatherCondition: 'Drizzle (5mm)', weatherTemp: 29, rainfallMm: 5.5, humidityPercent: 75, weatherFactorRupees: +100 },
        { date: 'Sep 08', dayLabel: 'Day +3', isHistorical: false, projectedPrice: 7400, upperConfidence: 7490, lowerConfidence: 7310, arrivalVolume: 6800, weatherCondition: 'Cloudy / Breezy', weatherTemp: 30, rainfallMm: 2.0, humidityPercent: 70, weatherFactorRupees: +130 },
        { date: 'Sep 09', dayLabel: 'Day +4', isHistorical: false, projectedPrice: 7460, upperConfidence: 7560, lowerConfidence: 7360, arrivalVolume: 6600, weatherCondition: 'Partly Sunny', weatherTemp: 32, rainfallMm: 0, humidityPercent: 64, weatherFactorRupees: +170, isOptimalSell: true },
        { date: 'Sep 10', dayLabel: 'Day +5', isHistorical: false, projectedPrice: 7510, upperConfidence: 7620, lowerConfidence: 7400, arrivalVolume: 6900, weatherCondition: 'Sunny Dry', weatherTemp: 33, rainfallMm: 0, humidityPercent: 58, weatherFactorRupees: +210, isOptimalSell: true },
        { date: 'Sep 11', dayLabel: 'Day +6', isHistorical: false, projectedPrice: 7540, upperConfidence: 7650, lowerConfidence: 7430, arrivalVolume: 7300, weatherCondition: 'Sunny Clear', weatherTemp: 34, rainfallMm: 0, humidityPercent: 54, weatherFactorRupees: +240, eventNote: 'PEAK ₹7,540 (Spinning mills active)', isOptimalSell: true },
        { date: 'Sep 12', dayLabel: 'Day +7', isHistorical: false, projectedPrice: 7520, upperConfidence: 7630, lowerConfidence: 7410, arrivalVolume: 7900, weatherCondition: 'Clear Autumn', weatherTemp: 34, rainfallMm: 0, humidityPercent: 52, weatherFactorRupees: +220, isOptimalSell: true },
        { date: 'Sep 14', dayLabel: 'Day +9', isHistorical: false, projectedPrice: 7480, upperConfidence: 7590, lowerConfidence: 7370, arrivalVolume: 8400, weatherCondition: 'Sunny', weatherTemp: 35, rainfallMm: 0, humidityPercent: 49, weatherFactorRupees: +180 },
        { date: 'Sep 16', dayLabel: 'Day +11', isHistorical: false, projectedPrice: 7440, upperConfidence: 7540, lowerConfidence: 7340, arrivalVolume: 8700, weatherCondition: 'Clear', weatherTemp: 35, rainfallMm: 0, humidityPercent: 47, weatherFactorRupees: +140 },
      ],
      heavy_rain: [
        { date: 'Sep 06', dayLabel: 'Day +1', isHistorical: false, projectedPrice: 7340, upperConfidence: 7420, lowerConfidence: 7260, arrivalVolume: 6800, weatherCondition: 'Heavy Rain (28mm)', weatherTemp: 27, rainfallMm: 28.0, humidityPercent: 88, weatherFactorRupees: +110 },
        { date: 'Sep 07', dayLabel: 'Day +2', isHistorical: false, projectedPrice: 7430, upperConfidence: 7530, lowerConfidence: 7330, arrivalVolume: 5600, weatherCondition: 'Continuous Rain (34mm)', weatherTemp: 26, rainfallMm: 34.0, humidityPercent: 91, weatherFactorRupees: +180 },
        { date: 'Sep 08', dayLabel: 'Day +3', isHistorical: false, projectedPrice: 7520, upperConfidence: 7640, lowerConfidence: 7400, arrivalVolume: 5100, weatherCondition: 'Muddy Fields', weatherTemp: 28, rainfallMm: 12.0, humidityPercent: 86, weatherFactorRupees: +250 },
        { date: 'Sep 09', dayLabel: 'Day +4', isHistorical: false, projectedPrice: 7610, upperConfidence: 7740, lowerConfidence: 7480, arrivalVolume: 5300, weatherCondition: 'Overcast', weatherTemp: 29, rainfallMm: 5.0, humidityPercent: 80, weatherFactorRupees: +320, isOptimalSell: true },
        { date: 'Sep 10', dayLabel: 'Day +5', isHistorical: false, projectedPrice: 7680, upperConfidence: 7810, lowerConfidence: 7550, arrivalVolume: 5800, weatherCondition: 'Clearing', weatherTemp: 31, rainfallMm: 0, humidityPercent: 72, weatherFactorRupees: +370, eventNote: 'EXTREME COTTON SQUEEZE ₹7,680', isOptimalSell: true },
        { date: 'Sep 11', dayLabel: 'Day +6', isHistorical: false, projectedPrice: 7650, upperConfidence: 7780, lowerConfidence: 7520, arrivalVolume: 6500, weatherCondition: 'Sunny', weatherTemp: 32, rainfallMm: 0, humidityPercent: 65, weatherFactorRupees: +340, isOptimalSell: true },
        { date: 'Sep 12', dayLabel: 'Day +7', isHistorical: false, projectedPrice: 7580, upperConfidence: 7700, lowerConfidence: 7460, arrivalVolume: 7400, weatherCondition: 'Sunny', weatherTemp: 33, rainfallMm: 0, humidityPercent: 58, weatherFactorRupees: +280 },
        { date: 'Sep 14', dayLabel: 'Day +9', isHistorical: false, projectedPrice: 7510, upperConfidence: 7620, lowerConfidence: 7400, arrivalVolume: 8200, weatherCondition: 'Clear', weatherTemp: 34, rainfallMm: 0, humidityPercent: 52, weatherFactorRupees: +210 },
        { date: 'Sep 16', dayLabel: 'Day +11', isHistorical: false, projectedPrice: 7450, upperConfidence: 7550, lowerConfidence: 7350, arrivalVolume: 8600, weatherCondition: 'Clear', weatherTemp: 34, rainfallMm: 0, humidityPercent: 49, weatherFactorRupees: +150 },
      ],
      dry_spell: [
        { date: 'Sep 06', dayLabel: 'Day +1', isHistorical: false, projectedPrice: 7290, upperConfidence: 7350, lowerConfidence: 7230, arrivalVolume: 7800, weatherCondition: 'Dry Sunny', weatherTemp: 35, rainfallMm: 0, humidityPercent: 45, weatherFactorRupees: +20 },
        { date: 'Sep 07', dayLabel: 'Day +2', isHistorical: false, projectedPrice: 7300, upperConfidence: 7370, lowerConfidence: 7230, arrivalVolume: 8100, weatherCondition: 'Clear', weatherTemp: 35, rainfallMm: 0, humidityPercent: 44, weatherFactorRupees: +25 },
        { date: 'Sep 08', dayLabel: 'Day +3', isHistorical: false, projectedPrice: 7315, upperConfidence: 7390, lowerConfidence: 7240, arrivalVolume: 8300, weatherCondition: 'Sunny', weatherTemp: 36, rainfallMm: 0, humidityPercent: 42, weatherFactorRupees: +30 },
        { date: 'Sep 09', dayLabel: 'Day +4', isHistorical: false, projectedPrice: 7330, upperConfidence: 7410, lowerConfidence: 7250, arrivalVolume: 8400, weatherCondition: 'Clear', weatherTemp: 36, rainfallMm: 0, humidityPercent: 42, weatherFactorRupees: +35 },
        { date: 'Sep 10', dayLabel: 'Day +5', isHistorical: false, projectedPrice: 7340, upperConfidence: 7420, lowerConfidence: 7260, arrivalVolume: 8500, weatherCondition: 'Sunny', weatherTemp: 35, rainfallMm: 0, humidityPercent: 43, weatherFactorRupees: +40 },
        { date: 'Sep 11', dayLabel: 'Day +6', isHistorical: false, projectedPrice: 7350, upperConfidence: 7440, lowerConfidence: 7260, arrivalVolume: 8600, weatherCondition: 'Clear', weatherTemp: 35, rainfallMm: 0, humidityPercent: 44, weatherFactorRupees: +45 },
        { date: 'Sep 12', dayLabel: 'Day +7', isHistorical: false, projectedPrice: 7360, upperConfidence: 7450, lowerConfidence: 7270, arrivalVolume: 8650, weatherCondition: 'Clear', weatherTemp: 35, rainfallMm: 0, humidityPercent: 45, weatherFactorRupees: +50 },
        { date: 'Sep 14', dayLabel: 'Day +9', isHistorical: false, projectedPrice: 7375, upperConfidence: 7470, lowerConfidence: 7280, arrivalVolume: 8700, weatherCondition: 'Sunny', weatherTemp: 34, rainfallMm: 0, humidityPercent: 46, weatherFactorRupees: +60 },
        { date: 'Sep 16', dayLabel: 'Day +11', isHistorical: false, projectedPrice: 7390, upperConfidence: 7490, lowerConfidence: 7290, arrivalVolume: 8750, weatherCondition: 'Clear', weatherTemp: 34, rainfallMm: 0, humidityPercent: 47, weatherFactorRupees: +70 },
      ],
    },
    weatherDrivers: [
      {
        factorEn: 'Lint Quality & Moisture Penalties',
        factorMr: 'कापसाची प्रत व ओलावा कपात टाळणे',
        factorHi: 'कपास की गुणवत्ता व नमी कटौती से बचाव',
        impactRupees: +140,
        descriptionEn: 'High humidity (>70%) increases yellowing of exposed bolls; ginners paying +₹140 premium for dry covered lots (<8% moisture).',
        descriptionMr: 'हवेतील ओलाव्यामुळे उघड्या कापसावर डाग पडू शकतात; कोरड्या कापसाला जिनर्सकडून १४० रुपये जादा भाव मिळतो.',
        descriptionHi: 'नमी से खुले कपास का रंग पीला पड़ने की आशंका; 8% से कम नमी वाले सूखे माल पर ₹140 प्रीमियम।',
        type: 'positive',
      },
      {
        factorEn: 'Transport Slowdown from Varangaon & Jamner',
        factorMr: 'वरणगाव व जामनेर भागातील वाहतूक मंदावणे',
        factorHi: 'वरणगांव व जामनेर क्षेत्र से धीमी आवक',
        impactRupees: +90,
        descriptionEn: 'Intermittent road repairs & rain delays tractor trolleys from reaching Jalgaon market yard on time.',
        descriptionMr: 'पावसामुळे अंतर्गत रस्त्यांवरील ट्रॅक्टर आवक उशिरा पोहोचत असल्याने सकाळच्या लिलावात भाव वधारतात.',
        descriptionHi: 'रास्तों पर कीचड़ के कारण सुबह की नीलामी में गाड़ियां कम पहुंचने से भाव मजबूत।',
        type: 'positive',
      },
    ],
  },

  // 3. Latur Yellow Soybean (Latur APMC)
  {
    id: 'soybean_latur',
    nameEn: 'Latur Yellow Soybean (JS-335)',
    nameMr: 'लातूर पिवळी सोयाबीन (JS-335)',
    nameHi: 'लातूर पीली सोयाबीन (JS-335)',
    commodityType: 'soybean',
    district: 'Latur',
    districtMr: 'लातूर',
    districtHi: 'लातूर',
    primaryMandi: 'Latur APMC (Oilseed Hub)',
    primaryMandiMr: 'लातूर एपीएमसी (तेलबिया केंद्र)',
    primaryMandiHi: 'लातूर एपीएमसी (तिलहन केंद्र)',
    unit: '₹ / Quintal',
    currentModalPrice: 4620,
    historical7dAvg: 4540,
    historicalVolatility: '±2.9% (Steady)',
    projectedPeakPrice: 4860,
    projectedPeakDay: 'Day +4 (Sep 09)',
    projectedChangePercent: 5.2,
    recommendedSellWindow: {
      fromDay: 'Day +3',
      toDay: 'Day +5',
      adviceEn: 'Solvent extraction plants facing 4,000 MT deficit; sell between Day +3 and +5 for +₹180 to +₹240/Qtl gain.',
      adviceMr: 'सॉल्व्हेंट क्रशिंग प्लांट्समध्ये ४००० टन तुटवडा; दिवस ३ ते ५ दरम्यान विक्री केल्यास प्रति क्विंटल ₹१८० ते २४० अतिरिक्त नफा.',
      adviceHi: 'सॉल्वेंट क्रशिंग प्लांटों में 4,000 टन की कमी; दिन 3 से 5 के मध्य बिक्री पर ₹180 से ₹240/क्विंटल का लाभ।',
    },
    weatherSummary: {
      en: 'Scattered afternoon thunderstorms (16mm) in Marathwada belt. Crushing mills accelerating procurement before monsoon resumes.',
      mr: 'मराठवाडा पट्ट्यात दुपारनंतर वादळी पावसाची शक्यता (१६ मिमी). तेल कारखान्यांकडून साठा वाढवण्यासाठी वेगाने खरेदी सुरू.',
      hi: 'मराठवाड़ा क्षेत्र में दोपहर बाद गरज के साथ बारिश (16 मिमी)। तेल मिलों द्वारा बारिश से पूर्व तेज खरीद जारी।',
      icon: '⛈️',
      alertLevel: 'warning',
      rainfallMm: 16.8,
      humidity: 76,
    },
    historicalPoints: [
      { date: 'Aug 23', dayLabel: 'Aug 23', isHistorical: true, actualPrice: 4460, arrivalVolume: 11200, weatherCondition: 'Clear', weatherTemp: 33, rainfallMm: 0, humidityPercent: 56, weatherFactorRupees: 0 },
      { date: 'Aug 25', dayLabel: 'Aug 25', isHistorical: true, actualPrice: 4490, arrivalVolume: 11000, weatherCondition: 'Sunny', weatherTemp: 33, rainfallMm: 0, humidityPercent: 54, weatherFactorRupees: 0 },
      { date: 'Aug 27', dayLabel: 'Aug 27', isHistorical: true, actualPrice: 4510, arrivalVolume: 10800, weatherCondition: 'Partly Cloudy', weatherTemp: 32, rainfallMm: 0, humidityPercent: 58, weatherFactorRupees: +15 },
      { date: 'Aug 29', dayLabel: 'Aug 29', isHistorical: true, actualPrice: 4530, arrivalVolume: 10600, weatherCondition: 'Breezy', weatherTemp: 31, rainfallMm: 1.0, humidityPercent: 62, weatherFactorRupees: +30 },
      { date: 'Aug 31', dayLabel: 'Aug 31', isHistorical: true, actualPrice: 4560, arrivalVolume: 10300, weatherCondition: 'Overcast', weatherTemp: 30, rainfallMm: 4.2, humidityPercent: 68, weatherFactorRupees: +50 },
      { date: 'Sep 02', dayLabel: 'Sep 02', isHistorical: true, actualPrice: 4580, arrivalVolume: 9900, weatherCondition: 'Rain Showers', weatherTemp: 29, rainfallMm: 7.8, humidityPercent: 72, weatherFactorRupees: +70 },
      { date: 'Sep 04', dayLabel: 'Sep 04', isHistorical: true, actualPrice: 4600, arrivalVolume: 9600, weatherCondition: 'Thunderstorm', weatherTemp: 28, rainfallMm: 12.0, humidityPercent: 75, weatherFactorRupees: +90 },
      { date: 'Sep 05', dayLabel: 'Today', isHistorical: true, isToday: true, actualPrice: 4620, arrivalVolume: 9200, weatherCondition: 'Rain Warning', weatherTemp: 29, rainfallMm: 16.8, humidityPercent: 76, weatherFactorRupees: +110, eventNote: 'Current Trade: Modal ₹4,620 • Crush demand strong' },
    ],
    forecastScenarios: {
      forecast: [
        { date: 'Sep 06', dayLabel: 'Day +1', isHistorical: false, projectedPrice: 4670, upperConfidence: 4740, lowerConfidence: 4610, arrivalVolume: 8400, weatherCondition: 'Thunderstorm (18mm)', weatherTemp: 27, rainfallMm: 18.0, humidityPercent: 82, weatherFactorRupees: +140 },
        { date: 'Sep 07', dayLabel: 'Day +2', isHistorical: false, projectedPrice: 4730, upperConfidence: 4810, lowerConfidence: 4660, arrivalVolume: 7800, weatherCondition: 'Heavy Showers (22mm)', weatherTemp: 26, rainfallMm: 22.0, humidityPercent: 85, weatherFactorRupees: +180, eventNote: 'Mandi arrival drops 26% due to muddy fields' },
        { date: 'Sep 08', dayLabel: 'Day +3', isHistorical: false, projectedPrice: 4800, upperConfidence: 4890, lowerConfidence: 4720, arrivalVolume: 7400, weatherCondition: 'Rain Easing', weatherTemp: 27, rainfallMm: 9.0, humidityPercent: 80, weatherFactorRupees: +220, isOptimalSell: true },
        { date: 'Sep 09', dayLabel: 'Day +4', isHistorical: false, projectedPrice: 4860, upperConfidence: 4950, lowerConfidence: 4780, arrivalVolume: 7600, weatherCondition: 'Partly Sunny', weatherTemp: 29, rainfallMm: 3.0, humidityPercent: 72, weatherFactorRupees: +260, eventNote: 'PEAK ₹4,860 (+5.2%) • Crushers desperate for dry beans', isOptimalSell: true },
        { date: 'Sep 10', dayLabel: 'Day +5', isHistorical: false, projectedPrice: 4830, upperConfidence: 4920, lowerConfidence: 4750, arrivalVolume: 8500, weatherCondition: 'Sunny', weatherTemp: 31, rainfallMm: 0, humidityPercent: 65, weatherFactorRupees: +230, isOptimalSell: true },
        { date: 'Sep 11', dayLabel: 'Day +6', isHistorical: false, projectedPrice: 4770, upperConfidence: 4860, lowerConfidence: 4690, arrivalVolume: 9600, weatherCondition: 'Sunny Clear', weatherTemp: 32, rainfallMm: 0, humidityPercent: 58, weatherFactorRupees: +170 },
        { date: 'Sep 12', dayLabel: 'Day +7', isHistorical: false, projectedPrice: 4710, upperConfidence: 4800, lowerConfidence: 4630, arrivalVolume: 10400, weatherCondition: 'Clear', weatherTemp: 32, rainfallMm: 0, humidityPercent: 55, weatherFactorRupees: +120 },
        { date: 'Sep 14', dayLabel: 'Day +9', isHistorical: false, projectedPrice: 4660, upperConfidence: 4750, lowerConfidence: 4580, arrivalVolume: 10900, weatherCondition: 'Clear', weatherTemp: 33, rainfallMm: 0, humidityPercent: 52, weatherFactorRupees: +80 },
        { date: 'Sep 16', dayLabel: 'Day +11', isHistorical: false, projectedPrice: 4630, upperConfidence: 4710, lowerConfidence: 4550, arrivalVolume: 11200, weatherCondition: 'Clear', weatherTemp: 33, rainfallMm: 0, humidityPercent: 50, weatherFactorRupees: +40 },
      ],
      heavy_rain: [
        { date: 'Sep 06', dayLabel: 'Day +1', isHistorical: false, projectedPrice: 4710, upperConfidence: 4790, lowerConfidence: 4640, arrivalVolume: 7600, weatherCondition: 'Severe Storm (35mm)', weatherTemp: 25, rainfallMm: 35.0, humidityPercent: 89, weatherFactorRupees: +170 },
        { date: 'Sep 07', dayLabel: 'Day +2', isHistorical: false, projectedPrice: 4810, upperConfidence: 4910, lowerConfidence: 4730, arrivalVolume: 6400, weatherCondition: 'Waterlogged Yard (40mm)', weatherTemp: 24, rainfallMm: 40.0, humidityPercent: 93, weatherFactorRupees: +250 },
        { date: 'Sep 08', dayLabel: 'Day +3', isHistorical: false, projectedPrice: 4910, upperConfidence: 5020, lowerConfidence: 4820, arrivalVolume: 5900, weatherCondition: 'Overcast Drizzle', weatherTemp: 26, rainfallMm: 15.0, humidityPercent: 88, weatherFactorRupees: +320, isOptimalSell: true },
        { date: 'Sep 09', dayLabel: 'Day +4', isHistorical: false, projectedPrice: 4980, upperConfidence: 5100, lowerConfidence: 4880, arrivalVolume: 6200, weatherCondition: 'Slow Drainage', weatherTemp: 28, rainfallMm: 5.0, humidityPercent: 81, weatherFactorRupees: +390, eventNote: 'RECORD SURGE ₹4,980 (+7.8%)', isOptimalSell: true },
        { date: 'Sep 10', dayLabel: 'Day +5', isHistorical: false, projectedPrice: 4930, upperConfidence: 5050, lowerConfidence: 4830, arrivalVolume: 7400, weatherCondition: 'Sunny', weatherTemp: 30, rainfallMm: 0, humidityPercent: 72, weatherFactorRupees: +340, isOptimalSell: true },
        { date: 'Sep 11', dayLabel: 'Day +6', isHistorical: false, projectedPrice: 4850, upperConfidence: 4960, lowerConfidence: 4750, arrivalVolume: 8900, weatherCondition: 'Clear', weatherTemp: 31, rainfallMm: 0, humidityPercent: 64, weatherFactorRupees: +260 },
        { date: 'Sep 12', dayLabel: 'Day +7', isHistorical: false, projectedPrice: 4770, upperConfidence: 4870, lowerConfidence: 4680, arrivalVolume: 10100, weatherCondition: 'Clear', weatherTemp: 32, rainfallMm: 0, humidityPercent: 57, weatherFactorRupees: +180 },
        { date: 'Sep 14', dayLabel: 'Day +9', isHistorical: false, projectedPrice: 4700, upperConfidence: 4790, lowerConfidence: 4610, arrivalVolume: 10800, weatherCondition: 'Sunny', weatherTemp: 33, rainfallMm: 0, humidityPercent: 52, weatherFactorRupees: +110 },
        { date: 'Sep 16', dayLabel: 'Day +11', isHistorical: false, projectedPrice: 4650, upperConfidence: 4740, lowerConfidence: 4570, arrivalVolume: 11100, weatherCondition: 'Sunny', weatherTemp: 33, rainfallMm: 0, humidityPercent: 50, weatherFactorRupees: +60 },
      ],
      dry_spell: [
        { date: 'Sep 06', dayLabel: 'Day +1', isHistorical: false, projectedPrice: 4630, upperConfidence: 4690, lowerConfidence: 4580, arrivalVolume: 9600, weatherCondition: 'Dry', weatherTemp: 34, rainfallMm: 0, humidityPercent: 50, weatherFactorRupees: +15 },
        { date: 'Sep 07', dayLabel: 'Day +2', isHistorical: false, projectedPrice: 4640, upperConfidence: 4700, lowerConfidence: 4585, arrivalVolume: 9900, weatherCondition: 'Sunny', weatherTemp: 34, rainfallMm: 0, humidityPercent: 48, weatherFactorRupees: +20 },
        { date: 'Sep 08', dayLabel: 'Day +3', isHistorical: false, projectedPrice: 4655, upperConfidence: 4720, lowerConfidence: 4595, arrivalVolume: 10100, weatherCondition: 'Clear', weatherTemp: 34, rainfallMm: 0, humidityPercent: 47, weatherFactorRupees: +25 },
        { date: 'Sep 09', dayLabel: 'Day +4', isHistorical: false, projectedPrice: 4670, upperConfidence: 4740, lowerConfidence: 4610, arrivalVolume: 10300, weatherCondition: 'Clear', weatherTemp: 35, rainfallMm: 0, humidityPercent: 46, weatherFactorRupees: +30 },
        { date: 'Sep 10', dayLabel: 'Day +5', isHistorical: false, projectedPrice: 4680, upperConfidence: 4750, lowerConfidence: 4620, arrivalVolume: 10400, weatherCondition: 'Sunny', weatherTemp: 35, rainfallMm: 0, humidityPercent: 45, weatherFactorRupees: +35 },
        { date: 'Sep 11', dayLabel: 'Day +6', isHistorical: false, projectedPrice: 4690, upperConfidence: 4760, lowerConfidence: 4630, arrivalVolume: 10500, weatherCondition: 'Clear', weatherTemp: 34, rainfallMm: 0, humidityPercent: 46, weatherFactorRupees: +40 },
        { date: 'Sep 12', dayLabel: 'Day +7', isHistorical: false, projectedPrice: 4700, upperConfidence: 4780, lowerConfidence: 4640, arrivalVolume: 10600, weatherCondition: 'Clear', weatherTemp: 34, rainfallMm: 0, humidityPercent: 47, weatherFactorRupees: +45 },
        { date: 'Sep 14', dayLabel: 'Day +9', isHistorical: false, projectedPrice: 4715, upperConfidence: 4800, lowerConfidence: 4650, arrivalVolume: 10750, weatherCondition: 'Sunny', weatherTemp: 33, rainfallMm: 0, humidityPercent: 48, weatherFactorRupees: +55 },
        { date: 'Sep 16', dayLabel: 'Day +11', isHistorical: false, projectedPrice: 4730, upperConfidence: 4820, lowerConfidence: 4660, arrivalVolume: 10900, weatherCondition: 'Clear', weatherTemp: 33, rainfallMm: 0, humidityPercent: 49, weatherFactorRupees: +65 },
      ],
    },
    weatherDrivers: [
      {
        factorEn: 'Delayed Threshing & Pod Moisture Squeeze',
        factorMr: 'पावसामुळे काढणी व मळणीस होणारा विलंब',
        factorHi: 'बारिश से थ्रेशिंग व कटाई में देरी',
        impactRupees: +160,
        descriptionEn: 'Showers across Nilanga, Ausa and Udgir prevent farm thresher operation; crushers compete for ready warehouse lots.',
        descriptionMr: 'निलंगा व औसा तालुक्यात पावसामुळे मळणी यंत्रे बंद; क्रशर्सना कोरड्या मालाची त्वरित गरज असल्याने चढाओढ.',
        descriptionHi: 'निलंगा व औसा में थ्रेशर बंद होने से तेल मिलों में माल की भारी कमी, व्यापारियों में खींचतान।',
        type: 'positive',
      },
      {
        factorEn: 'Solvent Extraction Plant Delivery Commitments',
        factorMr: 'तेल कारखान्यांची वेळेवर डिलिव्हरीची गरज',
        factorHi: 'सॉल्वेंट प्लांटों के डिलीवरी कांट्रैक्ट्स',
        impactRupees: +100,
        descriptionEn: 'Plants have forward commitments to ship refined soybean oil before Ganesh festival, forcing prompt spot procurement.',
        descriptionMr: 'सण-उत्सवानिमित्त रिफाइंड तेलाची मागणी पूर्ण करण्यासाठी कारखान्यांकडून वेळेवर स्पॉट खरेदी सुरू.',
        descriptionHi: 'आगामी त्योहारों के चलते रिफाइंड तेल की समय पर डिलीवरी हेतु तुरंत खरीद मजबूरी।',
        type: 'positive',
      },
    ],
  },

  // 4. Tomato (Narayangaon / Junnar APMC - Pune)
  {
    id: 'tomato_pune',
    nameEn: 'Tomato (Hybrid Abhinav)',
    nameMr: 'टोमॅटो (हायब्रिड अभिनव)',
    nameHi: 'टमाटर (हाइब्रिड अभिनव)',
    commodityType: 'tomato',
    district: 'Pune',
    districtMr: 'पुणे',
    districtHi: 'पुणे',
    primaryMandi: 'Narayangaon APMC',
    primaryMandiMr: 'नारायणगाव एपीएमसी',
    primaryMandiHi: 'नारायणगांव एपीएमसी',
    unit: '₹ / Quintal',
    currentModalPrice: 1650,
    historical7dAvg: 1480,
    historicalVolatility: '±9.5% (High Volatility)',
    projectedPeakPrice: 2050,
    projectedPeakDay: 'Day +3 (Sep 08)',
    projectedChangePercent: 24.2,
    recommendedSellWindow: {
      fromDay: 'Day +2',
      toDay: 'Day +4',
      adviceEn: 'High perishability crop! Pick firm red-turning tomatoes before rain hits; sell Day +2 to +4 during metro supply deficit.',
      adviceMr: 'नाशवंत पीक! पाऊस सुरू होण्यापूर्वी तांबूस फळे तोडून ठेवा; मुंबई/पुणे बाजारात टंचाई असताना दिवस २ ते ४ दरम्यान विका.',
      adviceHi: 'शीघ्र खराब होने वाली फसल! बारिश से पहले तुड़ाई करें; दिन 2 से 4 के मध्य मेट्रो आपूर्ति घटने पर बेचें।',
    },
    weatherSummary: {
      en: 'Heavy rain warnings (28mm) across Junnar, Khed & Ambegaon. Downpours cause fruit cracking & road transportation collapse.',
      mr: 'जुन्नर, खेड व आंबेगाव भागात मुसळधार पाऊस (२८ मिमी). फळांना तडे जाण्याची व वाहतूक विस्कळीत होण्याची दाट शक्यता.',
      hi: 'जुन्नर, खेड एवं आंबेगांव में भारी बारिश (28 मिमी)। फलों में क्रैकिंग तथा परिवहन बाधित होने का खतरा।',
      icon: '🌧️',
      alertLevel: 'critical',
      rainfallMm: 28.5,
      humidity: 84,
    },
    historicalPoints: [
      { date: 'Aug 23', dayLabel: 'Aug 23', isHistorical: true, actualPrice: 1350, arrivalVolume: 9800, weatherCondition: 'Sunny', weatherTemp: 31, rainfallMm: 0, humidityPercent: 60, weatherFactorRupees: 0 },
      { date: 'Aug 25', dayLabel: 'Aug 25', isHistorical: true, actualPrice: 1390, arrivalVolume: 9500, weatherCondition: 'Clear', weatherTemp: 31, rainfallMm: 0, humidityPercent: 58, weatherFactorRupees: +10 },
      { date: 'Aug 27', dayLabel: 'Aug 27', isHistorical: true, actualPrice: 1420, arrivalVolume: 9200, weatherCondition: 'Partly Cloudy', weatherTemp: 30, rainfallMm: 0, humidityPercent: 62, weatherFactorRupees: +25 },
      { date: 'Aug 29', dayLabel: 'Aug 29', isHistorical: true, actualPrice: 1480, arrivalVolume: 8900, weatherCondition: 'Breezy', weatherTemp: 29, rainfallMm: 2.0, humidityPercent: 68, weatherFactorRupees: +50 },
      { date: 'Aug 31', dayLabel: 'Aug 31', isHistorical: true, actualPrice: 1530, arrivalVolume: 8600, weatherCondition: 'Light Rain', weatherTemp: 28, rainfallMm: 6.0, humidityPercent: 74, weatherFactorRupees: +90 },
      { date: 'Sep 02', dayLabel: 'Sep 02', isHistorical: true, actualPrice: 1590, arrivalVolume: 8100, weatherCondition: 'Overcast', weatherTemp: 27, rainfallMm: 9.5, humidityPercent: 79, weatherFactorRupees: +140 },
      { date: 'Sep 04', dayLabel: 'Sep 04', isHistorical: true, actualPrice: 1620, arrivalVolume: 7800, weatherCondition: 'Showers', weatherTemp: 27, rainfallMm: 14.0, humidityPercent: 82, weatherFactorRupees: +180 },
      { date: 'Sep 05', dayLabel: 'Today', isHistorical: true, isToday: true, actualPrice: 1650, arrivalVolume: 7400, weatherCondition: 'Heavy Rain Warning', weatherTemp: 26, rainfallMm: 28.5, humidityPercent: 84, weatherFactorRupees: +220, eventNote: 'Current Trade: Modal ₹1,650 • Short shelf-life' },
    ],
    forecastScenarios: {
      forecast: [
        { date: 'Sep 06', dayLabel: 'Day +1', isHistorical: false, projectedPrice: 1780, upperConfidence: 1890, lowerConfidence: 1690, arrivalVolume: 6200, weatherCondition: 'Heavy Rain (32mm) 🌧️', weatherTemp: 24, rainfallMm: 32.0, humidityPercent: 89, weatherFactorRupees: +290, eventNote: 'Picking stopped in Junnar belt' },
        { date: 'Sep 07', dayLabel: 'Day +2', isHistorical: false, projectedPrice: 1920, upperConfidence: 2050, lowerConfidence: 1810, arrivalVolume: 5100, weatherCondition: 'Thunderstorms (38mm)', weatherTemp: 24, rainfallMm: 38.0, humidityPercent: 92, weatherFactorRupees: +380, eventNote: 'Mumbai Vashi Mandi facing severe shortage', isOptimalSell: true },
        { date: 'Sep 08', dayLabel: 'Day +3', isHistorical: false, projectedPrice: 2050, upperConfidence: 2200, lowerConfidence: 1930, arrivalVolume: 4600, weatherCondition: 'Rain Easing (12mm)', weatherTemp: 25, rainfallMm: 12.0, humidityPercent: 86, weatherFactorRupees: +460, eventNote: 'PEAK ₹2,050 (+24.2%) • Sell undamaged crates immediately!', isOptimalSell: true },
        { date: 'Sep 09', dayLabel: 'Day +4', isHistorical: false, projectedPrice: 1960, upperConfidence: 2100, lowerConfidence: 1840, arrivalVolume: 6100, weatherCondition: 'Partly Cloudy', weatherTemp: 27, rainfallMm: 3.0, humidityPercent: 78, weatherFactorRupees: +350, isOptimalSell: true },
        { date: 'Sep 10', dayLabel: 'Day +5', isHistorical: false, projectedPrice: 1810, upperConfidence: 1940, lowerConfidence: 1700, arrivalVolume: 7800, weatherCondition: 'Sunny', weatherTemp: 29, rainfallMm: 0, humidityPercent: 68, weatherFactorRupees: +220 },
        { date: 'Sep 11', dayLabel: 'Day +6', isHistorical: false, projectedPrice: 1690, upperConfidence: 1810, lowerConfidence: 1580, arrivalVolume: 9200, weatherCondition: 'Clear', weatherTemp: 30, rainfallMm: 0, humidityPercent: 62, weatherFactorRupees: +120 },
        { date: 'Sep 12', dayLabel: 'Day +7', isHistorical: false, projectedPrice: 1580, upperConfidence: 1690, lowerConfidence: 1470, arrivalVolume: 10400, weatherCondition: 'Clear', weatherTemp: 31, rainfallMm: 0, humidityPercent: 57, weatherFactorRupees: +40 },
        { date: 'Sep 14', dayLabel: 'Day +9', isHistorical: false, projectedPrice: 1520, upperConfidence: 1620, lowerConfidence: 1410, arrivalVolume: 10800, weatherCondition: 'Sunny', weatherTemp: 31, rainfallMm: 0, humidityPercent: 55, weatherFactorRupees: -10 },
        { date: 'Sep 16', dayLabel: 'Day +11', isHistorical: false, projectedPrice: 1490, upperConfidence: 1590, lowerConfidence: 1390, arrivalVolume: 11000, weatherCondition: 'Clear', weatherTemp: 32, rainfallMm: 0, humidityPercent: 53, weatherFactorRupees: -30 },
      ],
      heavy_rain: [
        { date: 'Sep 06', dayLabel: 'Day +1', isHistorical: false, projectedPrice: 1840, upperConfidence: 1960, lowerConfidence: 1740, arrivalVolume: 5400, weatherCondition: 'Torrential (48mm) ⛈️', weatherTemp: 23, rainfallMm: 48.0, humidityPercent: 94, weatherFactorRupees: +350 },
        { date: 'Sep 07', dayLabel: 'Day +2', isHistorical: false, projectedPrice: 2040, upperConfidence: 2180, lowerConfidence: 1910, arrivalVolume: 4200, weatherCondition: 'Ghat Landslide Risk (55mm)', weatherTemp: 23, rainfallMm: 55.0, humidityPercent: 96, weatherFactorRupees: +490, isOptimalSell: true },
        { date: 'Sep 08', dayLabel: 'Day +3', isHistorical: false, projectedPrice: 2240, upperConfidence: 2410, lowerConfidence: 2090, arrivalVolume: 3600, weatherCondition: 'Continuous Rain (30mm)', weatherTemp: 24, rainfallMm: 30.0, humidityPercent: 92, weatherFactorRupees: +620, eventNote: 'HISTORIC PEAK ₹2,240 (+35.7%)', isOptimalSell: true },
        { date: 'Sep 09', dayLabel: 'Day +4', isHistorical: false, projectedPrice: 2120, upperConfidence: 2280, lowerConfidence: 1980, arrivalVolume: 4900, weatherCondition: 'Overcast Drizzle', weatherTemp: 26, rainfallMm: 10.0, humidityPercent: 85, weatherFactorRupees: +510, isOptimalSell: true },
        { date: 'Sep 10', dayLabel: 'Day +5', isHistorical: false, projectedPrice: 1930, upperConfidence: 2080, lowerConfidence: 1800, arrivalVolume: 6900, weatherCondition: 'Clearing', weatherTemp: 28, rainfallMm: 0, humidityPercent: 74, weatherFactorRupees: +340 },
        { date: 'Sep 11', dayLabel: 'Day +6', isHistorical: false, projectedPrice: 1760, upperConfidence: 1890, lowerConfidence: 1640, arrivalVolume: 8800, weatherCondition: 'Sunny', weatherTemp: 30, rainfallMm: 0, humidityPercent: 66, weatherFactorRupees: +190 },
        { date: 'Sep 12', dayLabel: 'Day +7', isHistorical: false, projectedPrice: 1620, upperConfidence: 1740, lowerConfidence: 1510, arrivalVolume: 10200, weatherCondition: 'Sunny', weatherTemp: 31, rainfallMm: 0, humidityPercent: 60, weatherFactorRupees: +70 },
        { date: 'Sep 14', dayLabel: 'Day +9', isHistorical: false, projectedPrice: 1530, upperConfidence: 1640, lowerConfidence: 1430, arrivalVolume: 10900, weatherCondition: 'Clear', weatherTemp: 32, rainfallMm: 0, humidityPercent: 54, weatherFactorRupees: -10 },
        { date: 'Sep 16', dayLabel: 'Day +11', isHistorical: false, projectedPrice: 1480, upperConfidence: 1580, lowerConfidence: 1380, arrivalVolume: 11200, weatherCondition: 'Clear', weatherTemp: 32, rainfallMm: 0, humidityPercent: 52, weatherFactorRupees: -50 },
      ],
      dry_spell: [
        { date: 'Sep 06', dayLabel: 'Day +1', isHistorical: false, projectedPrice: 1660, upperConfidence: 1720, lowerConfidence: 1600, arrivalVolume: 7900, weatherCondition: 'Sunny Dry', weatherTemp: 32, rainfallMm: 0, humidityPercent: 54, weatherFactorRupees: +20 },
        { date: 'Sep 07', dayLabel: 'Day +2', isHistorical: false, projectedPrice: 1675, upperConfidence: 1740, lowerConfidence: 1610, arrivalVolume: 8300, weatherCondition: 'Clear', weatherTemp: 32, rainfallMm: 0, humidityPercent: 52, weatherFactorRupees: +25 },
        { date: 'Sep 08', dayLabel: 'Day +3', isHistorical: false, projectedPrice: 1680, upperConfidence: 1750, lowerConfidence: 1615, arrivalVolume: 8600, weatherCondition: 'Clear', weatherTemp: 33, rainfallMm: 0, humidityPercent: 50, weatherFactorRupees: +30 },
        { date: 'Sep 09', dayLabel: 'Day +4', isHistorical: false, projectedPrice: 1690, upperConfidence: 1760, lowerConfidence: 1620, arrivalVolume: 8900, weatherCondition: 'Sunny', weatherTemp: 33, rainfallMm: 0, humidityPercent: 49, weatherFactorRupees: +35 },
        { date: 'Sep 10', dayLabel: 'Day +5', isHistorical: false, projectedPrice: 1685, upperConfidence: 1755, lowerConfidence: 1615, arrivalVolume: 9100, weatherCondition: 'Sunny', weatherTemp: 33, rainfallMm: 0, humidityPercent: 48, weatherFactorRupees: +30 },
        { date: 'Sep 11', dayLabel: 'Day +6', isHistorical: false, projectedPrice: 1670, upperConfidence: 1740, lowerConfidence: 1600, arrivalVolume: 9400, weatherCondition: 'Clear', weatherTemp: 32, rainfallMm: 0, humidityPercent: 49, weatherFactorRupees: +20 },
        { date: 'Sep 12', dayLabel: 'Day +7', isHistorical: false, projectedPrice: 1650, upperConfidence: 1720, lowerConfidence: 1580, arrivalVolume: 9700, weatherCondition: 'Clear', weatherTemp: 32, rainfallMm: 0, humidityPercent: 50, weatherFactorRupees: +10 },
        { date: 'Sep 14', dayLabel: 'Day +9', isHistorical: false, projectedPrice: 1620, upperConfidence: 1690, lowerConfidence: 1550, arrivalVolume: 10100, weatherCondition: 'Sunny', weatherTemp: 32, rainfallMm: 0, humidityPercent: 51, weatherFactorRupees: -20 },
        { date: 'Sep 16', dayLabel: 'Day +11', isHistorical: false, projectedPrice: 1590, upperConfidence: 1660, lowerConfidence: 1520, arrivalVolume: 10400, weatherCondition: 'Sunny', weatherTemp: 32, rainfallMm: 0, humidityPercent: 52, weatherFactorRupees: -40 },
      ],
    },
    weatherDrivers: [
      {
        factorEn: 'Fruit Cracking & Rot Prevention Advantage',
        factorMr: 'फळांना तडे जाण्यापासून वाचवलेला चांगला माल',
        factorHi: 'फलों में क्रैकिंग से बचे ताजे माल का मूल्य',
        impactRupees: +260,
        descriptionEn: 'Intense rain creates fruit skin splits; certified crate-packed undamaged tomatoes earn massive price premium in Mumbai.',
        descriptionMr: 'जास्त पावसामुळे टोमॅटो फुटतात; क्रेट्समध्ये सुरक्षित ठेवलेल्या चांगल्या टोमॅटोला मुंबई वाशी मार्केटमध्ये प्रचंड मागणी.',
        descriptionHi: 'अधिक बारिश से टमाटर फटने का डर; क्रेट में सुरक्षित ताजे टमाटरों पर वाशी मंडी में भारी प्रीमियम।',
        type: 'positive',
      },
      {
        factorEn: 'Ghat Route Transportation Bottleneck',
        factorMr: 'घाट रस्त्यावरील वाहतूक कोंडी',
        factorHi: 'घाट मार्ग पर भूस्खलन व जाम से आवक में बाधा',
        impactRupees: +160,
        descriptionEn: 'Malshej & Kasara ghat rain slows transit trucks by 12 hours, creating local retail market vacuum in Pune & Thane.',
        descriptionMr: 'माळशेज घाटातील धुके व पावसामुळे ट्रक उशिरा पोहोचत असल्याने स्थानिक बाजारपेठेत माल तुटवडा.',
        descriptionHi: 'घाटी में बारिश के कारण गाड़ियां लेट, जिससे ठाणे व पुणे में आपूर्ति की कमी।',
        type: 'positive',
      },
    ],
  },
];
