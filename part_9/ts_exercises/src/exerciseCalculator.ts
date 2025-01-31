enum Rating {
  Bad = 1,
  Average,
  Excellent,
}

interface RatingDescription {
  rating: Rating
  description: string
}

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: Rating
  ratingDescription: string
  target: number
  average: number
}

const ratingDescriptions: RatingDescription[] = [
  {
    rating: Rating.Bad,
    description: "Not the best week but you're making progress",
  },
  {rating: Rating.Average, description: 'An okay week, keep pushing'},
  {rating: Rating.Excellent, description: 'Really good week, keep it up'},
]

const getRating = (period: number, daysTrained: number): RatingDescription => {
  const trainingRatio = daysTrained / period

  if (trainingRatio > 0.8) {
    return ratingDescriptions[2]
  } else if (trainingRatio > 0.5) {
    return ratingDescriptions[1]
  } else {
    return ratingDescriptions[0]
  }
}

const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length
  const trainingDays = hours.filter(hours => hours !== 0).length
  const average = hours.reduce((acc, curr) => acc + curr) / hours.length
  const success = average >= target
  const { rating, description } = getRating(periodLength, trainingDays)

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription: description,
  }
}

const hours = [3, 2, 2, 4.5, 2, 3, 1]
const target = 2
console.log(calculateExercises(hours, target))
