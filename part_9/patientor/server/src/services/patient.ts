import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, SecurePatientData, NewPatient, SecurePatienWithEntries } from '../models/patient';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): SecurePatienWithEntries => {
  const patient = patients.find(p => p.id === id);

  if (patient) {
    return {...patient, ssn: undefined} as SecurePatienWithEntries;
  }

  throw new Error('patient not found');
};

const getSecurePatientData = (): SecurePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient: Patient = {
    id: uuid(),
    entries: [],
    ...newPatient
  };

  patients.push(patient);
  return patient;
};

export default {
  getPatients,
  getPatient,
  getSecurePatientData,
  addPatient,
};