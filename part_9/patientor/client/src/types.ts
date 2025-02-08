export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Entry{}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  entries: Entry[];
  ssn?: string;
  dateOfBirth?: string;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;