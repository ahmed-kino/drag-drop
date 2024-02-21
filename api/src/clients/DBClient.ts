import { DataSource } from "typeorm";
import { PassportImage } from "../entity/PassportImage";
import { AppDataSource } from "../data-source";
import { DBPassportInfo } from "../utils/types";

class DBClient {
  private connection: DataSource | null = null;

  constructor() {
    (async () => {
      try {
        this.connection = await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
      } catch (err) {
        console.error("Error during Data Source initialization:", err);
        throw err;
      }
    })();
  }

  async createPassportImage(passportImage: DBPassportInfo) {
    try {
      if (!this.connection) {
        throw new Error("createPassport: Database connection not initialized");
      }

      const createdPassportImage = await this.connection
        .getRepository(PassportImage)
        .create(passportImage);
      console.log("Passport image created:", createdPassportImage);
      return createdPassportImage;
    } catch (error) {
      console.error("Error creating passport image:", error);
      throw error;
    }
  }

  async savePassportImage(passportImage: PassportImage) {
    try {
      if (!this.connection) {
        throw new Error("savePassport: Database connection not initialized");
      }

      const savedPassportImage = await this.connection
        .getRepository(PassportImage)
        .save(passportImage);
      console.log("Passport image saved:", savedPassportImage);
      return savedPassportImage;
    } catch (error) {
      console.error("Error saving passport image:", error);
      throw error;
    }
  }

  async close() {
    try {
      if (this.connection) {
        await this.connection.destroy();
        console.log("Database connection closed");
      }
    } catch (error) {
      console.error("Error closing database connection:", error);
      throw error;
    }
  }
}

export default DBClient;
