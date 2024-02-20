import DBClient from "../DBClient";
import { PassportImage } from "../../entity/PassportImage";
import { passportImage } from "./DBClient.fixtures";

describe("DBClient", () => {
  let dbClient: DBClient;

  beforeAll(async () => {
    dbClient = new DBClient();
    await dbClient.initialize();
  });

  afterAll(async () => {
    await dbClient.close();
  });

  it("create a passport image", async () => {
    const createdPassportImage =
      await dbClient.createPassportImage(passportImage);
    expect(createdPassportImage).toBeDefined();
    expect(createdPassportImage).toBeInstanceOf(PassportImage);
  });

  it("save a passport image", async () => {
    const createdPassportImage =
      await dbClient.createPassportImage(passportImage);

    const savedPassportImage =
      await dbClient.savePassportImage(createdPassportImage);
    expect(savedPassportImage).toBeDefined();
    expect(savedPassportImage).toBeInstanceOf(PassportImage);
  });
});
