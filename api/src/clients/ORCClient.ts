import { createWorker } from "tesseract.js";
import { PassportInfo } from "../utils/types";
import { extractPassportInfo } from "../utils/extractPassportInfo";

class OcrClient {
  private worker: any;
  private ocrResult: string | null = null;

  constructor(private language: string) {
    (async () => {
      this.worker = await createWorker(language);
      console.log("Worker created");
    })();
  }

  async recognizeImage(imageBuffer: Buffer) {
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
    await this.worker.terminate();
  }
}

export default OcrClient;
