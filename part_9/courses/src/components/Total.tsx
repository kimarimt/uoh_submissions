import { courseParts } from '../types/course-part';

const Total = () => {
  const totalExercises = courseParts.reduce((acc, val) => acc + val.exerciseCount, 0);
  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;