export interface PassportInfo {
  fullName: string;
  passportNumber: string;
  dateOfBirth: string;
  expiryDate: string;
}

export type DBPassportInfo = PassportInfo & {
  fileName: string;
  fileType: string;
};
