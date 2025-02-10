import { LocalHospital } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { HospitalEntry } from "../../../types";
import DiagnosisList from "../DiagnosisList";

interface Props {
  entry: HospitalEntry
}

const HospitalCheck = ({ entry }: Props) => (
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
    <DiagnosisList codes={entry.diagnosisCodes} />
    <Typography component='p' variant='caption'>
      Diagnosed by {entry.specialist}
    </Typography>
  </Box>
);

export default HospitalCheck;
