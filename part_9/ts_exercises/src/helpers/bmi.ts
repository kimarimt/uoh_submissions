import { type CalculatorValues } from './util';

enum BodyMassIndex {
  Underweight = 'Underweight',
  Normal = 'Normal range',
  Overweight = 'Overweight',
}

export const calculateBMI = (values: CalculatorValues): BodyMassIndex => {
  const weight = values.weight as number;
  const height = values.height as number;

  const bmi = (weight / Math.pow(height, 2)) * 10_000;

  if (bmi < 18.5) {
    return BodyMassIndex.Underweight;
  } else if (bmi < 24.9) {
    return BodyMassIndex.Normal;
  } else {
    return BodyMassIndex.Overweight;
  }
};
