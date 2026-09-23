import mongoose, { Schema, Document } from "mongoose";

// ================= USER MODEL =================
export interface IUser extends Document {
  phone: string;
  name: string;
  email?: string;
  passwordHash: string;
  role: "farmer" | "buyer" | "apmc" | "fpo" | "admin";
  district: string;
  state: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    phone: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, sparse: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["farmer", "buyer", "apmc", "fpo", "admin"],
      default: "farmer",
      index: true,
    },
    district: { type: String, default: "Nashik", index: true },
    state: { type: String, default: "Maharashtra" },
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

// ================= FARMER PROFILE MODEL =================
export interface IFarmer extends Document {
  userId: mongoose.Types.ObjectId | string;
  farmName: string;
  landArea: number; // in acres
  landUnit: string;
  village: string;
  district: string;
  state: string;
  cropsGrown: string[];
  preferredMarkets: string[];
  verificationStatus: "Verified" | "Pending" | "Rejected";
}

const FarmerSchema = new Schema<IFarmer>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    farmName: { type: String, default: "Krishi Farm" },
    landArea: { type: Number, default: 4.5 },
    landUnit: { type: String, default: "Acres" },
    village: { type: String, required: true },
    district: { type: String, required: true, index: true },
    state: { type: String, default: "Maharashtra" },
    cropsGrown: [{ type: String }],
    preferredMarkets: [{ type: String }],
    verificationStatus: { type: String, enum: ["Verified", "Pending", "Rejected"], default: "Verified" },
  },
  { timestamps: true }
);

// ================= BUYER PROFILE MODEL =================
export interface IBuyer extends Document {
  userId: mongoose.Types.ObjectId | string;
  businessName: string;
  buyerType: "Corporate Retailer" | "Processor / Exporter" | "Mandi Trader" | "FPO Aggregator";
  district: string;
  state: string;
  requiredCrops: string[];
  requiredQuantityMonthlyQtl: number;
  preferredQuality: string;
  verificationStatus: "Verified" | "Pending";
}

const BuyerSchema = new Schema<IBuyer>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    businessName: { type: String, required: true },
    buyerType: { type: String, default: "Corporate Retailer" },
    district: { type: String, required: true, index: true },
    state: { type: String, default: "Maharashtra" },
    requiredCrops: [{ type: String }],
    requiredQuantityMonthlyQtl: { type: Number, default: 500 },
    preferredQuality: { type: String, default: "Grade A / A+" },
    verificationStatus: { type: String, default: "Verified" },
  },
  { timestamps: true }
);

// ================= CROP LOT MODEL =================
export interface ICropLot extends Document {
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  village: string;
  district: string;
  cropName: string;
  variety: string;
  quantityQuintals: number;
  expectedPricePerQuintal: number;
  harvestDate: string;
  aiQualityGrade: string;
  aiQualityScore: number;
  authenticityScore: number;
  imageGallery: string[];
  status: "Listed" | "Negotiating" | "Escrow Locked" | "In Transit" | "Completed";
  createdAt: Date;
}

const CropLotSchema = new Schema<ICropLot>(
  {
    farmerId: { type: String, required: true, index: true },
    farmerName: { type: String, required: true },
    farmerPhone: { type: String, required: true },
    village: { type: String, default: "Pimpalgaon Baswant" },
    district: { type: String, default: "Nashik", index: true },
    cropName: { type: String, required: true, index: true },
    variety: { type: String, default: "Garva Variety" },
    quantityQuintals: { type: Number, required: true },
    expectedPricePerQuintal: { type: Number, required: true },
    harvestDate: { type: String, default: "Recent" },
    aiQualityGrade: { type: String, default: "Grade A", index: true },
    aiQualityScore: { type: Number, default: 92 },
    authenticityScore: { type: Number, default: 95 },
    imageGallery: [{ type: String }],
    status: {
      type: String,
      enum: ["Listed", "Negotiating", "Escrow Locked", "In Transit", "Completed"],
      default: "Listed",
      index: true,
    },
  },
  { timestamps: true }
);

// ================= CROP AI SCAN HISTORY MODEL =================
export interface ICropScan extends Document {
  farmerId: string;
  cropLotId?: string;
  imageUrl?: string;
  isCropDetected: boolean;
  detectedCrop: string;
  cropConfidence: number;
  qualityGrade: string;
  purityScore: number;
  qualityConfidence: number;
  authenticity: {
    status: "likely_real" | "suspicious" | "likely_screenshot" | "likely_artificial";
    confidence: number;
    reasons: string[];
  };
  moisture: string;
  uniformity: string;
  defects: string;
  shelfLife: string;
  mspBonus: string;
  findings: string;
  recommendation: string;
  modelVersion: string;
  processingTimeMs: number;
  source: string;
  createdAt: Date;
}

const CropScanSchema = new Schema<ICropScan>(
  {
    farmerId: { type: String, required: true, index: true },
    cropLotId: { type: String, index: true },
    imageUrl: { type: String },
    isCropDetected: { type: Boolean, required: true, index: true },
    detectedCrop: { type: String, required: true },
    cropConfidence: { type: Number, default: 0.9 },
    qualityGrade: { type: String, required: true },
    purityScore: { type: Number, required: true },
    qualityConfidence: { type: Number, default: 0.88 },
    authenticity: {
      status: { type: String, default: "likely_real" },
      confidence: { type: Number, default: 0.9 },
      reasons: [{ type: String }],
    },
    moisture: { type: String, default: "11.2%" },
    uniformity: { type: String, default: "92%" },
    defects: { type: String, default: "1.5%" },
    shelfLife: { type: String, default: "45-60 Days" },
    mspBonus: { type: String, default: "+₹210 / Quintal" },
    findings: { type: String },
    recommendation: { type: String },
    modelVersion: { type: String, default: "pragati-vision-v3.6" },
    processingTimeMs: { type: Number, default: 1200 },
    source: { type: String, default: "gemini-3.8-flash" },
  },
  { timestamps: true }
);

// ================= PEST & DISEASE SCAN MODEL =================
export interface IPestScan extends Document {
  farmerId: string;
  imageUrl?: string;
  isCropDetected: boolean;
  diseaseName: string;
  pestName?: string;
  confidence: "High" | "Medium" | "Low";
  severity: "Mild" | "Moderate" | "Severe";
  identificationDetails: string;
  homeRemedy: string;
  chemicalCure: string;
  modelVersion: string;
  processingTimeMs: number;
  createdAt: Date;
}

const PestScanSchema = new Schema<IPestScan>(
  {
    farmerId: { type: String, required: true, index: true },
    imageUrl: { type: String },
    isCropDetected: { type: Boolean, required: true },
    diseaseName: { type: String, required: true },
    pestName: { type: String },
    confidence: { type: String, default: "High" },
    severity: { type: String, default: "Moderate" },
    identificationDetails: { type: String },
    homeRemedy: { type: String },
    chemicalCure: { type: String },
    modelVersion: { type: String, default: "pragati-pest-v3.6" },
    processingTimeMs: { type: Number, default: 950 },
  },
  { timestamps: true }
);

// ================= GRIEVANCE MODEL =================
export interface IGrievance extends Document {
  name: string;
  phone: string;
  category: string;
  description: string;
  district: string;
  mandi: string;
  status: "Submitted" | "In Review" | "Resolved";
  createdAt: Date;
}

const GrievanceSchema = new Schema<IGrievance>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    district: { type: String, default: "Nashik" },
    mandi: { type: String, default: "Lasalgaon" },
    status: { type: String, enum: ["Submitted", "In Review", "Resolved"], default: "Submitted" },
  },
  { timestamps: true }
);

// Register Mongoose models or reuse existing
export const UserModel = (mongoose.models.User || mongoose.model<IUser>("User", UserSchema)) as mongoose.Model<IUser>;
export const FarmerModel = (mongoose.models.Farmer || mongoose.model<IFarmer>("Farmer", FarmerSchema)) as mongoose.Model<IFarmer>;
export const BuyerModel = (mongoose.models.Buyer || mongoose.model<IBuyer>("Buyer", BuyerSchema)) as mongoose.Model<IBuyer>;
export const CropLotModel = (mongoose.models.CropLot || mongoose.model<ICropLot>("CropLot", CropLotSchema)) as mongoose.Model<ICropLot>;
export const CropScanModel = (mongoose.models.CropScan || mongoose.model<ICropScan>("CropScan", CropScanSchema)) as mongoose.Model<ICropScan>;
export const PestScanModel = (mongoose.models.PestScan || mongoose.model<IPestScan>("PestScan", PestScanSchema)) as mongoose.Model<IPestScan>;
export const GrievanceModel = (mongoose.models.Grievance || mongoose.model<IGrievance>("Grievance", GrievanceSchema)) as mongoose.Model<IGrievance>;
