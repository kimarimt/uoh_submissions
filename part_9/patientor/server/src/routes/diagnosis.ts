import express, { Request, Response } from 'express';
import diagnosisService from '../services/diagnosis';
import Diagnosis from '../models/diagnosis';

const diagnosisRouter = express.Router();

diagnosisRouter.get('/', (_req: Request, res: Response<Diagnosis[]>) => {
  res.json(diagnosisService.getDiagnoses());
});

export default diagnosisRouter;