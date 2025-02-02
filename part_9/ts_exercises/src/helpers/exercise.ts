import { type CalculatorValues } from './util';

export enum Rating {
  Bad = 1,
  Average,
  Excellent,
}

interface RatingDescription {
  rating: Rating
  description: string
}

interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: Rating
  ratingDescription: string
  target: number
  average: number
}

const RATING_DESCRIPTIONS: RatingDescription[] = [
  {
    rating: Rating.Bad,
    description: "Not the best week but you're making progress",
  },
  { rating: Rating.Average, description: 'An okay week, keep pushing' },
  { rating: Rating.Excellent, description: 'Really good week, keep it up' },
];

export const getRating = (
  period: number,
  daysTrained: number
): RatingDescription => {
  const trainingRatio = daysTrained / period;

  if (trainingRatio > 0.8) {
    return RATING_DESCRIPTIONS[2];
  } else if (trainingRatio > 0.5) {
    return RATING_DESCRIPTIONS[1];
  } else {
    return RATING_DESCRIPTIONS[0];
  }
};

export const calculateExercises = (
  values: CalculatorValues
): ExerciseResult => {
  const target = values.target as number;
  const hours = values.hours as number[];
  const periodLength = hours.length;
  const trainingDays = hours.filter(hours => hours !== 0).length;
  const average = hours.reduce((acc, curr) => acc + curr) / hours.length;
  const success = average >= target;
  const { rating, description } = getRating(periodLength, trainingDays);

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription: description,
  };
};
