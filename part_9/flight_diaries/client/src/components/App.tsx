import { SyntheticEvent, useEffect, useState } from 'react';
import { NewEntry, NonSensitiveEntry } from '../types';
import { createEntry, getAllEntries } from '../service/diaryService';
import { AxiosError } from 'axios';
import { CustomError, parseErrors } from '../util/helpers';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveEntry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const entriesData = await getAllEntries();
        if (entriesData) {
          setDiaries(entriesData);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          alertError(error.message);
        }
      }
    };

    fetchDiaries();
  }, []);

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const entry: NewEntry = {
        date,
        visibility: visibility.toLowerCase(),
        weather: weather.toLowerCase(),
        comment
      };

      const newEntry = await createEntry(entry);
      const nonSensitiveEntry = {...newEntry, comment: null} as NonSensitiveEntry;
      
      setDiaries(diaries.concat(nonSensitiveEntry));
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errors = error.response?.data.error as CustomError[];
        const parsedErrors = parseErrors(errors);
        const errorMessage = parsedErrors
          .map(
            error => `Error: ${error.message}${error.path ? `, path: ${error.path}` : ''}`
          )
          .join('\n');

        alertError(errorMessage);
      }
    }
  };

  const alertError = (message: string) => {
    setMessage(message);

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <>
      <div>
        <h2>Add new entry</h2>
        <form onSubmit={addEntry}>
          { message && <p style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{message}</p> }
          <div>
            <label htmlFor='date'>Date: </label>
            <input id='date' type='text' value={date} onChange={event => setDate(event.target.value)} />
          </div>
          <div>
            <label htmlFor='visibility'>Visibility: </label>
            <input id='visibility' type='text' value={visibility} onChange={event => setVisibility(event.target.value)} />
          </div>
          <div>
            <label htmlFor='weather'>Weather: </label>
            <input id='weather' type='text' value={weather} onChange={event => setWeather(event.target.value)} />
          </div>
          <div>
            <label htmlFor='comment'>Comment: </label>
            <input id='comment' type='text' value={comment} onChange={event => setComment(event.target.value)} />
          </div>
          <button type='submit'>Add</button>
        </form>
      </div>
      <div>
        <h2>Diary Entries</h2>
        <hr />
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {diaries.map(diary => 
            <li key={diary.id}>
              <div>
                <h3>{diary.date}</h3>
                <p>Weather: {diary.weather}</p>
                <p>Visibility: {diary.visibility}</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default App;