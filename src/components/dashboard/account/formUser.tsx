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
import Grid from '@mui/material/Grid';

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
import { ArrowFatLineLeft, FileText, PencilLine } from '@phosphor-icons/react';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';

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
  // confirmPassword: zod
  // .string()
  // .min(6, { message: 'Confirm password should be at least 6 characters' })
  // confirmPassword: zod
  //   .string()
  //   .min(6, { message: 'Confirm password should be at least 6 characters' })
  //   .refine(({value, data} : any) => {
  //     return data.password === value;
  //   }, {
  //     message: 'Passwords do not match',
  //     path: ['confirmPassword'],
  //   }),
});

type FormValues = zod.infer<typeof schema>;

export default function FormUser({ user }: any) {

  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState<boolean>();
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2024-10-10'));

  const [formattedMobile, setFormattedMobile] = useState('');

  const formatPhoneNumber = (value: any) => {
    const cleaned = value.replace(/\D/g, '');
    let formattedValue = '';
    if (cleaned.length > 0) {
      formattedValue = `(${cleaned.slice(0, 3)})`;
      if (cleaned.length > 3) {
        formattedValue += ` ${cleaned.slice(3, 8)}`;
        if (cleaned.length > 8) {
          formattedValue += `-${cleaned.slice(8, 12)}`;
        }
      }
    }
    return formattedValue;
  };

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      // id: user?.id || '', 
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      username: user?.username || '',
      email: user?.email || '',
      // birthDate: user?.firstname || '', 
      mobile: user?.mobile || '',
      password: user?.password || '',
      // confirmPassword: user?.confirmPassword || '', 
    }, resolver: zodResolver(schema),
  });

  const onSubmit = React.useCallback(
    async (values: any): Promise<void> => {
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

  const handleGoToListUsers = () => {
    router.push(paths.dashboard.customers);
  };

  useEffect(() => {
    // Se houver um número inicial passado, formate-o e atualize o estado
    if (user?.mobile) {
      const formatted = formatPhoneNumber(user?.mobile);
      setFormattedMobile(formatted);
    }
  }, [user?.mobile]);

  return (
    <>
      <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center'}}>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Stack paddingTop={1.5}>
            <PencilLine size={40} />            
          </Stack>
          <CardHeader 
              subheader="Edit your data here and update as much as possible you wish" 
              title="Your currently personal data"
            />
        </Stack>

        <Stack pt={3}>
          <Button
            startIcon={<ArrowFatLineLeft fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            color="info"  
            onClick={handleGoToListUsers}          
          >
            List users
          </Button>
        </Stack>
      </CardActions>

      <Divider/>

      <Stack spacing={2} sx={{ alignItems: 'flex-start', width:'100%' }} my={2}></Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
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

          {/* <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.mobile)}>
                <InputLabel htmlFor="mobile">
                  Phone
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
          /> */}

          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.mobile)}>
                <InputLabel htmlFor="mobile">Phone</InputLabel>
                <OutlinedInput
                  {...field}
                  id="mobile"
                  label="Phone"
                  value={formattedMobile}
                  onChange={(e) => {
                    // Atualiza o estado com o valor formatado do telefone
                    setFormattedMobile(formatPhoneNumber(e.target.value));

                    // Remove caracteres não numéricos e atualiza o campo no formulário
                    const cleanedValue = e.target.value.replace(/\D/g, '');
                    field.onChange(cleanedValue);
                  }}
                />
                {errors.mobile && (
                  <FormHelperText>{errors.mobile.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          {/* <Controller
            name="firstname"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.firstname)}>
                <InputLabel htmlFor="firstname">
                  Birth date
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

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
              <DateTimePicker
                label="Birth date"
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>

          <Stack direction="row" sx={{ alignItems: 'center' }}>
            <Stack paddingTop={1.5}>
              <FileText size={40} />             
            </Stack>
            <CardHeader 
                subheader="If you wish to change your password insert your above your new data" 
                title="Change password"
              />
          </Stack>
            
          <Divider />

          <Stack spacing={2} sx={{ alignItems: 'flex-start', width:'100%' }} my={2}>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.password)} sx={{ width:'100%' }}>
                    <InputLabel>New password</InputLabel>
                    <OutlinedInput
                      {...field}
                      endAdornment={
                        showPassword ? (
                          <EyeIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={(): void => {
                              setShowPassword(false);
                            }}
                          />
                        ) : (
                          <EyeSlashIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={(): void => {
                              setShowPassword(true);
                            }}
                          />
                        )
                      }
                      label="New password"
                      type={showPassword ? 'text' : 'password'}
                    />
                    {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
              </Grid>

              <Grid item lg={6} xs={12}>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.password)} sx={{ width:'100%' }}>
                    <InputLabel>Confirm password</InputLabel>
                    <OutlinedInput
                      {...field}
                      endAdornment={
                        showPassword ? (
                          <EyeIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={(): void => {
                              setShowPassword(false);
                            }}
                          />
                        ) : (
                          <EyeSlashIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={(): void => {
                              setShowPassword(true);
                            }}
                          />
                        )
                      }
                      label="Confirm password"
                      type={showPassword ? 'text' : 'password'}
                    />
                    {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
              </Grid>
            </Grid>
          </Stack>
        </Stack>

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
      </form>
    </>
  )
}