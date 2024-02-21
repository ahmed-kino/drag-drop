import { PassportInfo } from "./types";

export const validateResult = (result: PassportInfo) => {
  const { dateOfBirth, expiryDate, fullName } = result;
  return dateOfBirth && expiryDate && fullName;
};
