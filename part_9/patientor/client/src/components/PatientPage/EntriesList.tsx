import { Typography, Box } from "@mui/material";
import { Patient } from "../../types";
import DiagnosisList from "./DiagnosisList";

interface Props {
  patient: Patient | null
}

const EntriesList = ({ patient }: Props) => {
  if (!patient) {
    return null;
  }

  return (
    <>
      { patient.entries.length > 0 
        ? (
            <>
              <Typography variant='h6' sx={{ margin: '.25rem 0' }}>
                Entries
              </Typography>
              {patient.entries.map(entry => (
                <Box key={entry.id}>
                  <Typography variant='body2'>
                    {entry.date} {entry.description}
                  </Typography>
                  <DiagnosisList patient={patient} />
                </Box>
              ))}
            </>
          ) 
        : <Typography style={{ marginTop: '0.75rem' }}>No Entries Found...</Typography>
      }
    </>
  );
};

export default EntriesList;