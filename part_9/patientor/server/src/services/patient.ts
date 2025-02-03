import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import Patient from '../models/patient';
import { NewPatient, SecurePatientData } from '../util/types';

const getPatients = (): Patient[] => {
  return patients;
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
    ...newPatient
  };

  patients.push(patient);
  return patient;
};

export default {
  getPatients,
  getSecurePatientData,
  addPatient,
};