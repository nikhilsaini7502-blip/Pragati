import { Router } from "express";

export const marketRouter = Router();

const liveMandiPrices = [
  {
    id: "MP-101",
    commodity: "Nashik Red Onion",
    mandi: "Lasalgaon APMC",
    district: "Nashik",
    minPrice: 1950,
    maxPrice: 2850,
    modalPrice: 2450,
    change: +120,
    trend: "up",
    arrivalVolume: "14,800 Quintals",
    variety: "Garva (Export Grade)",
    date: "Today, 11:30 AM",
  },
  {
    id: "MP-102",
    commodity: "Nashik Red Onion",
    mandi: "Pimpalgaon Baswant APMC",
    district: "Nashik",
    minPrice: 2050,
    maxPrice: 2920,
    modalPrice: 2520,
    change: +180,
    trend: "up",
    arrivalVolume: "18,200 Quintals",
    variety: "Garva Red (55mm+)",
    date: "Today, 11:45 AM",
  },
  {
    id: "MP-103",
    commodity: "Sharbati Wheat",
    mandi: "Kalyan APMC",
    district: "Thane",
    minPrice: 2600,
    maxPrice: 3100,
    modalPrice: 2850,
    change: +50,
    trend: "up",
    arrivalVolume: "3,400 Quintals",
    variety: "C-306 Sharbati",
    date: "Today, 10:15 AM",
  },
  {
    id: "MP-104",
    commodity: "Bt Cotton",
    mandi: "Jalgaon APMC",
    district: "Jalgaon",
    minPrice: 6800,
    maxPrice: 7650,
    modalPrice: 7250,
    change: -90,
    trend: "down",
    arrivalVolume: "5,800 Quintals",
    variety: "Long Staple 29mm",
    date: "Today, 09:30 AM",
  },
  {
    id: "MP-105",
    commodity: "Soybean",
    mandi: "Latur APMC",
    district: "Latur",
    minPrice: 4200,
    maxPrice: 4850,
    modalPrice: 4550,
    change: 0,
    trend: "stable",
    arrivalVolume: "11,500 Quintals",
    variety: "Yellow Bold (JS-335)",
    date: "Today, 10:00 AM",
  },
];

marketRouter.get("/", (_req, res) => {
  return res.json({
    success: true,
    count: liveMandiPrices.length,
    markets: liveMandiPrices,
  });
});

marketRouter.get("/price-suggest", (req, res) => {
  const { commodity = "onion", mandi = "Lasalgaon" } = req.query;

  const suggestion = {
    commodity: "Nashik Red Onion",
    mandi: "Lasalgaon APMC",
    currentModalPrice: 2450,
    recommendedPriceMin: 2750,
    recommendedPriceMax: 2950,
    verdict: "HOLD",
    optimalHoldingDays: 8,
    confidenceScore: 92,
    projectedNetGainPerQtl: 380,
    factors: {
      pastSupply: { text: "Arrivals fell 18% over the last 48 hours due to unseasonal rains.", delta: +120 },
      futureDemand: { text: "Diwali pre-orders from southern retail chains ramping up.", delta: +180 },
      weatherImpact: { text: "Cloudy weather with high humidity; ensure chawl aeration.", delta: -20 },
      storageRisk: { text: "Low moisture batch allows safe 30-day holding in ventilated chawl.", delta: +100 },
    },
    priceTrajectory: [
      { dayLabel: "Today", date: "Day 0", projectedPrice: 2450, estimatedArrivalQtl: 14800, weatherCondition: "Sunny" },
      { dayLabel: "+2 Days", date: "Day 2", projectedPrice: 2580, estimatedArrivalQtl: 13200, weatherCondition: "Clear" },
      { dayLabel: "+5 Days", date: "Day 5", projectedPrice: 2720, estimatedArrivalQtl: 11500, weatherCondition: "Partly Cloudy" },
      { dayLabel: "+8 Days", date: "Day 8", projectedPrice: 2880, estimatedArrivalQtl: 9800, weatherCondition: "Optimal", isOptimalSellDay: true },
      { dayLabel: "+12 Days", date: "Day 12", projectedPrice: 2810, estimatedArrivalQtl: 15400, weatherCondition: "Showers" },
    ],
    aiAdvisoryNote:
      "Recommendation: HOLD this lot for 7-9 days. Expected net realization gain of +₹380/Quintal after deducting storage depreciation.",
  };

  return res.json({ success: true, suggestion });
});
