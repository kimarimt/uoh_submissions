import { ProcessType, processArgs } from './helpers/util'
import { calculateBMI } from './helpers/bmi'

try {
  const values = processArgs(process.argv.slice(2), ProcessType.BMI)
  const result = calculateBMI(values)
  console.log(result)
} catch (error) {
  console.log('BMICalculator error:', error.message)
}
