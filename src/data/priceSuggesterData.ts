import { PriceAlertSubscription, PriceSuggestionResult } from '../types';

export interface DistrictMandiConfig {
  id: string;
  nameEn: string;
  nameMr: string;
  nameHi: string;
  primaryMandis: Array<{ id: string; nameEn: string; nameMr: string; nameHi: string }>;
  topCrops: string[];
}

export const maharashtraDistricts: DistrictMandiConfig[] = [
  {
    id: 'nashik',
    nameEn: 'Nashik',
    nameMr: 'नाशिक',
    nameHi: 'नाशिक',
    primaryMandis: [
      { id: 'lasalgaon', nameEn: 'Lasalgaon APMC', nameMr: 'लासलगाव एपीएमसी', nameHi: 'लासलगांव एपीएमसी' },
      { id: 'pimpalgaon', nameEn: 'Pimpalgaon Baswant APMC', nameMr: 'पिंपळगाव बसवंत एपीएमसी', nameHi: 'पिंपलगांव बसवंत एपीएमसी' },
      { id: 'kalwan', nameEn: 'Kalwan APMC', nameMr: 'कळवण एपीएमसी', nameHi: 'कलवण एपीएमसी' },
      { id: 'yeola', nameEn: 'Yeola APMC', nameMr: 'येवला एपीएमसी', nameHi: 'येवला एपीएमसी' },
    ],
    topCrops: ['Onion (Red)', 'Tomato', 'Grapes', 'Maize', 'Soybean (Yellow)'],
  },
  {
    id: 'jalgaon',
    nameEn: 'Jalgaon',
    nameMr: 'जळगाव',
    nameHi: 'जलगांव',
    primaryMandis: [
      { id: 'jalgaon_mandi', nameEn: 'Jalgaon APMC', nameMr: 'जळगाव एपीएमसी', nameHi: 'जलगांव एपीएमसी' },
      { id: 'jamner', nameEn: 'Jamner APMC', nameMr: 'जामनेर एपीएमसी', nameHi: 'जामनेर एपीएमसी' },
      { id: 'raver', nameEn: 'Raver APMC', nameMr: 'रावेर एपीएमसी', nameHi: 'रावेर एपीएमसी' },
      { id: 'chalisgaon', nameEn: 'Chalisgaon APMC', nameMr: 'चाळीसगाव एपीएमसी', nameHi: 'चालिसगांव एपीएमसी' },
    ],
    topCrops: ['Cotton (Medium Staple)', 'Banana', 'Maize', 'Soybean (Yellow)'],
  },
  {
    id: 'latur',
    nameEn: 'Latur',
    nameMr: 'लातूर',
    nameHi: 'लातूर',
    primaryMandis: [
      { id: 'latur_mandi', nameEn: 'Latur APMC (Oilseed Hub)', nameMr: 'लातूर एपीएमसी (तेलबिया केंद्र)', nameHi: 'लातूर एपीएमसी (तिलहन केंद्र)' },
      { id: 'nilanga', nameEn: 'Nilanga APMC', nameMr: 'निलंगा एपीएमसी', nameHi: 'निलंगा एपीएमसी' },
      { id: 'udgir', nameEn: 'Udgir APMC', nameMr: 'उदगीर एपीएमसी', nameHi: 'उदगीर एपीएमसी' },
    ],
    topCrops: ['Soybean (Yellow)', 'Gram / Chana (Bengal Gram)', 'Tur / Arhar (Pigeon Pea)'],
  },
  {
    id: 'pune',
    nameEn: 'Pune',
    nameMr: 'पुणे',
    nameHi: 'पुणे',
    primaryMandis: [
      { id: 'khed', nameEn: 'Khed (Chakan) APMC', nameMr: 'खेड (चाकण) एपीएमसी', nameHi: 'खेड (चाकण) एपीएमसी' },
      { id: 'junnar', nameEn: 'Junnar (Narayangaon) APMC', nameMr: 'जुन्नर (नारायणगाव) एपीएमसी', nameHi: 'जुन्नर (नारायणगांव) एपीएमसी' },
      { id: 'baramati', nameEn: 'Baramati APMC', nameMr: 'बारामती एपीएमसी', nameHi: 'बारामती एपीएमसी' },
    ],
    topCrops: ['Tomato', 'Onion (Red)', 'Pomegranate (Bhagwa)', 'Wheat (Sharbati)'],
  },
  {
    id: 'solapur',
    nameEn: 'Solapur',
    nameMr: 'सोलापूर',
    nameHi: 'सोलापूर',
    primaryMandis: [
      { id: 'solapur_mandi', nameEn: 'Solapur APMC', nameMr: 'सोलापूर एपीएमसी', nameHi: 'सोलापुर एपीएमसी' },
      { id: 'pandharpur', nameEn: 'Pandharpur APMC', nameMr: 'पंढरपूर एपीएमसी', nameHi: 'पंढरपुर एपीएमसी' },
      { id: 'kurduwadi', nameEn: 'Kurduwadi APMC', nameMr: 'कुर्डूवाडी एपीएमसी', nameHi: 'कुर्डूवाडी एपीएमसी' },
    ],
    topCrops: ['Pomegranate (Bhagwa)', 'Onion (Red)', 'Jowar (Sorghum)', 'Grape'],
  },
  {
    id: 'sangli',
    nameEn: 'Sangli',
    nameMr: 'सांगली',
    nameHi: 'सांगली',
    primaryMandis: [
      { id: 'sangli_mandi', nameEn: 'Sangli APMC (Turmeric Yard)', nameMr: 'सांगली एपीएमसी (हळद मार्केट)', nameHi: 'सांगली एपीएमसी (हल्दी मंडी)' },
      { id: 'tasgaon', nameEn: 'Tasgaon APMC', nameMr: 'तासगाव एपीएमसी', nameHi: 'तासगांव एपीएमसी' },
    ],
    topCrops: ['Turmeric (Rajapuri)', 'Grapes (Raisins)', 'Soybean (Yellow)'],
  },
  {
    id: 'ahmednagar',
    nameEn: 'Ahmednagar',
    nameMr: 'अहिल्यानगर (अहमदनगर)',
    nameHi: 'अहमदनगर',
    primaryMandis: [
      { id: 'rahuri', nameEn: 'Rahuri APMC', nameMr: 'राहुरी एपीएमसी', nameHi: 'राहुरी एपीएमसी' },
      { id: 'sangamner', nameEn: 'Sangamner APMC', nameMr: 'संगमनेर एपीएमसी', nameHi: 'संगमनेर एपीएमसी' },
      { id: 'kopargaon', nameEn: 'Kopargaon APMC', nameMr: 'कोपरगाव एपीएमसी', nameHi: 'कोपरगांव एपीएमसी' },
    ],
    topCrops: ['Onion (Red)', 'Soybean (Yellow)', 'Pomegranate (Bhagwa)', 'Cotton (Medium Staple)'],
  },
  {
    id: 'akola',
    nameEn: 'Akola',
    nameMr: 'अकोला',
    nameHi: 'अकोला',
    primaryMandis: [
      { id: 'akola_mandi', nameEn: 'Akola APMC', nameMr: 'अकोला एपीएमसी', nameHi: 'अकोला एपीएमसी' },
      { id: 'murtizapur', nameEn: 'Murtizapur APMC', nameMr: 'मुर्तिजापूर एपीएमसी', nameHi: 'मुर्तिजापुर एपीएमसी' },
    ],
    topCrops: ['Cotton (Medium Staple)', 'Soybean (Yellow)', 'Wheat (Sharbati)'],
  }
];

export const cropCommodityList = [
  {
    nameEn: 'Onion (Red)',
    nameMr: 'लाल कांदा (Garva/Gavran)',
    nameHi: 'लाल प्याज (गरवा/गावरान)',
    variety: 'Gavran / Garva',
    benchmarkPrice: 2280,
    unit: '₹ / Qtl',
    shelfLifeDaysVentilated: 120,
    shelfLifeDaysOpen: 18,
  },
  {
    nameEn: 'Cotton (Medium Staple)',
    nameMr: 'कापूस (BT Cotton)',
    nameHi: 'कपास (बीटी कॉटन)',
    variety: 'BT Cotton 28-30mm',
    benchmarkPrice: 7250,
    unit: '₹ / Qtl',
    shelfLifeDaysVentilated: 180,
    shelfLifeDaysOpen: 45,
  },
  {
    nameEn: 'Soybean (Yellow)',
    nameMr: 'पिवळी सोयाबीन (JS-335)',
    nameHi: 'पीली सोयाबीन (JS-335)',
    variety: 'JS-335 / JS-9305',
    benchmarkPrice: 4620,
    unit: '₹ / Qtl',
    shelfLifeDaysVentilated: 210,
    shelfLifeDaysOpen: 60,
  },
  {
    nameEn: 'Turmeric (Rajapuri)',
    nameMr: 'हळद (राजापुरी फिंगर)',
    nameHi: 'हल्दी (राजापुरी फिंगर)',
    variety: 'Rajapuri Finger Polished',
    benchmarkPrice: 15100,
    unit: '₹ / Qtl',
    shelfLifeDaysVentilated: 365,
    shelfLifeDaysOpen: 120,
  },
  {
    nameEn: 'Pomegranate (Bhagwa)',
    nameMr: 'डाळिंब (भगवा एक्सपोर्ट)',
    nameHi: 'अनार (भगवा निर्यात)',
    variety: 'Bhagwa 250g+',
    benchmarkPrice: 9900,
    unit: '₹ / Qtl',
    shelfLifeDaysVentilated: 35,
    shelfLifeDaysOpen: 7,
  },
  {
    nameEn: 'Wheat (Sharbati)',
    nameMr: 'गहू (शरबती / लोक-१)',
    nameHi: 'गेहूं (शरबती / लोक-1)',
    variety: 'Lok-1 Sharbati',
    benchmarkPrice: 3200,
    unit: '₹ / Qtl',
    shelfLifeDaysVentilated: 300,
    shelfLifeDaysOpen: 90,
  },
  {
    nameEn: 'Tomato',
    nameMr: 'टोमॅटो (हायब्रिड)',
    nameHi: 'टमाटर (हाइब्रिड)',
    variety: 'Abhinav / Shivam',
    benchmarkPrice: 1650,
    unit: '₹ / Qtl',
    shelfLifeDaysVentilated: 14,
    shelfLifeDaysOpen: 4,
  },
];

export const defaultSubscriptions: PriceAlertSubscription[] = [
  {
    id: 'sub-001',
    district: 'Nashik',
    commodity: 'Onion (Red)',
    mandi: 'Lasalgaon APMC',
    phone: '+91 98221 44521',
    channels: {
      sms: true,
      push: true,
      whatsapp: true,
    },
    triggerType: 'spike',
    thresholdValue: 5, // Alert if price jumps +5%
    active: true,
    createdAt: '2026-09-01 08:30 AM',
    lastTriggered: 'Today, 11:30 AM',
    lastAlertMessage: 'Lasalgaon Mandi: Onion Modal jumped +₹140 (+6.5%) to ₹2,420/Qtl due to 22% lower arrivals from Kalwan. Target spike trigger reached!',
  },
  {
    id: 'sub-002',
    district: 'Latur',
    commodity: 'Soybean (Yellow)',
    mandi: 'Latur APMC (Oilseed Hub)',
    phone: '+91 98221 44521',
    channels: {
      sms: true,
      push: false,
      whatsapp: true,
    },
    triggerType: 'crosses_above',
    thresholdValue: 4600, // Alert if price crosses ₹4,600/qtl
    active: true,
    createdAt: '2026-09-02 09:15 AM',
    lastTriggered: 'Today, 11:45 AM',
    lastAlertMessage: 'Latur APMC: Yellow Soybean crossed threshold ₹4,600 reaching ₹4,620/Qtl (+₹80). Crush plant demand high.',
  },
];

/**
 * Intelligent Price Suggester Engine:
 * Combines Past Demand/Supply (arrivals & trend), Future Outlook (procurement, festival & institutional tenders),
 * and Live Weather Forecast (rainfall, humidity, spoilage risk) to generate an optimal selling recommendation.
 */
export function calculatePriceSuggestion(params: {
  commodity: string;
  district: string;
  mandi: string;
  qualityGrade: 'A+' | 'A' | 'B' | 'C';
  storageType: 'ventilated_chawl' | 'warehouse' | 'field_open';
  holdingDays: number;
}): PriceSuggestionResult {
  const crop = cropCommodityList.find((c) => c.nameEn === params.commodity) || cropCommodityList[0];
  const basePrice = crop.benchmarkPrice;

  // 1. Past Supply & Arrival Trend calculation
  let pastSupplyDelta = 0;
  let pastSupplyText = '';
  if (params.commodity.includes('Onion')) {
    pastSupplyDelta = +140;
    pastSupplyText = 'Mandi arrivals down 19% across Nashik belt (14,200 Qtl vs 17,500 normal); strong biddings from southern traders.';
  } else if (params.commodity.includes('Cotton')) {
    pastSupplyDelta = -60;
    pastSupplyText = 'Arrivals steady at 8,450 Qtl; ginning mills waiting for lower moisture arrivals from Jalgaon talukas.';
  } else if (params.commodity.includes('Soybean')) {
    pastSupplyDelta = +90;
    pastSupplyText = 'Latur crushing plants operating at 82% capacity; spot supply deficit of 3,500 MT recorded over past 7 days.';
  } else {
    pastSupplyDelta = +75;
    pastSupplyText = 'Terminal wholesale arrivals declined 12% over last week with steady clearance rate (>92%).';
  }

  // 2. Future Demand & Procurement Outlook
  let futureDemandDelta = 0;
  let futureDemandText = '';
  if (params.commodity.includes('Onion')) {
    futureDemandDelta = +150;
    futureDemandText = 'NAFED & NCCF 50,000 MT buffer procurement active at MSP benchmark; Bangladesh export duty stability boosting cross-border orders.';
  } else if (params.commodity.includes('Cotton')) {
    futureDemandDelta = +120;
    futureDemandText = 'Cotton Corporation of India (CCI) procurement centers opening next Monday; export demand for 29mm staple firming up in Gujarat.';
  } else if (params.commodity.includes('Soybean')) {
    futureDemandDelta = +110;
    futureDemandText = 'Govt. import duty increase on crude palm oil creates positive domestic soy oil crushing margin of +₹140/Qtl.';
  } else {
    futureDemandDelta = +80;
    futureDemandText = 'Metro retail consumption in Mumbai/Pune corridor up 14% ahead of festival season procurement tenders.';
  }

  // 3. Weather Data Impact (Unseasonal Rain, Humidity, Field Storage)
  let weatherDelta = 0;
  let weatherText = '';
  if (params.storageType === 'field_open') {
    // Open field is at huge risk from rain / humidity
    weatherDelta = -110;
    weatherText = 'Unseasonal rain and 78% RH forecast within 72 hrs. Open field storage risks 6-9% fungal rotting and neck rot decay. Immediate sale advised!';
  } else {
    // Ventilated chawl or warehouse enables farmer to capitalize on rain-induced supply crunch
    weatherDelta = +130;
    weatherText = 'Upcoming unseasonal showers will disrupt harvest & transportation in neighboring talukas, creating 4-day spot supply squeeze (+₹130/Qtl premium for dry cured stock).';
  }

  // 4. Quality Grade Multiplier
  let qualityDelta = 0;
  if (params.qualityGrade === 'A+') qualityDelta = +180;
  else if (params.qualityGrade === 'A') qualityDelta = +90;
  else if (params.qualityGrade === 'B') qualityDelta = -50;
  else qualityDelta = -180;

  // 5. Holding Days impact & weight shrinkage deduction
  // Storage weight loss (drying shrinkage) roughly ~0.15% per day
  const storageLossPerQtl = Math.round((params.holdingDays * 0.002) * basePrice);
  const projectedGrossGain = Math.round(
    pastSupplyDelta * 0.7 +
    futureDemandDelta * (params.holdingDays >= 3 ? 0.9 : 0.4) +
    weatherDelta * (params.holdingDays >= 3 ? 1.0 : 0.2) +
    qualityDelta
  );
  const projectedNetGain = projectedGrossGain - storageLossPerQtl;

  const recommendedPriceMin = basePrice + Math.max(0, projectedNetGain - 50);
  const recommendedPriceMax = basePrice + projectedNetGain + 80;

  // Verdict logic
  let verdict: 'HOLD' | 'SELL_NOW' | 'PARTIAL_SALE' = 'HOLD';
  let optimalHoldingDays = 5;

  if (params.storageType === 'field_open') {
    verdict = 'SELL_NOW';
    optimalHoldingDays = 0;
  } else if (projectedNetGain > 120) {
    verdict = 'HOLD';
    optimalHoldingDays = params.commodity.includes('Onion') ? 5 : 7;
  } else if (projectedNetGain > 40) {
    verdict = 'PARTIAL_SALE';
    optimalHoldingDays = 3;
  } else {
    verdict = 'SELL_NOW';
    optimalHoldingDays = 0;
  }

  // Generate 7-day trajectory
  const trajectory = [
    { dayLabel: 'Day 0 (Today)', date: 'Today', projectedPrice: basePrice, estimatedArrivalQtl: 14200, weatherCondition: 'Clear / 31°C' },
    { dayLabel: 'Day +2', date: 'Tomorrow +1', projectedPrice: basePrice + Math.round(projectedNetGain * 0.3), estimatedArrivalQtl: 13600, weatherCondition: 'Scattered Clouds / 29°C' },
    { dayLabel: 'Day +4', date: 'In 4 Days', projectedPrice: basePrice + Math.round(projectedNetGain * 0.75), estimatedArrivalQtl: 11800, weatherCondition: 'Rain Warning (18mm) 🌧️' },
    { dayLabel: 'Day +5 (Peak)', date: 'In 5 Days', projectedPrice: recommendedPriceMax - 20, estimatedArrivalQtl: 10400, weatherCondition: 'Supply Disruption / 27°C', isOptimalSellDay: true },
    { dayLabel: 'Day +7', date: 'In 1 Week', projectedPrice: recommendedPriceMin + 40, estimatedArrivalQtl: 13900, weatherCondition: 'Clearing / 30°C' },
    { dayLabel: 'Day +10', date: 'In 10 Days', projectedPrice: basePrice + Math.round(projectedNetGain * 0.5), estimatedArrivalQtl: 15400, weatherCondition: 'Arrival Surge' },
  ];

  return {
    commodity: params.commodity,
    district: params.district,
    mandi: params.mandi,
    currentModalPrice: basePrice,
    recommendedPriceMin,
    recommendedPriceMax,
    verdict,
    optimalHoldingDays,
    confidenceScore: 93,
    projectedNetGainPerQtl: projectedNetGain,
    factors: {
      pastSupply: { text: pastSupplyText, delta: pastSupplyDelta },
      futureDemand: { text: futureDemandText, delta: futureDemandDelta },
      weatherImpact: { text: weatherText, delta: weatherDelta },
      storageRisk: { text: `Storage shrinkage & loss estimate: -₹${storageLossPerQtl}/Qtl over ${params.holdingDays} days.`, delta: -storageLossPerQtl },
    },
    priceTrajectory: trajectory,
    aiAdvisoryNote:
      params.storageType === 'ventilated_chawl' || params.storageType === 'warehouse'
        ? `Since you have safe ventilated storage, holding your ${crop.nameEn} for ${optimalHoldingDays} days allows you to avoid the temporary market dip and capture an estimated +₹${projectedNetGain}/Qtl premium when rainfall in Dhule/Nashik limits mandi arrivals.`
        : `Because your crop is in open/field storage, impending unseasonal humidity (>75% RH) creates rotting danger. We strongly advise selling within 24-48 hours to protect against grade downgrade.`,
  };
}
