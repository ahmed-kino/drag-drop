import OcrClient from "../ORCClient";

import {
  expectedPassportInfo,
  expectedText,
  imageBuffer,
} from "./ORCClient.fixture";

describe("OcrClient", () => {
  let ocrClient: OcrClient;

  beforeEach(async () => {
    ocrClient = new OcrClient("eng");
    await ocrClient.createWorkerImage();
  });

  afterEach(async () => {
    try {
      await ocrClient.close();
    } catch (error) {
      console.error("Error closing worker:", error);
    }
  });

  it("recognize image and parse passport data", async () => {
    const recognizedText = await ocrClient.recognizeImage(imageBuffer);
    const parsedPassportInfo = ocrClient.parsePassportData();

    expect(recognizedText).toContain(expectedText);
    expect(parsedPassportInfo).toEqual(expectedPassportInfo);
  });

  it("throw error if worker is not initialized", async () => {
    ocrClient.worker = null;
    await expect(ocrClient.recognizeImage(imageBuffer)).rejects.toThrow(
      "Worker not initialized"
    );
  });
});
