import { Typography } from "@mui/material";
import { Patient } from "../../../types";
import EntryDetails from "./EntryDetails";

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
              {patient.entries.map(entry => 
                <EntryDetails key={entry.id} entry={entry} />
              )}
            </>
          ) 
        : <Typography style={{ marginTop: '0.75rem' }}>No Entries Found...</Typography>
      }
    </>
  );
};

export default EntriesList;