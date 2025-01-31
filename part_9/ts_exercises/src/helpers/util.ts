export type CalculatorValues = Record<string, number | number[]>

export enum ProcessType {
  BMI,
  Exercises,
}

const parseExerciseArgs = (args: string[]): CalculatorValues => {
  if (args.length == 0) throw new Error('not enough arguments')

  const target = Number(args[0])
  const hours = args.slice(1, args.length).map(arg => Number(arg))

  if (hours.every(arg => !isNaN(arg)) && !isNaN(target)) {
    return {
      target,
      hours,
    }
  } else {
    throw new Error('failed to parse arguments into numbers')
  }
}

const parseBMIArgs = (args: string[]): CalculatorValues => {
  if (args.length < 2) throw new Error('not enough arguments')
  if (args.length > 2) throw new Error('too many arguments')

  const weight = Number(args[0])
  const height = Number(args[1])

  if (!isNaN(weight) && !isNaN(height)) {
    return {
      weight,
      height,
    }
  } else {
    throw new Error('failed to parse arguments into numbers')
  }
}

export const processArgs = (
  args: string[],
  type: ProcessType
): CalculatorValues => {
  switch (type) {
    case ProcessType.Exercises:
      return parseExerciseArgs(args)
    case ProcessType.BMI:
      return parseBMIArgs(args)
  }
}
