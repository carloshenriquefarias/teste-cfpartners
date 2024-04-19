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
import { useEffect, useState } from 'react';
import { api } from '@/services/api';

import { toastApiResponse } from '@/utils/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";  

import { useRouter } from 'next/navigation';
import { paths } from '@/paths';

const states = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'los-angeles', label: 'Los Angeles' },
] as const;

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export function AccountDetailsForm({ userId }: any): React.JSX.Element {

  const router = useRouter();

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
  const [user, setUser] = useState<User|undefined>(undefined);
  // console.log('Usuário encontrado: 17:43', user);

  const fetchAllUsers = async (userId: string) => {
    try {

      const response = await api.post('/crud_users/api/v2/users');
      const allUsers = response.data?.data || [];
  
      const foundUser = allUsers.find((user: any) => user.id === userId);
  
      if (foundUser) {
        setUser(foundUser);
      }
  
    } catch (error) {
      console.error('Error to found users', error);
    }
  };

  const handleInputChanges = (e: any) => {
    const { name, value } = e.target;
    setDataUserToEdit((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setUser((prevUser) => ({
  //     ...(prevUser || {}), 
  //     [name]: value,
  //   }));
  // };

  // const handleUpdateUser = () => {
  //   console.log('update user =>', dataUserToEdit)  
  // };

  async function handleUpdateUser() {
    if (user) {
      try {
        const formData = new FormData();
        formData.append("firstname", user.firstname);
        formData.append("lastname", user.lastname);
        formData.append("email", user.email);
        formData.append("mobile", user.mobile);
        formData.append("username", user.username);
        formData.append("password", user.password);
        formData.append("id", user.id);
  
        const editUserEndpoint = '/crud_users/api/v2/user/update';  
        const response = await api.post(editUserEndpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        if (response.data.status) {
          toastApiResponse(response, response.data.message);
        }
  
        await new Promise(resolve => setTimeout(resolve, 2000));
  
        router.push(paths.dashboard.customers);
  
      } catch (error) {
        console.error('Error:', error);
        toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
      }
    } else {
      console.warn('No user data available to update.');
    }
  }  

  useEffect(() => {    
    fetchAllUsers(userId)
  }, [userId])

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
          {user && (     
            <Grid container spacing={3}>
              {/* <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>First name</InputLabel>
                  <OutlinedInput 
                    // variant='filled'
                    value={user.firstname}
                    onChange={handleInputChanges}
                    defaultValue={user.firstname} 
                    label="First name" 
                    name="firstName" 
                  />
                </FormControl>
              </Grid> */}

              <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>First name</InputLabel>
                  <OutlinedInput
                    value={user?.firstname || ''}
                    onChange={handleInputChanges}
                    label="First name"
                    name="firstname"
                  />
                </FormControl>
              </Grid>

              <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Last name</InputLabel>
                  <OutlinedInput 
                    // defaultValue="Rivers" 
                    value={user?.lastname || ''}
                    onChange={handleInputChanges}
                    defaultValue={user.lastname}
                    label="Last name" 
                    name="lastName" 
                  />
                </FormControl>
              </Grid>

              <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>User name</InputLabel>
                  <OutlinedInput 
                    value={user?.username || ''}
                    onChange={handleInputChanges}
                    defaultValue={user.username}
                    label="User name" 
                    name="userName" 
                  />
                </FormControl>
              </Grid>

              <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Email address</InputLabel>
                  <OutlinedInput 
                  value={user?.email || ''}
                  onChange={handleInputChanges}
                  defaultValue={user.email}
                  label="Email address" 
                  name="email" 
                  />
                </FormControl>
              </Grid>

              <Grid md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Phone number</InputLabel>
                  <OutlinedInput 
                  value={user?.mobile || ''}
                  onChange={handleInputChanges}
                  defaultValue={user.mobile}
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
                        // value={user.birthDate}
                        // onChange={handleInputChanges}
                        // defaultValue={user.birthDate}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </FormControl>
                </Grid>
            </Grid>
          )}

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

        <ToastContainer />

      </Card>
    </form>
  );
}
