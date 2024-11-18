import { useState } from 'react';

const Section = ({ title, ancedote, votes, children }) => (
  <section>
    <h1>{title}</h1>
    <p>{ancedote}</p>
    <p>has {votes} votes</p>
    {children}
  </section>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];
  const startIndex = Math.floor(Math.random() * anecdotes.length);

  const [selected, setSelected] = useState(startIndex);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  
  const maxIndex = votes.findIndex((vote) => vote === Math.max(...votes));

  const handleSelected = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(() => randomNumber);
  };

  const handleVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(() => copy);
  };

  return (
    <>
      <Section
        title='Ancedote of the day'
        ancedote={anecdotes[selected]}
        votes={votes[selected]}
      >
        <button onClick={handleVotes}>vote</button>
        <button onClick={handleSelected}>next ancedote</button>
      </Section>
      <Section
        title='Ancedote with the most votes'
        ancedote={anecdotes[maxIndex]}
        votes={votes[maxIndex]}
      ></Section>
    </>
  );
};

export default App;
