import * as fs from "fs";
import path from "path";

const imagePath = path.join(__dirname, "eng_bw.png");
export const imageBuffer = fs.readFileSync(imagePath);

export const expectedPassportInfo = {
  dateOfBirth: "",
  expiryDate: "",
  fullName: "",
  passportNumber: "",
};

export const expectedText =
  "Mild Splendour of the various-vested Night!\nMother of wildly-working visions! hail\nI watch thy gliding, while with watery light\nThy weak eye glimmers through a fleecy veil;\nAnd when thou lovest thy pale orb to shroud\nBehind the gather’d blackness lost on high;\nAnd when thou dartest from the wind-rent cloud\nThy placid lightning o’er the awaken’d sky.\n";
