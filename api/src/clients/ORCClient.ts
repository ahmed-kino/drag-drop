import axios from "axios";
import { PassportInfo } from "../utils/types";

class OcrClient {
  private imageBuffer: Buffer;
  private mimeType: string;

  constructor(imageBuffer: Buffer, mimeType: string) {
    this.imageBuffer = imageBuffer;
    this.mimeType = mimeType;
  }

  async getImageData(): Promise<PassportInfo> {
    try {
      const formData = new FormData();
      const blob = new Blob([this.imageBuffer], { type: this.mimeType });
      formData.append("imagefile", blob, "rtaImage.jpg");

      const response = await axios.post(
        "http://orcsvc:5000/process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return {
        fullName: `${response.data.name} ${response.data.surname}`,
        dateOfBirth: response.data.birth_date,
        passportNumber: response.data.document_number,
        expiryDate: response.data.expiry_date,
      };
    } catch (error: any) {
      throw new Error(`Error: ${error.response?.data}`);
    }
  }
}

export default OcrClient;
