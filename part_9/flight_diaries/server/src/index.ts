import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import diaryRouter from './routes/diary';

const PORT = 3000;

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/ping', (_req: Request, res: Response) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`[server] listening at http://localhost:${PORT}`);
});