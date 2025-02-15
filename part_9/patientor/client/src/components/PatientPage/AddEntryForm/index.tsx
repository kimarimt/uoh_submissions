import { SyntheticEvent, useState } from 'react';
import { Alert, Box, Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { EntryFormValues, Patient } from '../../../types';
import patientsService from '../../../services/patients';
import { parseErrors } from '../../../utils/helpers';
import { AxiosError } from 'axios';

interface Props {
  patient: Patient | null;
  onSubmit: (patientData: Patient) => void;
}

const AddEntryForm = ({ patient, onSubmit }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string | undefined>(undefined);
  const [type, setType] = useState('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [rating, setRating] = useState(0);

  const toggleForm = (state: boolean) => {
    setIsVisible(state);
  };

  const resetFields = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes('');
    setRating(0);
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const newEntry: EntryFormValues = {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(', ') : undefined,
      healthCheckRating: rating 
    };

    try {
      const updatedPatient = await patientsService.addEntry(patient!.id, newEntry);
      onSubmit(updatedPatient);
      resetFields();
      setIsVisible(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        toggleAlert(parseErrors(error));
      }
    }
  };

  const toggleAlert = (message: string | undefined) => {
    setErrorMessages(message);

    setTimeout(() => {
      setErrorMessages(undefined);
    }, 3000);
  };

  return (
    <>
      {
        isVisible ? ( 
          <Box sx={{ marginBottom: '1rem' }}>
            <Typography variant='h6' sx={{ marginBottom: '0.75rem' }}>New Entry</Typography>
            { errorMessages && 
              <Alert severity='error' sx={{ marginBottom: '0.75rem', whiteSpace: 'pre-wrap', alignContent: 'center'  }}>{ errorMessages }</Alert> 
            }
            <form style={{ marginBottom: '1rem' }} onSubmit={handleSubmit}>
              <FormControl variant='standard' fullWidth required>
                <InputLabel id='type-label'>Type</InputLabel>
                <Select
                  labelId='type-label'
                  value={type}
                  onChange={({ target }) => setType(target.value)}
                >
                  <MenuItem value='HealthCheck'>Health Check</MenuItem>
                </Select>
              </FormControl>
              <TextField 
                label='Description'
                variant='standard'
                value={description}
                onChange={({ target }) => setDescription(target.value)}
                fullWidth
                required
              />
              <TextField 
                label='Date'
                variant='standard'
                value={date}
                onChange={({ target }) => setDate(target.value)}
                fullWidth
                required
              />
              <TextField 
                label='Specialist'
                variant='standard'
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
                fullWidth
                required
              />
              <TextField 
                label='Diagnosis Code'
                variant='standard'
                value={diagnosisCodes}
                onChange={({ target }) => setDiagnosisCodes(target.value)}
                fullWidth
              /> 
              <TextField 
                label='HealthCheck Rating'
                variant='standard'
                type='number'
                value={rating}
                onChange={({ target }) => setRating(Number(target.value))}
                fullWidth
                required
              />
              <ButtonGroup sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Button color='error' variant='contained' onClick={() => toggleForm(false)}>Cancel</Button>
                <Button variant='contained' type='submit'>Submit</Button>
              </ButtonGroup>
            </form>
          </Box>
        ) : (
          <Box>
            <Button onClick={() => toggleForm(true)} variant='contained' sx={{ display: 'block', margin: '1rem 0' }}>Add Entry</Button>
          </Box>
        )
      }
    </>
  );
};

export default AddEntryForm;
