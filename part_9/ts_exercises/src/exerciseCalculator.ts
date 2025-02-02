import { ProcessType, processArgs } from './helpers/util';
import { calculateExercises } from './helpers/exercise';

try {
  const values = processArgs(process.argv.slice(2), ProcessType.Exercises);
  const result = calculateExercises(values);
  console.log(result);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Exercise Calculator error', error.message);
  }
}
