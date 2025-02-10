import { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Diagnosis, Patient } from "../../types";
import diagnosesService from "../../services/diagnoses";

interface Props {
  patient: Patient
}

const DiagnosisList = ({ patient }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  
  useEffect(() => {
    const fetchDiagnoses = async () => {
      if (patient && patient?.entries.length > 0) {
        try {
          const diagnosisData = await diagnosesService.getAll();
          const patientCodes = patient.entries
            .map(entry => entry.diagnosisCodes)
            .reduce((acc, val) => acc?.concat(val!), []);

          const patientDiagnosis = diagnosisData.filter(data => 
            patientCodes?.includes(data.code)
          );

          setDiagnoses(patientDiagnosis);
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(error.message);
          }
        }
      }
    };

    fetchDiagnoses();
  }, [patient]);

  if (!diagnoses) {
    return null;
  }
  
  return ( 
    diagnoses.length > 0 && (
      <>
        <Typography sx={{ margin: '1rem 0 0.5rem' }}>
          Diagnoses
        </Typography>
        <List sx={{ padding: 0 }}>
          {diagnoses.map(diagnosis => (
            <ListItem key={diagnosis.code} sx={{ padding: 0, margin: 0 }}>
              <ListItemText>
                <Typography variant='body2'>
                  {diagnosis.code} {diagnosis.name}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </>
    )
  );
}; 

export default DiagnosisList;