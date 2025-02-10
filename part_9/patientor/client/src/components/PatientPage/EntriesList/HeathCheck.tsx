import { Favorite } from "@mui/icons-material";
import { HealthCheckEntry, HealthCheckRating } from "../../../types";
import Wrapper from "./Wrapper";

interface Props {
  entry: HealthCheckEntry;
}

const HealthCheck = ({ entry }: Props) => {
  const color = () => {
    switch (entry.healthCheckRating) {
      case HealthCheckRating.Healthy:
        return 'green';
      case HealthCheckRating.LowRisk:
        return 'yellow';
      case HealthCheckRating.HighRisk:
        return 'orange';
      case HealthCheckRating.CriticalRisk:
        return 'red';
    }
  };

  return (
    <Wrapper entry={entry}>
      <Favorite sx={{ color: color() }} />
    </Wrapper>
  );
};
  
export default HealthCheck;