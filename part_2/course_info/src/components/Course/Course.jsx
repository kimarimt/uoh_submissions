/* eslint-disable react/prop-types */
const Header = ({ name }) => <h2>{name}</h2>;

const Content = ({ parts }) => {
  return (
    <article>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </article>
  );
};

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ parts }) => {
  const totalExercises = parts
    .map((part) => part.exercises)
    .reduce((acc, val) => acc + val);

  return (
    <p>
      <strong>total of {totalExercises} exercises</strong>
    </p>
  );
};

const Course = ({ course }) => (
  <section>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </section>
);

export default Course;
