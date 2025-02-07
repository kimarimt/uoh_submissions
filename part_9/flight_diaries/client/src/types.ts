export interface DiaryEntry {
  id: string;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type NonSensitiveEntry = Omit<DiaryEntry, 'comment'>;
export type NewEntry = Omit<DiaryEntry, 'id'>;

