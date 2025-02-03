import express, { Request, Response } from 'express';
import patientService from '../services/patient';
import { SecurePatientData } from '../util/types';
import { securePatientData, toNewPatient } from '../util';

const patientRouter = express.Router();

patientRouter.get('/', (_req: Request, res: Response<SecurePatientData[]>) => {
  res.json(patientService.getSecurePatientData());
});

patientRouter.post('/', (req: Request, res: Response) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);    
    const secureData = securePatientData(addedPatient);
    
    res.status(201).json(secureData);
  } 
  catch (error: unknown) {
    let errorMessage = 'Something went wrong. ';

    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;