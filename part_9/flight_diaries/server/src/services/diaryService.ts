import { v1 as uuid } from 'uuid';
import diaries from '../../data/diaries';
import { DiaryEntry, NewDiaryEntry } from '../models/diary';
import { NonSensitiveEntries } from '../types';

const getEntries = () => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveEntries[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility
  }));
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };

  diaries.push(newEntry);
  
  return newEntry;
};

const findById = (id: string): DiaryEntry | undefined => {
  const diary = diaries.find(d => d.id === id);
  return diary;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
  findById
};