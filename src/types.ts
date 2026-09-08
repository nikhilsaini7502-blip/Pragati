export type Language = 'en' | 'mr' | 'hi';

export type UserRole = 'landing' | 'farmer' | 'buyer' | 'fpo' | 'admin';

export interface CropPrice {
  id: string;
  commodity: string;
  commodityLocal: {
    mr: string;
    hi: string;
  };
  mandi: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  change: number; // in rupees
  trend: 'up' | 'down' | 'stable';
  arrivalVolume: string; // e.g. "4,200 Quintals"
  variety: string;
  date: string;
}

export interface FarmerLot {
  id: string;
  farmerName: string;
  farmerPhone: string;
  village: string;
  district: string;
  commodity: string;
  variety: string;
  quantityQuintals: number;
  expectedPricePerQuintal: number;
  harvestDate: string;
  aiQualityGrade: 'A+' | 'A' | 'B' | 'Pending' | string;
  aiQualityScore?: number; // e.g. 94%
  imageGallery?: string[]; // Optional array of base64 image strings
  aiQualityMetrics?: {
    sizeUniformity: number; // percentage
    moistureContent: number; // percentage
    blemishRate: number; // percentage
    shelfLifeDays: number;
  };
  status: 'Listed' | 'Negotiating' | 'Escrow Locked' | 'In Transit' | 'Completed';
  verifiedFarmer: boolean;
  imageUrl?: string;
}

export interface BuyerMatch {
  id: string;
  farmerName: string;
  farmerId: string;
  location: string;
  district: string;
  crop: string;
  quantity: number;
  offeredPrice: number;
  marketPrice: number;
  qualityGrade: string;
  distanceKm: number;
  verified: boolean;
  avatar: string;
  fpoAffiliated?: string;
  imageGallery?: string[];
}

export interface LogisticsStep {
  title: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
  iconName: string;
  details: string;
}

export interface GrievanceTicket {
  id: string;
  name: string;
  phone: string;
  category: 'Price Discrepancy' | 'Mandi Weighment Delay' | 'Escrow Payment Hold' | 'Quality Dispute' | 'Transportation Delay';
  description: string;
  district: string;
  mandi: string;
  status: 'Submitted' | 'In Review' | 'Resolved';
  createdAt: string;
}

export interface PriceAlertSubscription {
  id: string;
  district: string;
  commodity: string;
  mandi: string;
  phone: string;
  channels: {
    sms: boolean;
    push: boolean;
    whatsapp: boolean;
  };
  triggerType: 'spike' | 'dip' | 'crosses_above' | 'daily_bell';
  thresholdValue: number; // e.g., 5 (%) or 2400 (₹)
  active: boolean;
  createdAt: string;
  lastTriggered?: string;
  lastAlertMessage?: string;
}

export interface PriceSuggestionResult {
  commodity: string;
  district: string;
  mandi: string;
  currentModalPrice: number;
  recommendedPriceMin: number;
  recommendedPriceMax: number;
  verdict: 'HOLD' | 'SELL_NOW' | 'PARTIAL_SALE';
  optimalHoldingDays: number;
  confidenceScore: number;
  projectedNetGainPerQtl: number;
  factors: {
    pastSupply: { text: string; delta: number };
    futureDemand: { text: string; delta: number };
    weatherImpact: { text: string; delta: number };
    storageRisk: { text: string; delta: number };
  };
  priceTrajectory: Array<{
    dayLabel: string;
    date: string;
    projectedPrice: number;
    estimatedArrivalQtl: number;
    weatherCondition: string;
    isOptimalSellDay?: boolean;
  }>;
  aiAdvisoryNote: string;
}

