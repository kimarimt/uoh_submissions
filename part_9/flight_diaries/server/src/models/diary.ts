import { z } from 'zod';
import { Visibility, Weather } from '../types';

export const NewEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  date: z.string().date(),
  comment: z.string().optional()
});

export interface DiaryEntry {
  id: string;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NewDiaryEntry = z.infer<typeof NewEntrySchema>;

export interface DiaryEntry extends NewDiaryEntry {
  id: string;
}