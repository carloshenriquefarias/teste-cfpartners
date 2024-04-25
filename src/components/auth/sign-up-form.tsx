'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Grid, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

import dayjs from 'dayjs';
// import { Dayjs } from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useState } from 'react';
import { api } from '@/services/api';

import { toast } from 'react-toastify';
import { toastApiResponse } from '@/utils/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import 'react-toastify/dist/ReactToastify.css';

import { ArrowFatLineLeft, ClipboardText, IdentificationCard} from '@phosphor-icons/react';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const schema = zod.object({
  firstName: zod.string().min(1, { message: 'Firstname is required' }),
  lastName: zod.string().min(1, { message: 'Lastname is required' }),
  userName: zod.string().min(1, { message: 'Username is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  birthDate: zod.string().refine((value) => {
    const dateFormatRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateFormatRegex.test(value)) {return false}
    const [day, month, year] = value.split('/');
    return dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD').isValid();
  }, 'Birth date is required'),
  mobile: zod.string()
    .min(1, { message: 'Mobile is required' })
    .regex(/^\d+$/, { message: 'Mobile must contain only digits' }),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  confirmPassword: zod.string().min(6, { message: 'Confirm password should be the same password' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  birthDate: '', 
  mobile: '',
  password: '',
  confirmPassword: '',
} satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>();
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>();
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

  const convertDate = (dateString: string): string => {
    const [month, day, year] = dateString.split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    return formattedDate;
  };

  const { control, handleSubmit,setError, formState: { errors } } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema)
  });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsLoading(true);
      
      // console.log('values 11:08 => ',values)
  
      if (values.password !== values.confirmPassword) {
        handleApiError();
        setIsLoading(false);
        return;
      }

      const convertedDate = convertDate(values.birthDate);
      // console.log('convertedDate 18:48 =>', convertedDate);
  
      if (values.password === values.confirmPassword) {
        try {
          const formData = new FormData();
          formData.append("firstname", values.firstName);
          formData.append("lastname", values.lastName);
          formData.append("username", values.userName);
          formData.append("email", values.email);
          formData.append("mobile", values.mobile);
          formData.append("dateofbirth", convertedDate);
          formData.append("password", values.password);
  
          const registerNewUserEndpoint = '/crud_users/api/v2/user/create';
          const response = await api.post(registerNewUserEndpoint, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
  
          if (response.data.status) {
            toastApiResponse(response, response.data.message);
          }
  
          await new Promise(resolve => setTimeout(resolve, 2000));
          setIsPending(true);
  
          const { error } = await authClient.signUp(values);
  
          if (error) {
            setError('root', { type: 'server', message: error });
            setIsPending(false);
            return;
          }
  
          setIsLoading(false);  
          await checkSession?.();
          router.push(paths.dashboard.customers);

        } catch (error) {
          console.error('Error:', error);
          toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
          setIsLoading(false);
        }
      }
    },
    [checkSession, router, setError]
  );
  
  const handleGoToListUsers = () => {
    router.push(paths.dashboard.customers);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4">User</Typography>

      <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: '-20px', marginLeft: '-7px' }}>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Stack paddingTop={1.5}>
            <IdentificationCard size={45} />
          </Stack>

          <CardHeader
            subheader="Register your data here and create a new account for you"
            title="Register new user"
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.firstName)}>
                <InputLabel>First name</InputLabel>
                <OutlinedInput {...field} label="First name" />
                {errors.firstName ?
                  <FormHelperText>
                    {errors.firstName.message}
                  </FormHelperText> : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.lastName)}>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput {...field} label="Last name" />
                {errors.lastName ? <FormHelperText>{errors.lastName.message}</FormHelperText> : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="userName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.userName)}>
                <InputLabel>User name</InputLabel>
                <OutlinedInput {...field} label="Last name" />
                {errors.userName ? <FormHelperText>{errors.userName.message}</FormHelperText> : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />

          <Controller
              name="mobile"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl error={Boolean(errors.mobile)}>
                  <InputLabel htmlFor="mobile">Mobile</InputLabel>
                  <OutlinedInput
                    {...field}
                    id="mobile"
                    label="Mobile"
                    type='tel'
                    value={formatPhoneNumber(field.value)}
                    onChange={(e) => {
                      // const formattedValue = formatPhoneNumber(e.target.value);
                      // field.onChange(e.target.value); // Set raw value to form state
                      // field.onBlur(); // Mark field as blurred to trigger validation
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

          <FormControl fullWidth error={Boolean(errors.birthDate)}>
            <Controller
              name="birthDate"
              control={control}
              defaultValue=""
              rules={{
                validate: (value) => {
                  try {
                    schema.parse(value);
                    return true;
                  } catch (error) {
                    return false;
                  }
                }
              }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Birth date"
                  value={field.value ? dayjs(field.value, 'DD/MM/YYYY').toDate() : null}
                  onChange={(newValue) => {
                    const formattedValue = newValue ? dayjs(newValue).format('DD/MM/YYYY') : '';
                    field.onChange(formattedValue);
                  }}
                  // renderInput={(params: any) => (
                  //   <TextField
                  //     {...params}
                  //     variant="outlined"
                  //     fullWidth
                  //     error={Boolean(errors.birthDate)}
                  //   />
                  // )}
                  // inputFormat="DD/MM/YYYY"
                />
              )}
            />
            {errors.birthDate && (
              <FormHelperText>{errors.birthDate.message}</FormHelperText>
            )}
          </FormControl>

          <Stack spacing={2} sx={{ alignItems: 'flex-start', width: '100%' }} my={2}>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.password)} sx={{ width: '100%' }}>
                      <InputLabel>Password</InputLabel>
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
                        label="Password"
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

          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              startIcon={isLoading == false && <ClipboardText fontSize="var(--icon-fontSize-md)" />}
              variant="contained"
              type="submit"
              color="primary"
              disabled={isPending}
            >
              {isLoading ? (
                <CircularProgress size={14} color="inherit" />
              ) : (
                'Register'
              )}
            </Button>
          </CardActions>
        </Stack>
      </form>

      <ToastContainer />
    </Stack>
  );
}