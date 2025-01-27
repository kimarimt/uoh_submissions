enum BodyMassIndex {
  Underweight = 'Underweight',
  Normal = 'Normal range',
  Overweight = 'Overweight',
}

const calculateBMI = (weight: number, height: number): BodyMassIndex => {
  const bmi = (weight / Math.pow(height, 2)) * 10_000

  if (bmi < 18.5) {
    return BodyMassIndex.Underweight
  } else if (bmi < 24.9) {
    return BodyMassIndex.Normal
  } else {
    return BodyMassIndex.Overweight
  }
}

console.log(calculateBMI(79, 162))
