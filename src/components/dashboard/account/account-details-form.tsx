'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { UploadSimple } from '@phosphor-icons/react/dist/ssr/UploadSimple';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const states = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'los-angeles', label: 'Los Angeles' },
] as const;

export function AccountDetailsForm(): React.JSX.Element {

  const { id: userId } = useParams<{ id: string }>();

  const [dataUserToEdit, setDataUserToEdit] = useState<any>(
    {
      id: '1',
      firstName: 'Jr',
      lastName: 'Finn',
      userName: 'Jr Finn',
      email: 'jr.finn@devias.io',
      phone: '415-907-2647',
      birthDate: '2024-12-12',
      // avatar: '/assets/avatar-9.png',
      // address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
      createdAt: dayjs().subtract(2, 'hours').toDate(),
    },
  );

  const [value, setValue] = React.useState<Dayjs | null>(dayjs(dataUserToEdit.birthDate));

  const handleInputChanges = (e: any) => {
    const { name, value } = e.target;
    setDataUserToEdit((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleUpdateUser = () => {
    console.log('update user =>', dataUserToEdit)  
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="Update your data" title="Edit profile"/>

        <Divider />

        <CardContent>
          <Grid container spacing={3}>
          {/* <p>UserID: {userId}</p> */}
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>First name</InputLabel>
                <OutlinedInput 
                  // variant='filled'
                  value={dataUserToEdit.firstName}
                  onChange={handleInputChanges}
                  defaultValue={dataUserToEdit.firstName} 
                  label="First name" 
                  name="firstName" 
                />
              </FormControl>
            </Grid>

            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput 
                  // defaultValue="Rivers" 
                  value={dataUserToEdit.lastName}
                  onChange={handleInputChanges}
                  defaultValue={dataUserToEdit.lastName}
                  label="Last name" 
                  name="lastName" 
                />
              </FormControl>
            </Grid>

            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>User name</InputLabel>
                <OutlinedInput 
                  value={dataUserToEdit.userName}
                  onChange={handleInputChanges}
                  defaultValue={dataUserToEdit.userName}
                  label="User name" 
                  name="userName" 
                />
              </FormControl>
            </Grid>

            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput 
                value={dataUserToEdit.email}
                onChange={handleInputChanges}
                defaultValue={dataUserToEdit.email}
                label="Email address" 
                name="email" 
                />
              </FormControl>
            </Grid>

            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Phone number</InputLabel>
                <OutlinedInput 
                value={dataUserToEdit.phone}
                onChange={handleInputChanges}
                defaultValue={dataUserToEdit.phone}
                label="Phone number" 
                name="phone" 
                type="tel" 
                />
              </FormControl>
            </Grid>

            {/* <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select defaultValue="New York" label="State" name="state" variant="outlined">
                  {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}

            <Grid md={6} xs={12} mt={-1}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                      <DateTimePicker
                        label="Birth date"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        // value={dataUserToEdit.birthDate}
                        // onChange={handleInputChanges}
                        // defaultValue={dataUserToEdit.birthDate}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>

          

            {/* <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Birth date</InputLabel>
                <OutlinedInput label="Date" />
              </FormControl>
            </Grid>
          </Grid> */}
        </CardContent>

        <Divider />
        
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button 
            startIcon={<UploadSimple fontSize="var(--icon-fontSize-md)" />} 
            variant="contained" 
            onClick={handleUpdateUser}
          >
            Update user
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
