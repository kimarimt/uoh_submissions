import { z } from 'zod';
import { HealthCheckRating } from '../models/patient';

// Base Entry Schema
const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

// Hospital Schema
const HospitalSchema = z.object({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string()
  }).optional()
});

// HeathCheck Schema
const HealthCheckSchema = z.object({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

// OccupationHealthcare Schema
const OccupationalHealthcareSchema = z.object({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({ 
    startDate: z.string().date(),
    endDate: z.string().date()
  }).optional()
});

// Schema Merging
const NewHospitalEntry = BaseEntrySchema.merge(HospitalSchema);
const NewHealthCheckEntry = BaseEntrySchema.merge(HealthCheckSchema);
const NewOccupationalHealthcareEntry = BaseEntrySchema.merge(OccupationalHealthcareSchema);

export const EntryUnion = z.discriminatedUnion('type', [
  NewHospitalEntry,
  NewHealthCheckEntry,
  NewOccupationalHealthcareEntry
]);

type HospitalEntry = z.infer<typeof NewHospitalEntry>;
type HealthCheckEntry = z.infer<typeof NewHealthCheckEntry>;
type OccupationalHealthcareEntry = z.infer<typeof NewOccupationalHealthcareEntry>;
export type NewEntry = HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry;
