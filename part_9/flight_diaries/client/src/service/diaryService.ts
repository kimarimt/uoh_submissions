import axios from 'axios';
import { NonSensitiveEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntries = async () => {
  const response = await axios.get<NonSensitiveEntry[]>(baseUrl);
  return response.data;
};