import { useEffect, useState } from "react";
import { Gender, Patient } from "../../types";
import patientsService from "../../services/patients";
import { useMatch } from "react-router-dom";
import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import EntriesList from "./EntriesList";
import { Female, Male, Person } from "@mui/icons-material";

const PatientPage = () => {
  const match = useMatch('/patients/:id');
  const [patient, setPatient] = useState<Patient | null>(null);

  const genderIcon = () => {
    switch (patient?.gender) {
    case Gender.Female:
      return <Female />;
    case Gender.Male:
      return <Male />;
    case Gender.Other:
      return <Person />;
    }
  };

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
      <CardHeader title={patient?.name} subheader={genderIcon()} />
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