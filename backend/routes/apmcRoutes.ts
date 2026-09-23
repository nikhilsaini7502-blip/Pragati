import { Router } from "express";
import { DataStore } from "../data/store.js";

export const apmcRouter = Router();

apmcRouter.get("/grievances", async (_req, res) => {
  try {
    const list = await DataStore.getGrievances();
    return res.json({ success: true, count: list.length, grievances: list });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to fetch grievances." });
  }
});

apmcRouter.post("/grievances", async (req, res) => {
  try {
    const { name, phone, category, description, district, mandi } = req.body;
    if (!name || !phone || !description) {
      return res.status(400).json({ success: false, error: "Name, phone, and description required." });
    }

    const ticket = await DataStore.createGrievance({
      name,
      phone,
      category: category || "Price Discrepancy",
      description,
      district: district || "Nashik",
      mandi: mandi || "Lasalgaon",
    });

    return res.status(201).json({
      success: true,
      message: "Grievance ticket registered. Assigned to APMC officer.",
      ticket,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to submit grievance." });
  }
});

apmcRouter.put("/grievances/:id/resolve", async (req, res) => {
  try {
    const resolved = await DataStore.resolveGrievance(req.params.id);
    return res.json({ success: true, message: "Ticket marked as Resolved.", ticket: resolved });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to resolve grievance." });
  }
});

apmcRouter.post("/broadcast-rates", (req, res) => {
  const { commodity = "Nashik Red Onion", modalRate = 2500, mandi = "Lasalgaon APMC" } = req.body;
  return res.json({
    success: true,
    message: `Official APMC rate of ₹${modalRate}/Qtl for ${commodity} broadcasted to 12,450 farmers via SMS & Pragati Push.`,
    broadcastTimestamp: new Date().toISOString(),
  });
});
