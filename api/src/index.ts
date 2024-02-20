import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import OcrClient from "./clients/ORCClient";
import DBClient from "./clients/DBClient";

dotenv.config();

const port = process.env.PORT || 3001;

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ocrClient = new OcrClient("eng");
const dbClient = new DBClient();

app.post(
  "/upload",
  upload.single("passport"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      await ocrClient.createWorkerImage();
      await ocrClient.recognizeImage(req.file.buffer);
      await dbClient.initialize();

      const parsedPassportData = ocrClient.parsePassportData();

      ocrClient.close();

      const passport = await dbClient.createPassportImage({
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        ...parsedPassportData,
      });

      const result = await dbClient.createPassportImage(passport);

      res.json({
        result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Internal server error: ${error}` });
    }
  }
);

app.listen(port);
