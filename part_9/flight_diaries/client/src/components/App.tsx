import { useEffect, useState } from 'react';
import { NonSensitiveEntry } from '../types';
import { getAllEntries } from '../service/diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const entriesData = await getAllEntries();
      setDiaries(entriesData);
    };

    fetchDiaries();
  }, []);

  return (
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
  );
};

export default App;