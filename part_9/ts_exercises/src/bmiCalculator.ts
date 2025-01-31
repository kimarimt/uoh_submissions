import { type CalculatorValues, ProcessType, processArgs } from './helpers/util'

enum BodyMassIndex {
  Underweight = 'Underweight',
  Normal = 'Normal range',
  Overweight = 'Overweight',
}

const calculateBMI = (values: CalculatorValues): BodyMassIndex => {
  const weight = values.weight as number
  const height = values.height as number

  const bmi = (weight / Math.pow(height, 2)) * 10_000

  if (bmi < 18.5) {
    return BodyMassIndex.Underweight
  } else if (bmi < 24.9) {
    return BodyMassIndex.Normal
  } else {
    return BodyMassIndex.Overweight
  }
}

try {
  const values = processArgs(process.argv.slice(2), ProcessType.BMI)
  const result = calculateBMI(values)
  console.log(result)
} catch (error) {
  console.log('BMICalculator error:', error.message)
}
