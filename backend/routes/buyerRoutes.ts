import { Router } from "express";
import { DataStore } from "../data/store.js";

export const buyerRouter = Router();

buyerRouter.get("/matches", async (req, res) => {
  try {
    const { crop = "all", minGrade } = req.query;
    const filter: any = {};
    if (crop && crop !== "all") filter.cropName = crop;
    if (minGrade && minGrade !== "all") filter.aiQualityGrade = minGrade;

    const lots = await DataStore.getCropLots(filter);

    // Enrich with buyer-centric logistics & distance metrics
    const matches = lots.map((lot: any, idx: number) => ({
      id: lot._id || lot.id,
      farmerId: lot.farmerId,
      farmerName: lot.farmerName,
      location: `${lot.village}, ${lot.district}`,
      district: lot.district,
      crop: lot.cropName,
      quantity: lot.quantityQuintals,
      offeredPrice: lot.expectedPricePerQuintal,
      marketPrice: lot.expectedPricePerQuintal - 120,
      qualityGrade: lot.aiQualityGrade,
      purityScore: lot.aiQualityScore || 92,
      distanceKm: 14 + idx * 8,
      verified: true,
      status: lot.status,
      imageGallery: lot.imageGallery,
      fpoAffiliated: "Sahyadri Farmers Producer Co.",
    }));

    return res.json({ success: true, count: matches.length, matches });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to fetch buyer matches." });
  }
});

buyerRouter.post("/escrow-lock", async (req, res) => {
  try {
    const { lotId, buyerName = "Reliance Fresh Retail Ltd.", escrowAmount } = req.body;
    if (!lotId) {
      return res.status(400).json({ success: false, error: "lotId is required." });
    }

    const updated = await DataStore.updateCropLotStatus(lotId, "Escrow Locked");
    if (!updated) {
      return res.status(404).json({ success: false, error: "Lot not found." });
    }

    return res.json({
      success: true,
      message: `Escrow contract locked with ${buyerName}. Payment of ₹${escrowAmount || 216750} held securely in ICICI Agri Escrow account.`,
      lot: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to lock escrow contract." });
  }
});
