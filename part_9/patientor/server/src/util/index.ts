import Patient from '../models/patient';
import { Gender, NewPatient, SecurePatientData } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseString = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('incorrect or missing parameters');
  }

  return param;
};

const parseDateOfBirth = (dateOfBirth: unknown) => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('incorrect or missing date of birth');
  }

  return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('incorrect or missing gender: ' + gender);
  }

  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation)
    };

    return newPatient;
  }

  throw new Error('incorrect data: some fields for missing');
};

export const securePatientData = (patient: Patient): SecurePatientData => {
  const securePatientData = {...patient, ssn: undefined};
  return securePatientData as SecurePatientData;
};
