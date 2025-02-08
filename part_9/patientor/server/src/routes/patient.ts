import express, { Request, Response } from 'express';
import { errorHandler, newPatientHander } from '../util/middleware';
import { NewPatient, SecurePatientData } from '../models/patient';
import patientService from '../services/patient';

const patientRouter = express.Router();

patientRouter.get('/', (_req: Request, res: Response<SecurePatientData[]>) => {
  res.json(patientService.getPatients());
});

patientRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const patient = patientService.getPatient(req.params.id);
    res.json(patient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ 'error': error.message });
    }
  }
});

patientRouter.post('/', newPatientHander, (req: Request<unknown, unknown, NewPatient>, res: Response<SecurePatientData>) => {
  const addedPatient = patientService.addPatient(req.body);
  const securePatientData = {...addedPatient, ssn: undefined} as SecurePatientData;
  res.status(201).json(securePatientData);
});

patientRouter.use(errorHandler);

export default patientRouter;