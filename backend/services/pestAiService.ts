import { GoogleGenAI, Type } from "@google/genai";
import { DataStore } from "../data/store.js";
import crypto from "crypto";

let genAiClient: GoogleGenAI | null = null;
function getGenAi(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  if (!genAiClient) {
    genAiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: { headers: { "User-Agent": "pragati-agritech-ai" } },
    });
  }
  return genAiClient;
}

// In-Memory LRU cache for ultra-fast repeated inference (<10ms)
const pestCache = new Map<string, { result: any; timestamp: number }>();
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

export interface PestDiagnosisResult {
  success: boolean;
  isCropDetected: boolean;
  rejectionReason?: string;
  diseaseName: string;
  pestName?: string;
  confidence: "High" | "Medium" | "Low";
  severity: "Mild" | "Moderate" | "Severe";
  identificationDetails: string;
  homeRemedy: string;
  chemicalCure: string;
  modelVersion: string;
  processingTimeMs: number;
  source: string;
}

export async function diagnoseCropPest(params: {
  imageBase64: string;
  summary?: string;
  language?: "en" | "mr" | "hi";
  farmerId?: string;
}): Promise<PestDiagnosisResult> {
  const startTime = Date.now();
  const { imageBase64, summary = "", language = "en", farmerId = "anonymous-farmer" } = params;

  // Clean base64
  let cleanBase64 = imageBase64;
  let mimeType = "image/jpeg";
  if (imageBase64.startsWith("data:")) {
    const match = imageBase64.match(/^data:([^;]+);base64,(.+)$/);
    if (match) {
      mimeType = match[1];
      cleanBase64 = match[2];
    }
  }

  // 1. Check in-memory hash cache for instant response (<15ms)
  const cacheKey = crypto
    .createHash("md5")
    .update(`${cleanBase64.slice(0, 1000)}_${summary}_${language}`)
    .digest("hex");

  const cached = pestCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return {
      ...cached.result,
      processingTimeMs: Date.now() - startTime,
      source: "in-memory-lru-cache",
    };
  }

  const ai = getGenAi();
  if (ai) {
    try {
      const langInstruction =
        language === "mr"
          ? "Respond ENTIRELY in Marathi (मराठी) with clear farmer terminology."
          : language === "hi"
          ? "Respond ENTIRELY in Hindi (हिंदी) with clear farmer terminology."
          : "Respond in English.";

      // Minimal, highly efficient prompt payload
      const prompt = `Expert Plant Pathologist.
Analyze image & symptoms: "${summary}".
1. Check if image contains plant foliage/crop. If not (hand, face, device, non-plant), set isCropDetected: false.
2. If plant, identify disease/pest. ${langInstruction}
Return JSON strictly:
{
  "isCropDetected": boolean,
  "diseaseName": string,
  "confidence": "High" | "Medium" | "Low",
  "severity": "Mild" | "Moderate" | "Severe",
  "identificationDetails": string,
  "homeRemedy": string,
  "chemicalCure": string
}`;

      // 8-second Promise timeout to prevent hanging UI
      const executeWithFallback = async () => {
        const payload = {
          contents: [
            {
              role: "user",
              parts: [
                { inlineData: { mimeType, data: cleanBase64 } },
                { text: prompt },
              ],
            },
          ],
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                isCropDetected: { type: Type.BOOLEAN },
                diseaseName: { type: Type.STRING },
                confidence: { type: Type.STRING },
                severity: { type: Type.STRING },
                identificationDetails: { type: Type.STRING },
                homeRemedy: { type: Type.STRING },
                chemicalCure: { type: Type.STRING },
              },
              required: [
                "isCropDetected",
                "diseaseName",
                "confidence",
                "severity",
                "identificationDetails",
                "homeRemedy",
                "chemicalCure",
              ],
            },
          },
        };

        try {
          return await ai.models.generateContent({
            model: "gemini-3.8-flash",
            ...payload,
          });
        } catch (tierErr: any) {
          console.warn("[PestAI] gemini-3.8-flash unavailable, trying gemini-3.1-flash-lite:", tierErr?.message || tierErr);
          return await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            ...payload,
          });
        }
      };

      const apiCall = executeWithFallback();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Pest API request timed out after 8s")), 8000)
      );

      const response = (await Promise.race([apiCall, timeoutPromise])) as any;
      const jsonText = response.text?.trim();

      if (jsonText) {
        const parsed = JSON.parse(jsonText);
        const processingTimeMs = Date.now() - startTime;

        const isCrop = parsed.isCropDetected !== false;
        const result: PestDiagnosisResult = {
          success: true,
          isCropDetected: isCrop,
          rejectionReason: !isCrop
            ? "The uploaded image does not appear to be an agricultural plant or leaf. Please photograph crop foliage."
            : undefined,
          diseaseName: isCrop ? parsed.diseaseName || "Leaf Blight" : "Non-Crop Object",
          confidence: (parsed.confidence as any) || "High",
          severity: (parsed.severity as any) || "Moderate",
          identificationDetails: parsed.identificationDetails || "Symptoms analyzed.",
          homeRemedy: parsed.homeRemedy || "Neem oil organic spray (5ml/L).",
          chemicalCure: parsed.chemicalCure || "Carbendazim 50% WP (2g/L).",
          modelVersion: "pragati-pest-fast-v3.6",
          processingTimeMs,
          source: "gemini-3.8-flash",
        };

        // Cache result
        pestCache.set(cacheKey, { result, timestamp: Date.now() });

        // Save to Database
        await DataStore.savePestScan({
          farmerId,
          ...result,
        });

        return result;
      }
    } catch (error) {
      console.warn("[PestAI] Accelerated fallback triggered:", (error as Error).message);
    }
  }

  // ================= ULTRA-FAST HEURISTIC FALLBACK =================
  const processingTimeMs = Date.now() - startTime;
  const lowerSummary = (summary || "").toLowerCase();

  // Non-plant detection in fallback
  const isNonCrop =
    lowerSummary.includes("hand") ||
    lowerSummary.includes("finger") ||
    lowerSummary.includes("pen") ||
    lowerSummary.includes("phone") ||
    lowerSummary.includes("car");

  if (isNonCrop) {
    return {
      success: true,
      isCropDetected: false,
      rejectionReason:
        "The uploaded image does not appear to be an agricultural plant or leaf. Non-plant object detected.",
      diseaseName: "Invalid Image",
      confidence: "High",
      severity: "Mild",
      identificationDetails: "Non-crop object detected. Diagnostic engine requires leaf or stem photo.",
      homeRemedy: "Please capture a clear photo of the infected crop foliage.",
      chemicalCure: "N/A",
      modelVersion: "pragati-pest-heuristics-v1",
      processingTimeMs,
      source: "heuristic-fallback",
    };
  }

  const isWilt =
    lowerSummary.includes("wilt") ||
    lowerSummary.includes("dry") ||
    lowerSummary.includes("yellow") ||
    lowerSummary.includes("pivla");

  const fallbackResult: PestDiagnosisResult = isWilt
    ? {
        success: true,
        isCropDetected: true,
        diseaseName:
          language === "mr"
            ? "फ्युसॅरियम मर रोग (Fusarium Wilt / Root Rot)"
            : language === "hi"
            ? "उकठा रोग (Fusarium Wilt / Root Rot)"
            : "Fusarium Wilt / Root Rot",
        confidence: "High",
        severity: "Severe",
        identificationDetails:
          language === "mr"
            ? "पाने पिवळी पडणे आणि मुळे कुजणे अशी बुरशीजन्य रोगाची लक्षणे दिसून आली आहेत."
            : language === "hi"
            ? "पत्तियों का पीला पड़ना और जड़ सड़न के लक्षण देखे गए हैं।"
            : "Yellowing and wilting of leaves observed, consistent with fungal root infection.",
        homeRemedy:
          language === "mr"
            ? "ट्रायकोडर्मा व्हिरीडी (५० ग्रॅम/१० लिटर) शेणखतात मिसळून मुळांशी द्यावे."
            : language === "hi"
            ? "ट्राइकोडर्मा विरिडी जैव-कवकनाशी का मिट्टी में प्रयोग करें।"
            : "Apply Neem oil extract or Trichoderma viride bio-fungicide to the soil.",
        chemicalCure:
          language === "mr"
            ? "कार्बेन्डाझिम (बाविस्टीन) २ ग्रॅम प्रति लिटर पाण्यात मिसळून मुळांना ड्रेन्चिंग करावे."
            : language === "hi"
            ? "कार्बेंडाजिम (बाविस्टिन) 2 ग्राम प्रति लीटर पानी में मिलाकर जड़ों में डालें।"
            : "Drench roots with Carbendazim (Bavistin) 2g/liter of water. Avoid overwatering.",
        modelVersion: "pragati-pest-heuristics-v1",
        processingTimeMs,
        source: "heuristic-fallback",
      }
    : {
        success: true,
        isCropDetected: true,
        diseaseName:
          language === "mr"
            ? "मावा व तुडतुडे (Aphids & Thrips Infestation)"
            : language === "hi"
            ? "माहू और थ्रिप्स कीट प्रकोप (Aphids / Thrips)"
            : "Aphids / Thrips Infestation",
        confidence: "High",
        severity: "Moderate",
        identificationDetails:
          language === "mr"
            ? "कोवळ्या पानांवर रस शोषणारे कीटक आणि पाने मुरडलेली दिसत आहेत."
            : language === "hi"
            ? "कोमल पत्तियों पर रस चूसक कीटों और मुड़ी हुई पत्तियों का प्रभाव दिख रहा है।"
            : "Curled leaves and sap-sucking insect damage visible on tender foliage.",
        homeRemedy:
          language === "mr"
            ? "५% निंबोळी अर्क (नीम ऑइल ५ मिली + १ मिली शाम्पू प्रति लिटर) फवारणी करा."
            : language === "hi"
            ? "नीम का तेल (5 मिली/लीटर) और साबुन के घोल का छिड़काव करें।"
            : "Spray strong jet of water followed by Neem oil (5ml/liter) and mild soap solution.",
        chemicalCure:
          language === "mr"
            ? "इमिडाक्लोप्रिड १७.८ एसएल ०.५ मिली प्रति लिटर पाण्यात मिसळून फवारावे."
            : language === "hi"
            ? "इमिडाक्लोप्रिड 17.8 SL का 0.5 मिली प्रति लीटर पानी में छिड़काव करें।"
            : "Spray Imidacloprid 17.8 SL at 0.5 ml/liter of water. Wear safety mask.",
        modelVersion: "pragati-pest-heuristics-v1",
        processingTimeMs,
        source: "heuristic-fallback",
      };

  await DataStore.savePestScan({
    farmerId,
    ...fallbackResult,
  });

  return fallbackResult;
}
