import { type CalculatorValues, ProcessType, processArgs } from './helpers/util'
import { getRating, Rating } from './helpers/exercise'

interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: Rating
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (values: CalculatorValues): ExerciseResult => {
  const target = values.target as number
  const hours = values.hours as number[]
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

try {
  const values = processArgs(process.argv.slice(2), ProcessType.Exercises)
  const result = calculateExercises(values)
  console.log(result)
} catch (error) {
  console.log('Exercise Calculator error', error.message)
}
