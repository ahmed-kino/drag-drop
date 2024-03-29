import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import OcrClient from "./clients/ORCClient";
import DBClient from "./clients/DBClient";
import { validateResult } from "./utils/validateResult";

dotenv.config();

const port = process.env.PORT || 3001;

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const dbClient = new DBClient();

app.post(
  "/upload",
  upload.single("passport"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      const ocrClient = new OcrClient(req.file.buffer, req.file.mimetype);

      const parsedPassportData = await ocrClient.getImageData();

      const validData = validateResult(parsedPassportData);

      if (!validData)
        return res.status(400).json({
          errors: "Cannot parse the image please upload a clear image",
        });

      const passport = await dbClient.createPassportImage({
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        ...parsedPassportData,
      });

      const result = await dbClient.createPassportImage(passport);

      return res.json({
        result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Internal server error: ${error}` });
    }
  }
);

app.listen(port);
