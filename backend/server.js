import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint to verify API key
app.get("/test", async (req, res) => {
  const HF_API_KEY = process.env.HF_API_KEY;

  if (!HF_API_KEY) {
    return res.json({
      status: "error",
      message: "HF_API_KEY not found in environment variables",
    });
  }

  res.json({
    status: "ok",
    message: "API key found",
    keyPrefix: HF_API_KEY.substring(0, 7) + "...",
  });
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const HF_API_KEY = process.env.HF_API_KEY;

    if (!HF_API_KEY) {
      return res.status(500).json({ error: "HF_API_KEY not configured" });
    }

    console.log("Generating image for prompt:", prompt);

    // Models to try with HF Router
    const models = [
      "stabilityai/stable-diffusion-xl-base-1.0",
      "stabilityai/stable-diffusion-2-1",
      "runwayml/stable-diffusion-v1-5",
    ];

    let lastError = null;

    for (const model of models) {
      try {
        console.log(`Trying model: ${model}`);

        const url = `https://router.huggingface.co/hf-inference/models/${model}`;

        const response = await axios.post(
          url,
          { inputs: prompt },
          {
            headers: {
              Authorization: `Bearer ${HF_API_KEY}`,
              "Content-Type": "application/json",
              Accept: "image/png",
            },
            responseType: "arraybuffer",
            timeout: 120000,
          }
        );

        const base64Image = Buffer.from(response.data, "binary").toString(
          "base64"
        );
        const imageUrl = `data:image/png;base64,${base64Image}`;

        console.log("✅ Image generated successfully with model:", model);
        return res.json({ imageUrl, model });
      } catch (modelError) {
        console.error(
          `Model ${model} failed:`,
          modelError.response?.status,
          modelError.message
        );

        if (modelError.response?.data) {
          try {
            const errorText = Buffer.from(
              modelError.response.data
            ).toString();
            console.error("HF ERROR Response:", errorText);
          } catch (_) {
            console.error("HF ERROR Response: <binary>");
          }
        }

        lastError = modelError;
        continue;
      }
    }

    // If all models failed, throw the last error
    throw lastError;
  } catch (err) {
    console.error("❌ Error details:", {
      message: err.message,
      status: err.response?.status,
      statusText: err.response?.statusText,
    });

    res.status(500).json({
      error: "Failed to generate meme",
      details: err.message,
    });
  }
});

// Backend listens on port 5000
app.listen(5000, () => {
  console.log("🚀 Backend running on port 5000");
  console.log("📍 Test endpoint: http://localhost:5000/test");
  console.log(
    "🔑 HF_API_KEY loaded:",
    process.env.HF_API_KEY ? "✅ Yes" : "❌ No"
  );
});
