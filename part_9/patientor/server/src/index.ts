import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosis';
import patientRouter from './routes/patient';

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`[server] Listening at http://localhost:${PORT}`);
}); 