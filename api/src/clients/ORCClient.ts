import { createWorker } from "tesseract.js";
import { PassportInfo } from "../utils/types";
import { extractPassportInfo } from "../utils/extractPassportInfo";

class OcrClient {
  public worker: any;
  private ocrResult: string | null = null;

  constructor(private language: string) {
    this.language = language;
  }

  async createWorkerImage() {
    this.worker = await createWorker(this.language);
    console.log("Worker created");
  }

  async recognizeImage(imageBuffer: Buffer) {
    if (!this.worker) {
      throw new Error("Worker not initialized");
    }
    const {
      data: { text },
    } = await this.worker.recognize(imageBuffer);
    this.ocrResult = text;
    return text;
  }

  parsePassportData(): PassportInfo {
    if (!this.ocrResult) {
      throw new Error("OCR result not available");
    }
    return extractPassportInfo(this.ocrResult);
  }

  async close() {
    if (!this.worker) {
      throw new Error("Worker not initialized");
    }
    await this.worker.terminate();
  }
}

export default OcrClient;
