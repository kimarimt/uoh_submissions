import { Entry } from "../../../types";
import HealthCheck from "./HeathCheck";
import HospitalCheck from "./HospitalCheck";
import OccupationalHealthcareCheck from "./OccupationalHealthcareCheck";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalCheck entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;