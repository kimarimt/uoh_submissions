import { Work } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../../types";

interface Props {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareCheck = ({ entry }: Props) => (
  <Box sx={{ margin: '1rem 0' }}>
    <Box sx={{ display: 'flex' }}>
      <Typography sx={{ marginBottom: '0.25rem', marginRight: '0.25rem', fontWeight: 'bold' }}>
      {entry.date}
      </Typography>
      <Work sx={{ marginRight: '0.25rem' }} />
      <Typography>
        {entry.employerName}
      </Typography>
    </Box>
    <Typography>
    </Typography>
    <Typography component='p' variant='body1' sx={{ marginBottom: '1rem' }}>
      {entry.description}
    </Typography>
    <Typography component='p' variant='caption'>
      Diagnosed by {entry.specialist}
    </Typography>
  </Box>
);

export default OccupationalHealthcareCheck;