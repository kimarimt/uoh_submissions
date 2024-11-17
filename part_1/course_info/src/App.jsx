const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ content }) => {
  const items = content.map((item) => (
    <Part key={item.part} part={item.part} exercises={item.exercises} />
  ));

  return <>{items}</>;
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Total = ({ total }) => {
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = 'Half Stack application development';
  const content = [
    { part: 'Fundamentals of React', exercises: 10 },
    { part: 'Using props to pass data', exercises: 7 },
    { part: 'State of a component', exercises: 14 },
  ];
  const total = content
    .map(item => item.exercises)
    .reduce((acc, val) => acc + val);

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total total={total} />
    </div>
  );
};

export default App;
