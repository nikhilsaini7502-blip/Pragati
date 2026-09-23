import {
  UserModel,
  FarmerModel,
  BuyerModel,
  CropLotModel,
  CropScanModel,
  PestScanModel,
  GrievanceModel,
  ICropLot,
  ICropScan,
  IPestScan,
  IUser,
} from "../models/index.js";
import { isDbConnected } from "../config/db.js";

// In-Memory store for offline resilience & hackathon testing
const memoryUsers: any[] = [
  {
    _id: "USR-FARMER-1",
    name: "Rameshwar Patil",
    phone: "9822144521",
    role: "farmer",
    district: "Nashik",
    state: "Maharashtra",
    passwordHash: "$2a$10$Wq0G131qI6wQkE9e07k.wuxgq/3j988iFh3W51s9J2tH7n.E0qKqG", // password: password123
    createdAt: new Date(),
  },
  {
    _id: "USR-BUYER-1",
    name: "Vikram Singhania",
    phone: "9823099112",
    role: "buyer",
    district: "Mumbai Suburban",
    state: "Maharashtra",
    passwordHash: "$2a$10$Wq0G131qI6wQkE9e07k.wuxgq/3j988iFh3W51s9J2tH7n.E0qKqG",
    createdAt: new Date(),
  },
  {
    _id: "USR-APMC-1",
    name: "Lasalgaon Mandi Secretary",
    phone: "9822011223",
    role: "apmc",
    district: "Nashik",
    state: "Maharashtra",
    passwordHash: "$2a$10$Wq0G131qI6wQkE9e07k.wuxgq/3j988iFh3W51s9J2tH7n.E0qKqG",
    createdAt: new Date(),
  },
];

const memoryLots: any[] = [
  {
    _id: "LOT-MH-401",
    farmerId: "USR-FARMER-1",
    farmerName: "Rameshwar Patil",
    farmerPhone: "+91 98221 44521",
    village: "Pimpalgaon Baswant",
    district: "Nashik",
    cropName: "Nashik Red Onion",
    variety: "Garva Variety",
    quantityQuintals: 85,
    expectedPricePerQuintal: 2550,
    harvestDate: "2 Days Ago",
    aiQualityGrade: "Grade A+",
    aiQualityScore: 96,
    authenticityScore: 98,
    status: "Listed",
    imageGallery: [
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
    ],
    createdAt: new Date(),
  },
  {
    _id: "LOT-MH-402",
    farmerId: "USR-FARMER-1",
    farmerName: "Rameshwar Patil",
    farmerPhone: "+91 98221 44521",
    village: "Pimpalgaon Baswant",
    district: "Nashik",
    cropName: "Sharbati Wheat",
    variety: "Golden Grain C-306",
    quantityQuintals: 140,
    expectedPricePerQuintal: 2820,
    harvestDate: "Last Week",
    aiQualityGrade: "Grade A",
    aiQualityScore: 91,
    authenticityScore: 94,
    status: "Listed",
    imageGallery: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
    ],
    createdAt: new Date(),
  },
];

const memoryCropScans: any[] = [];
const memoryPestScans: any[] = [];
const memoryGrievances: any[] = [];

// ================= DATA REPOSITORY INTERFACE =================
export const DataStore = {
  // --- User Operations ---
  async findUserByPhone(phone: string) {
    if (isDbConnected()) {
      try {
        return await UserModel.findOne({ phone });
      } catch (err) {
        console.warn("DB findUserByPhone error, using memory fallback");
      }
    }
    return memoryUsers.find((u) => u.phone === phone) || null;
  },

  async createUser(userData: any) {
    if (isDbConnected()) {
      try {
        const user = new UserModel(userData);
        return await user.save();
      } catch (err) {
        console.warn("DB createUser error, using memory fallback");
      }
    }
    const newUser = {
      _id: `USR-${Date.now()}`,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryUsers.push(newUser);
    return newUser;
  },

  async findUserById(id: string) {
    if (isDbConnected()) {
      try {
        return await UserModel.findById(id);
      } catch (err) {
        console.warn("DB findUserById error, using memory fallback");
      }
    }
    return memoryUsers.find((u) => u._id === id || u.id === id) || null;
  },

  // --- Crop Lot Operations ---
  async getCropLots(filter: any = {}) {
    if (isDbConnected()) {
      try {
        return await CropLotModel.find(filter).sort({ createdAt: -1 });
      } catch (err) {
        console.warn("DB getCropLots error, using memory fallback");
      }
    }
    let res = [...memoryLots];
    if (filter.farmerId) {
      res = res.filter((l) => l.farmerId === filter.farmerId);
    }
    if (filter.cropName && filter.cropName !== "all") {
      res = res.filter((l) => l.cropName.toLowerCase().includes(filter.cropName.toLowerCase()));
    }
    return res;
  },

  async createCropLot(lotData: any) {
    if (isDbConnected()) {
      try {
        const lot = new CropLotModel(lotData);
        return await lot.save();
      } catch (err) {
        console.warn("DB createCropLot error, using memory fallback");
      }
    }
    const newLot = {
      _id: `LOT-MH-${Math.floor(500 + Math.random() * 400)}`,
      ...lotData,
      createdAt: new Date(),
    };
    memoryLots.unshift(newLot);
    return newLot;
  },

  async updateCropLotStatus(id: string, status: string) {
    if (isDbConnected()) {
      try {
        return await CropLotModel.findByIdAndUpdate(id, { status }, { new: true });
      } catch (err) {
        console.warn("DB updateCropLotStatus error, using memory fallback");
      }
    }
    const lot = memoryLots.find((l) => l._id === id || l.id === id);
    if (lot) {
      lot.status = status;
    }
    return lot;
  },

  // --- Crop Scan Operations ---
  async saveCropScan(scanData: any) {
    if (isDbConnected()) {
      try {
        const scan = new CropScanModel(scanData);
        return await scan.save();
      } catch (err) {
        console.warn("DB saveCropScan error, using memory fallback");
      }
    }
    const newScan = {
      _id: `SCAN-${Date.now()}`,
      ...scanData,
      createdAt: new Date(),
    };
    memoryCropScans.unshift(newScan);
    return newScan;
  },

  async getCropScansByFarmer(farmerId: string) {
    if (isDbConnected()) {
      try {
        return await CropScanModel.find({ farmerId }).sort({ createdAt: -1 });
      } catch (err) {
        console.warn("DB getCropScans error, using memory fallback");
      }
    }
    return memoryCropScans.filter((s) => s.farmerId === farmerId);
  },

  // --- Pest Scan Operations ---
  async savePestScan(scanData: any) {
    if (isDbConnected()) {
      try {
        const scan = new PestScanModel(scanData);
        return await scan.save();
      } catch (err) {
        console.warn("DB savePestScan error, using memory fallback");
      }
    }
    const newScan = {
      _id: `PEST-${Date.now()}`,
      ...scanData,
      createdAt: new Date(),
    };
    memoryPestScans.unshift(newScan);
    return newScan;
  },

  async getPestScansByFarmer(farmerId: string) {
    if (isDbConnected()) {
      try {
        return await PestScanModel.find({ farmerId }).sort({ createdAt: -1 });
      } catch (err) {
        console.warn("DB getPestScans error, using memory fallback");
      }
    }
    return memoryPestScans.filter((s) => s.farmerId === farmerId);
  },

  // --- Grievance Operations ---
  async createGrievance(data: any) {
    if (isDbConnected()) {
      try {
        const g = new GrievanceModel(data);
        return await g.save();
      } catch (err) {
        console.warn("DB createGrievance error, using memory fallback");
      }
    }
    const newGrievance = {
      _id: `GRV-${Math.floor(1000 + Math.random() * 9000)}`,
      ...data,
      status: "Submitted",
      createdAt: new Date(),
    };
    memoryGrievances.unshift(newGrievance);
    return newGrievance;
  },

  async getGrievances() {
    if (isDbConnected()) {
      try {
        return await GrievanceModel.find().sort({ createdAt: -1 });
      } catch (err) {
        console.warn("DB getGrievances error, using memory fallback");
      }
    }
    return memoryGrievances;
  },

  async resolveGrievance(id: string) {
    if (isDbConnected()) {
      try {
        return await GrievanceModel.findByIdAndUpdate(id, { status: "Resolved" }, { new: true });
      } catch (err) {
        console.warn("DB resolveGrievance error, using memory fallback");
      }
    }
    const g = memoryGrievances.find((item) => item._id === id);
    if (g) {
      g.status = "Resolved";
    }
    return g;
  },
};
