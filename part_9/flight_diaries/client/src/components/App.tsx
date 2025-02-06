import { SyntheticEvent, useEffect, useState } from 'react';
import { NewEntry, NonSensitiveEntry } from '../types';
import { createEntry, getAllEntries } from '../service/diaryService';
import { getVisibility, getWeather } from '../util/helpers';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveEntry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchDiaries = async () => {
      const entriesData = await getAllEntries();
      setDiaries(entriesData);
    };

    fetchDiaries();
  }, []);

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    const entry: NewEntry = {
      date,
      visibility: getVisibility(visibility),
      weather: getWeather(weather),
      comment
    };

    const newEntry = await createEntry(entry);

    setDiaries(diaries.concat(newEntry));
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <>
      <div>
        <h2>Add new entry</h2>
        <form onSubmit={addEntry}>
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