import express, { Request, Response } from 'express';
import diaryService from '../services/diaryService';
import { NonSensitiveEntries } from '../types';
import { DiaryEntry, NewDiaryEntry } from '../models/diary';
import { errorMiddleware, newDiaryParser } from '../util/middleware';

const router = express.Router();

router.get('/', (_req: Request, res: Response<NonSensitiveEntries[]>) => {
  res.json(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req: Request, res: Response) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (!diary) {
    res.status(404).send({ 'error': 'diary not found' });
    return;
  }

  res.json(diary);
});

router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
  const addedEntry = diaryService.addDiary(req.body);
  res.status(201).json(addedEntry);
});

router.use(errorMiddleware);

export default router;