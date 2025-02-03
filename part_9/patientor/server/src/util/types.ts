import Patient from '../models/patient';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type SecurePatientData = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;