import { useState } from 'react';

const Title = ({ name }) => <h1>{name}</h1>;

const Button = ({ text, onClick }) => (
  <button onClick={() => onClick(text)}>{text}</button>
);

const ButtonControls = ({ stats, onClick }) => {
  const buttons = stats.map((stat) => (
    <Button key={stat.name} text={stat.name} onClick={onClick} />
  ));

  return <div>{buttons}</div>;
};

const Statistics = ({ stats, noFeedback }) => {
  const lines = stats.map((stat) => (
    <StatisticsLine key={stat.name} name={stat.name} count={stat.count} />
  ));

  return (
    <>
      <Title name='statistics' />
      {noFeedback ? (
        <p>No Feedback given</p>
      ) : (
        <table>
          <tbody>{lines}</tbody>
        </table>
      )}
    </>
  );
};

const StatisticsLine = ({ name, count }) => {
  const outputText = name === 'positive' ? `${count} %` : `${count}`;

  return (
    <tr>
      <td>{name}</td>
      <td>{outputText}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const noFeedback = good === 0 && neutral === 0 && bad === 0;
  const total = good + neutral + bad;
  const average = (good + bad * -1) / total;
  const positiveReviews = (good / total) * 100;

  const stats = [
    { name: 'good', count: good },
    { name: 'neutral', count: neutral },
    { name: 'bad', count: bad },
    { name: 'all', count: total },
    { name: 'average', count: average.toFixed(1) },
    { name: 'positive', count: positiveReviews.toFixed(1) },
  ];

  const handleUpdate = (text) => {
    if (text === 'good') {
      setGood(good + 1);
    } else if (text === 'neutral') {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
  };

  return (
    <>
      <Title name='give feedback' />
      <ButtonControls stats={stats.slice(0, 3)} onClick={handleUpdate} />
      <Statistics stats={stats} noFeedback={noFeedback} />
    </>
  );
};

export default App;
