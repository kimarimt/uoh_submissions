import { OccupationalHealthcareEntry } from "../../../types";
import Wrapper from "./Wrapper";

interface Props {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareCheck = ({ entry }: Props) => 
  <Wrapper entry={entry} employer={entry.employerName} />;

export default OccupationalHealthcareCheck;