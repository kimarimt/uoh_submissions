import diagnoses from '../../data/diagnoses';
import Diagnosis from '../models/diagnosis';

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses
};