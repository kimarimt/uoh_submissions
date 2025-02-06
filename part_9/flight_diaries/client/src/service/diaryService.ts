import axios from 'axios';
import { DiaryEntry, NewEntry, NonSensitiveEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntries = async () => {
  const response = await axios.get<NonSensitiveEntry[]>(baseUrl);
  return response.data;
};

export const createEntry = async (obj: NewEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, obj);
  return response.data;
};