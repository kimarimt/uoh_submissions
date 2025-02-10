import { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Diagnosis } from "../../types";
import diagnosesService from "../../services/diagnoses";

interface Props {
  codes: Array<Diagnosis['code']> | undefined;
}

const DiagnosisList = ({ codes }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  
  useEffect(() => {
    const fetchDiagnoses = async () => {
      if (codes) {
        try {
          const diagnosisData = await diagnosesService.getAll();
          const patientDiagnosis = diagnosisData.filter(data => 
            codes.includes(data.code)
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
  }, [codes]);

  if (!diagnoses) {
    return null;
  }
  
  return ( 
    diagnoses.length > 0 && (
      <>
        <Typography sx={{ margin: '0.75rem 0 0.25rem' }}>
          Diagnoses
        </Typography>
        <List sx={{ padding: 0, marginBottom: '0.25rem' }}>
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