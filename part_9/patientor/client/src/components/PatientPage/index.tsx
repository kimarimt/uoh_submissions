import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientsService from "../../services/patients";
import { useMatch } from "react-router-dom";
import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import EntriesList from "./EntriesList";

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
        <EntriesList patient={patient} />
      </CardContent>
    </Card>
  );
};

export default PatientPage;