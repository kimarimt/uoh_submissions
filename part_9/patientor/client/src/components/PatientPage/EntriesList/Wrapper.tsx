import { Box, Typography } from "@mui/material";
import { Entry } from "../../../types";
import { LocalHospital, MedicalServices, Work } from "@mui/icons-material";

interface Props {
  entry: Entry,
  employer?: string,
  children?: JSX.Element;
}

const Wrapper = ({ entry, employer, children }: Props) => {
  const typeIcon = () => {
    switch (entry.type) {
    case "Hospital":
      return <LocalHospital sx={{ color: 'red' }} />;
    case "HealthCheck":
      return <MedicalServices sx={{ color: 'red' }} />;
    case "OccupationalHealthcare":
      return <Work sx={{ color: 'maroon' }} />;
    }
  };

  return (
    <Box sx={{ margin: '0.75rem 0' }}>
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ marginBottom: '0.5rem', marginRight: '0.25rem' }}>
          { entry.date }
        </Typography>
        { typeIcon() }
        { employer && <Typography sx={{ marginLeft: '0.25rem' }}>{ employer }</Typography> }
      </Box>
      <Typography component='p' variant='body1' sx={{ marginBottom: '0.5rem' }}>
        { entry.description }
      </Typography>
      { children }
      <Typography component='p' variant='caption' color='textSecondary'>
        Diagnosed by {entry.specialist}
      </Typography>
    </Box>
  );
};

export default Wrapper;