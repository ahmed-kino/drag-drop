import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { PassportImage } from "./entity/PassportImage";
import { Page, createWorker } from "tesseract.js";
import multer from "multer";

dotenv.config();

const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post(
  "/upload",
  upload.single("passport"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const worker = await createWorker("eng");
      const { data } = await worker.recognize(req.file.buffer);

      // TODO: extract more data
      const { dateOfBirth, expiryDate } = parsePassportData(data);

      const passport = await AppDataSource.getRepository(PassportImage).create({
        // TODO: please fill this later
        imageData: req.file.buffer,
        fileName: "",
        fileType: "",
        dateOfBirth,
        expiryDate,
      });

      const result =
        await AppDataSource.getRepository(PassportImage).save(passport);

      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Internal server error: ${error}` });
    }
  }
);

function parsePassportData(data: Page): {
  dateOfBirth: string;
  expiryDate: string;
} {
  // TODO: parse extract text here
  console.log("the data is -->", data);
  const dateOfBirth = "1990-01-01";
  const expiryDate = "2022-12-31";
  return { dateOfBirth, expiryDate };
}

app.listen(port);
