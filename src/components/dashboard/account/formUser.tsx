'use client';

import * as React from 'react';

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Stack, TextField } from '@mui/material';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';

import { toast } from 'react-toastify';
import { toastApiResponse } from '@/utils/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/navigation';
import { paths } from '@/paths';

import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { ArrowFatLineLeft, FileText, PencilLine } from '@phosphor-icons/react';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { UploadSimple } from '@phosphor-icons/react/dist/ssr/UploadSimple';
interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  mobile: string;
  birthDate: string;
  password: string;
}

const schema = zod.object({
  firstname: zod.string().min(1, { message: 'First name is required' }),
  lastname: zod.string().min(1, { message: 'Last name is required' }),
  username: zod.string().min(1, { message: 'User name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  birthDate: zod.string().min(1, { message: 'Date is required' }),
  mobile: zod.string()
    .min(1, { message: 'Mobile is required' })
    .regex(/^\d+$/, { message: 'Mobile must contain only digits' }),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }).optional(),
  confirmPassword: zod.string().min(6, { message: 'Confirm password should be the same password' }).optional(),
});

type FormValues = zod.infer<typeof schema>;

export default function FormUser({ user }: any) {

  const router = useRouter();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState<boolean>();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>();

  const [formattedMobile, setFormattedMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleApiError = () => {
    const title = 'Your password is incorrect. Please try again';
    toast.error(title, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

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
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      username: user?.username || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      birthDate: user?.dateofbirth || '',
      password: '',
      confirmPassword: '',
    }, resolver: zodResolver(schema),
  });

  function extractDate(dateTimeString: string) {
    const datePart = dateTimeString.split(' ')[0];
    return datePart;
  }

  const onSubmit = React.useCallback(
    async (values: any): Promise<void> => {
      setIsLoading(true);

      if (values.password !== values.confirmPassword) {
        handleApiError();
        setIsLoading(false);
        return;
      }

      try {
        const formData = new FormData();
        formData.append("firstname", values.firstname);
        formData.append("lastname", values.lastname);
        formData.append("email", values.email);
        formData.append("mobile", values.mobile);
        formData.append("username", values.username);
        formData.append("dateofbirth", values.birthDate);
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

        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push(paths.dashboard.customers);
        setIsLoading(false);

      } catch (error) {
        console.error('Error:', error);
        toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
        setIsLoading(false);
      }
    },
    []
  );

  const handleGoToListUsers = () => {
    router.push(paths.dashboard.customers);
  };

  useEffect(() => {
    if (user?.mobile) {
      const formatted = formatPhoneNumber(user?.mobile);
      setFormattedMobile(formatted);
    }
  }, [user?.mobile]);

  return (
    <>
      <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
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

      <Divider />

      <Stack spacing={2} sx={{ alignItems: 'flex-start', width: '100%' }} my={2} />

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

          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.mobile)}>
                <InputLabel htmlFor="mobile">Mobile</InputLabel>
                <OutlinedInput
                  {...field}
                  id="mobile"
                  label="Mobile"
                  value={formattedMobile}
                  onChange={(e) => {
                    setFormattedMobile(formatPhoneNumber(e.target.value));
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

          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.birthDate)}>
                <TextField
                  {...field}
                  id="birthDate"
                  label="Birth date"
                  type="date"
                  value={extractDate(field.value)}
                  onChange={field.onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {errors.birthDate && (
                  <FormHelperText>
                    {errors.birthDate.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Stack direction="row" sx={{ alignItems: 'center' }}>
            <Stack paddingTop={1.5}>
              <FileText size={40} />
            </Stack>
            <CardHeader
              subheader="If you wish to change your password insert your new data above"
              title="Change password"
            />
          </Stack>

          <Divider />

          <Stack spacing={2} sx={{ alignItems: 'flex-start', width: '100%' }} my={2}>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
                <Controller
                  control={control}
                  name="password"
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.password)} sx={{ width: '100%' }}>
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
                  name="confirmPassword"
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.confirmPassword)} sx={{ width: '100%' }}>
                      <InputLabel>Confirm password</InputLabel>
                      <OutlinedInput
                        {...field}
                        endAdornment={
                          showConfirmPassword ? (
                            <EyeIcon
                              cursor="pointer"
                              fontSize="var(--icon-fontSize-md)"
                              onClick={(): void => {
                                setShowConfirmPassword(false);
                              }}
                            />
                          ) : (
                            <EyeSlashIcon
                              cursor="pointer"
                              fontSize="var(--icon-fontSize-md)"
                              onClick={(): void => {
                                setShowConfirmPassword(true);
                              }}
                            />
                          )
                        }
                        label="Confirm password"
                        type={showConfirmPassword ? 'text' : 'password'}
                      />
                      {errors.confirmPassword ? <FormHelperText>{errors.confirmPassword.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Stack>
        </Stack>

        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            startIcon={isLoading == false && <UploadSimple fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={14} color="inherit" />
            ) : (
              'Update user'
            )}
          </Button>
        </CardActions>
      </form>
      <ToastContainer />
    </>
  )
}