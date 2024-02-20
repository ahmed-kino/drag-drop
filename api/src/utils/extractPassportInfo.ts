import { Page } from "tesseract.js";
import { PassportInfo } from "./types";

// this is a complete mess I don't know what I'm doing
export function extractPassportInfo(ocrResult: string): PassportInfo {
  const passportNumberRegex = /P<([A-Z1-9]+)<([A-Z]{3})/;
  const dateOfBirthRegex = /(\d{2})(\d{2})(\d{2})/;
  const expiryDateRegex = /(\d{2})(\d{2})(\d{2})/;
  const name = /(?<=<)[A-Z\s]+(?=<)/g;

  const passportNumberMatch = ocrResult.match(passportNumberRegex);
  const dateOfBirthMatch = ocrResult.match(dateOfBirthRegex);
  const expirationDateMatch = ocrResult.match(expiryDateRegex);
  const nameMatch = ocrResult.match(name);

  const passportNumber = passportNumberMatch ? passportNumberMatch[1] : "";
  const dateOfBirth = dateOfBirthMatch
    ? `${dateOfBirthMatch[1]}-${dateOfBirthMatch[2]}-${dateOfBirthMatch[3]}`
    : "";
  const expiryDate = expirationDateMatch
    ? `${expirationDateMatch[1]}-${expirationDateMatch[2]}-${expirationDateMatch[3]}`
    : "";

  const fullName = nameMatch ? nameMatch.join(" ") : "";

  return {
    fullName,
    passportNumber,
    dateOfBirth,
    expiryDate,
  };
}
