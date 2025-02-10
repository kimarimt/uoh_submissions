// Diagnosis Types
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// Patient Types
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

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

// Entry Types
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  'Healthy',
  'LowRisk',
  'HighRisk',
  'CriticalRisk'
}

interface Discharge {
  date: string;
  criteria: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge?: Discharge;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave
}

export type Entry =
  HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry;