import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientsService from "../../services/patients";
import { useMatch } from "react-router-dom";
import { Box, Card, CardContent, CardHeader, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";

const PatientPage = () => {
  const match = useMatch('/patients/:id');
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (match) {
        try {
          const patientData = await patientsService.getPatient(match.params.id);
          setPatient(patientData);
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(error.message);
          }
        }
      }
    };

    fetchPatient();
  }, [match]);
  
  return (
    <Card style={{ marginTop: '1.5rem' }}>
      <CardHeader title={patient?.name} subheader={patient?.gender} />
      <Divider />
      <CardContent>
        <Typography variant='overline'>
          Occupation: {patient?.occupation}
        </Typography>
        { patient?.entries && patient?.entries.length > 0 ? (
          <>
            <Typography variant='h6' sx={{ margin: '.75rem 0' }}>
              Entries
            </Typography>
            {patient?.entries.map(entry => (
              <Box key={entry.id}>
                <Typography variant='body2'>
                  {entry.date} {entry.description}
                </Typography>
                { entry.diagnosisCodes && (
                  <>
                    <Typography sx={{ marginTop: '1rem' }}>
                      Diagnoses
                    </Typography>
                    <List sx={{ padding: 0 }}>
                      {entry.diagnosisCodes.map(code => (
                        <ListItem key={code} sx={{ padding: 0, margin: 0 }}>
                          <ListItemText>
                            <Typography variant='overline'>
                              {code}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </Box>
            ))}
          </>
        ) : <Typography style={{ marginTop: '0.75rem' }}>No Entries Found...</Typography>}
      </CardContent>
    </Card>
  );
};

export default PatientPage;