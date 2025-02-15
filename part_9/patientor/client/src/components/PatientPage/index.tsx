import { useEffect, useState } from "react";
import { Gender, Patient } from "../../types";
import patientsService from "../../services/patients";
import { useMatch } from "react-router-dom";
import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import EntriesList from "./EntriesList";
import { Female, Male, Person } from "@mui/icons-material";
import AddEntryForm from "./AddEntryForm";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const match = useMatch('/patients/:id');

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

  const updatePerson = (patientData: Patient) => {
    setPatient(patientData);
  };
  
  return (
    <Card style={{ marginTop: '1.5rem' }}>
      <CardHeader title={patient?.name} subheader={genderIcon()} />
      <Divider />
      <CardContent>
        <Typography variant='overline'>
          Occupation: {patient?.occupation}
        </Typography>
        <AddEntryForm patient={patient} onSubmit={updatePerson} />
        <EntriesList patient={patient} />
      </CardContent>
    </Card>
  );
};

export default PatientPage;