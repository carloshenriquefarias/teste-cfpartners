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

import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Controller, useForm } from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Stack } from '@mui/material';

// interface User {
//   id: string;
//   firstname: string;
// }

interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
  // created_at: string;
  // updated_at: string;
  // deleted_at: string | null;
}

// const schema = zod.object({
//   firstname: zod.string().min(1, { message: 'First name is required' }),
// });

const schema = zod.object({
  firstname: zod.string().min(1, { message: 'First name is required' }),
  lastname: zod.string().min(1, { message: 'Last name is required' }),
  username: zod.string().min(1, { message: 'Last name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  // birthDate: zod.date().min(new Date(1900, 0, 1), { message: 'Invalid birth date' }),
  // terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
  mobile: zod.string()
  .min(1, { message: 'Phone number is required' })
  .regex(/^\d+$/, { message: 'Phone number must contain only digits' }),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
});

type FormValues = zod.infer<typeof schema>;

export default function FormUser({user}: any) {

  const router = useRouter();

  const dataUserToEdit = {
    id: '1',
    firstname: 'Jr',
    lastname: 'Finn',
    username: 'Jr Finn',
    email: 'jr.finn@devias.io',
    mobile: '415-907-2647',
    password: '2024-12-12',
    // birthDate: '2024-12-12',
    // avatar: '/assets/avatar-9.png',
    // address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    // createdAt: dayjs().subtract(2, 'hours').toDate(),
  }

  const { control, handleSubmit, formState: { errors }} = useForm<FormValues>({
    defaultValues: {
      // id: user?.id || '', 
      firstname: user?.firstname || '', 
      lastname: user?.lastname || '', 
      username: user?.username || '', 
      email: user?.email || '', 
      // birthDate: user?.firstname || '', 
      mobile: user?.mobile || '', 
      password: user?.password || '', 
      // confirm_password: user?.confirm_password || '', 
    }, resolver: zodResolver(schema),
  });
  
  const onSubmit = React.useCallback(
    async (values: any): Promise<void> => {

      console.log('user values 16:34', values.id);

      try {

        const formData = new FormData();
        formData.append("firstname", values.firstname);
        formData.append("lastname", values.lastname);
        formData.append("email", values.email);
        formData.append("mobile", values.mobile);
        formData.append("username", values.username);
        formData.append("password", values.password);
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
    },
    []
  );
  
  // const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setUser((prevUser) => ({
  //     ...(prevUser || {}), 
  //     [name]: value,
  //   }));
  // };

  // async function handleUpdateUsers() {
  //   if (user) {
  //     try {

  //       const dataToUpdate = {
  //         firstname: user.firstname,
  //         lastname: user.lastname,
  //         email: user.email,
  //         mobile: user.mobile,
  //         username: user.username,
  //         // password: <PASSWORD>,
  //       }

  //       // return

  //       const formData = new FormData();
  //       formData.append("firstname", user.firstname);
  //       formData.append("lastname", user.lastname);
  //       formData.append("email", user.email);
  //       formData.append("mobile", user.mobile);
  //       formData.append("username", user.username);
  //       formData.append("password", user.password);
  //       formData.append("id", user.id);
  
  //       const editUserEndpoint = '/crud_users/api/v2/user/update';  
  //       const response = await api.post(editUserEndpoint, formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data'
  //         }
  //       });
  
  //       if (response.data.status) {
  //         toastApiResponse(response, response.data.message);
  //       }
  
  //       await new Promise(resolve => setTimeout(resolve, 2000));
  
  //       router.push(paths.dashboard.customers);
  
  //     } catch (error) {
  //       console.error('Error:', error);
  //       toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
  //     }
  //   } else {
  //     console.warn('No user data available to update.');
  //   }
  // }  

  // useEffect(() => {    
  //   setUser(userData)
  // }, [userData])

  return (
    // {user && (

    // <Grid container spacing={3} lg={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>

          {/* <Grid lg={12} xs={12}> */}
            <Controller
              name="firstname"
              control={control}
              render={({ field }) => (
                <FormControl error={Boolean(errors.firstname)}>
                  <InputLabel htmlFor="firstname">
                    First name
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    id="firstname"
                    label="First name"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {errors.firstname && (
                    <FormHelperText>
                      {errors.firstname.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          {/* </Grid> */}

          {/* <Grid md={12} xs={12}> */}
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <FormControl error={Boolean(errors.lastname)}>
                  <InputLabel htmlFor="lastname">
                    Last name
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    id="lastname"
                    label="Last name"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {errors.lastname && (
                    <FormHelperText>
                      {errors.lastname.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          {/* </Grid> */}

          {/* <Grid md={12} xs={12}> */}
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <FormControl error={Boolean(errors.username)}>
                  <InputLabel htmlFor="lastname">
                    User name
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    id="username"
                    label="User name"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {errors.username && (
                    <FormHelperText>
                      {errors.username.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          {/* </Grid> */}

          {/* <Grid md={12} xs={12}> */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormControl error={Boolean(errors.email)}>
                  <InputLabel htmlFor="email">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    id="email"
                    label="email"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {errors.email && (
                    <FormHelperText>
                      {errors.email.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          {/* </Grid> */}

          {/* <Grid md={12} xs={12}> */}
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <FormControl error={Boolean(errors.mobile)}>
                  <InputLabel htmlFor="mobile">
                    Phone number
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    id="mobile"
                    label="mobile"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {errors.mobile && (
                    <FormHelperText>
                      {errors.mobile.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          {/* </Grid> */}

          {/* <Grid md={12} xs={12}> */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl error={Boolean(errors.password)}>
                  <InputLabel htmlFor="password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    id="password"
                    label="Password"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {errors.password && (
                    <FormHelperText>
                      {errors.password.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          {/* </Grid> */}

          {/* <Controller
            name="firstname"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.firstname)}>
                <InputLabel htmlFor="firstname">
                  First name
                </InputLabel>
                <OutlinedInput
                  {...field}
                  id="firstname"
                  label="First name"
                  value={field.value}
                  onChange={field.onChange}
                />
                {errors.firstname && (
                  <FormHelperText>
                    {errors.firstname.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          /> */}

          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button 
              startIcon={<UploadSimple fontSize="var(--icon-fontSize-md)" />} 
              variant="contained" 
              type="submit"
              color="primary"
            >
              Update user
            </Button>
          </CardActions>

          {/* <Button type="submit" variant="contained" color="primary">
            Update user
          </Button> */}
      </Stack>
        </form>
    // </Grid>

    // )}
  )
}