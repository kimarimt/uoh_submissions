import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { NewPatientSchema } from '../models/patient';
 
export const errorHandler = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

export const newPatientHander = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};