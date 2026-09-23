import { Router } from "express";
import { DataStore } from "../data/store.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

export const cropRouter = Router();

// GET all crops with optional query filters
cropRouter.get("/", async (req, res) => {
  try {
    const { farmerId, cropName, grade } = req.query;
    const filter: any = {};
    if (farmerId) filter.farmerId = farmerId;
    if (cropName && cropName !== "all") filter.cropName = cropName;
    if (grade && grade !== "all") filter.aiQualityGrade = grade;

    const lots = await DataStore.getCropLots(filter);
    return res.json({ success: true, count: lots.length, lots });
  } catch (error) {
    console.error("Fetch crops error:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch crops." });
  }
});

// POST register a new crop lot
cropRouter.post("/", async (req: AuthRequest, res) => {
  try {
    const {
      cropName,
      variety = "Standard Variety",
      quantityQuintals,
      expectedPricePerQuintal,
      harvestDate = "Today",
      aiQualityGrade = "Grade A",
      aiQualityScore = 90,
      authenticityScore = 95,
      imageGallery = [],
      farmerName = "Rameshwar Patil",
      farmerPhone = "+91 98221 44521",
      village = "Pimpalgaon Baswant",
      district = "Nashik",
      farmerId = req.user?.id || "USR-FARMER-1",
    } = req.body;

    if (!cropName || !quantityQuintals || !expectedPricePerQuintal) {
      return res.status(400).json({
        success: false,
        error: "Crop name, quantity, and expected price are required.",
      });
    }

    const newLot = await DataStore.createCropLot({
      farmerId,
      farmerName,
      farmerPhone,
      village,
      district,
      cropName,
      variety,
      quantityQuintals: Number(quantityQuintals),
      expectedPricePerQuintal: Number(expectedPricePerQuintal),
      harvestDate,
      aiQualityGrade,
      aiQualityScore: Number(aiQualityScore),
      authenticityScore: Number(authenticityScore),
      imageGallery,
      status: "Listed",
    });

    return res.status(201).json({
      success: true,
      message: "Crop lot listed successfully on Pragati Exchange.",
      lot: newLot,
    });
  } catch (error) {
    console.error("Create crop error:", error);
    return res.status(500).json({ success: false, error: "Failed to register crop lot." });
  }
});

// PUT update status (e.g. Escrow Locked, In Transit)
cropRouter.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, error: "Status is required." });
    }

    const updated = await DataStore.updateCropLotStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, error: "Crop lot not found." });
    }

    return res.json({ success: true, message: "Status updated.", lot: updated });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to update crop status." });
  }
});
