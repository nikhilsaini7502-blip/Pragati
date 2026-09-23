import { Router } from "express";
import { analyzeCropQuality } from "../services/cropAiService.js";
import { DataStore } from "../data/store.js";

export const scanRouter = Router();

// POST run AI crop vision scan
scanRouter.post("/", async (req, res) => {
  try {
    const { imageBase64, farmerId, cropLotId, cropHint, mimeType } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ success: false, error: "Image data (imageBase64) is required." });
    }

    const scanResult = await analyzeCropQuality({
      imageBase64,
      farmerId: farmerId || "USR-FARMER-1",
      cropLotId,
      cropHint: cropHint || "",
      mimeType,
    });

    return res.json(scanResult);
  } catch (error) {
    console.error("Scan API error:", error);
    return res.status(500).json({
      success: false,
      error: "AI quality scan failed. Please check network and try again.",
    });
  }
});

// GET scan history for farmer
scanRouter.get("/:farmerId", async (req, res) => {
  try {
    const { farmerId } = req.params;
    const history = await DataStore.getCropScansByFarmer(farmerId);
    return res.json({ success: true, count: history.length, history });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to fetch scan history." });
  }
});
