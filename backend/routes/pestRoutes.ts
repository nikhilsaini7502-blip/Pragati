import { Router } from "express";
import { diagnoseCropPest } from "../services/pestAiService.js";
import { DataStore } from "../data/store.js";

export const pestRouter = Router();

// POST run fast pest & disease diagnosis
pestRouter.post("/", async (req, res) => {
  try {
    const { imageBase64, summary, language, farmerId } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ success: false, error: "Image data (imageBase64) is required." });
    }

    const diagnosis = await diagnoseCropPest({
      imageBase64,
      summary: summary || "",
      language: language || "en",
      farmerId: farmerId || "USR-FARMER-1",
    });

    return res.json(diagnosis);
  } catch (error) {
    console.error("Pest diagnosis route error:", error);
    return res.status(500).json({
      success: false,
      error: "Pest diagnosis failed. Please retry.",
    });
  }
});

// GET pest scan history for farmer
pestRouter.get("/:farmerId", async (req, res) => {
  try {
    const { farmerId } = req.params;
    const history = await DataStore.getPestScansByFarmer(farmerId);
    return res.json({ success: true, count: history.length, history });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to fetch pest scan history." });
  }
});
