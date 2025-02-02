import express, { Express, Request, Response } from 'express';
import { type CalculatorValues } from './helpers/util';
import { calculateBMI } from './helpers/bmi';
import { calculateExercises } from './helpers/exercise';

const PORT = 3003;

const app: Express = express();

app.use(express.json());

app.post('/bmi', (req: Request, res: Response) => {
  const { weight, height } = req.body as CalculatorValues;
  
  const weightValue = weight as number;
  const heightValue = height as number;

  if (isNaN(weightValue) || isNaN(heightValue)) {
    res.status(400).json({ 'error': 'malformed parameters' });
    return;
  }

  const values: CalculatorValues = {
    height: heightValue,
    weight: weightValue
  };

  const result = calculateBMI(values);

  res.status(201).json({
    weight: weightValue,
    height: heightValue,
    bmi: result
  });
});

app.post('/exercises', (req: Request, res: Response) => {
  const { hours, target } = req.body as CalculatorValues;

  if (!hours || !target) {
    res.status(400).json({ 'error': 'missing parameters' });
    return;
  }

  const exerciseResults = calculateExercises({ hours, target });
  res.status(201).json(exerciseResults);
});

app.listen(PORT, () => {
  console.log(`[server] server is listening at http://localhost:${PORT}`);
});