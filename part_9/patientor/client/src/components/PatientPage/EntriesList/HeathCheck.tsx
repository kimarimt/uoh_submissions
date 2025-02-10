import { LocalHospital, Favorite } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { HealthCheckEntry, HealthCheckRating } from "../../../types";

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
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ marginBottom: '0.25rem', marginRight: '0.25rem', fontWeight: 'bold' }}>
        {entry.date} 
        </Typography>
        <LocalHospital />
      </Box>
      <Typography>
      </Typography>
      <Typography component='p' variant='body1'>
        {entry.description}
      </Typography>
      <Favorite sx={{ color: color(), marginBottom: '0.25rem' }} />
      <Typography component='p' variant='caption'>
        Diagnosed by {entry.specialist}
      </Typography>
    </Box>
  );
};
  
export default HealthCheck;