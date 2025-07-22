import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import axios from "axios";
import FormData from "form-data";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

app.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const imagePath = path.resolve(req.file.path);

    if (!process.env.IMAGGA_API_KEY || !process.env.IMAGGA_API_SECRET) {
      return res.status(500).json({ 
        error: "Imagga API credentials not configured. Please check .env file." 
      });
    }

    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath));

    const response = await axios.post(
      "https://api.imagga.com/v2/tags",
      formData,
      {
        headers: formData.getHeaders(),
        auth: {
          username: process.env.IMAGGA_API_KEY,
          password: process.env.IMAGGA_API_SECRET,
        },
      }
    );

    const tags = response.data.result.tags
      .slice(0, 10) // Increase to get more features
      .map(tag => `${tag.tag.en} (${Math.round(tag.confidence)}%)`)
      .join(", ");

    fs.unlinkSync(imagePath);

    res.json({ caption: `Detected objects/features: ${tags}` });
  } catch (err) {
    console.error("Error analyzing image:", err.message);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    if (err.response?.status === 401) {
      res.status(500).json({ error: "Invalid Imagga credentials." });
    } else if (err.code === 'ENOTFOUND') {
      res.status(500).json({ error: "Network error. Check your internet connection." });
    } else {
      res.status(500).json({ error: "Image analysis failed. Try again." });
    }
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
