import { HospitalEntry } from "../../../types";
import DiagnosisList from "../DiagnosisList";
import Wrapper from "./Wrapper";

interface Props {
  entry: HospitalEntry
}

const HospitalCheck = ({ entry }: Props) => (
  <Wrapper entry={entry}>
    <DiagnosisList codes={entry.diagnosisCodes} />
  </Wrapper>
);

export default HospitalCheck;
