import { z } from 'zod';
import Diagnosis from './diagnosis';

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export type SecurePatientData = Omit<Patient, 'ssn' | 'entries'>;
export type SecurePatienWithEntries = Omit<Patient, 'ssn'>;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital',
  discharge?: Discharge
}

export enum HealthCheckRating {
  'Healthy',
  'LowRisk',
  'HighRisk',
  'CriticalRisk'
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealth';
  employerName: string;
  sickLeave?: SickLeave; 
}

export type Entry = 
  | HospitalEntry 
  | HealthCheckEntry
  | OccupationalHealthcareEntry;

// Zod Schemas
export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});
  
export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
}
