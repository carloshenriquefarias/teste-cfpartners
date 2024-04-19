'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

// import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Snackbar from "@mui/material/Snackbar";
import { useState } from 'react';
import { api } from '@/services/api';

import { toastApiResponse } from '@/utils/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";  

interface FormDataUser {
  firstName: string;
  lastName: string;
  userName?: string; // Campo opcional
  email: string;
  phoneNumber: string;
  password: string;
  // terms?: boolean; // Campo opcional (comentado conforme o exemplo original)
}

const schema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required' }),
  lastName: zod.string().min(1, { message: 'Last name is required' }),
  userName: zod.string().min(1, { message: 'Last name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  // birthDate: zod.date().min(new Date(1900, 0, 1), { message: 'Invalid birth date' }),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  // terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
  phoneNumber: zod.string()
  .min(1, { message: 'Phone number is required' })
  .regex(/^\d+$/, { message: 'Phone number must contain only digits' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { 
  firstName: '', 
  lastName: '', 
  userName: '', 
  email: '', 
  // birthDate: '', 
  phoneNumber: '', 
  password: '', 
  // terms: false 
} satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2024-10-10'));
  // const [snackbar, setSnackbar] = useState(null);
  // const [open, setOpen] = useState(false);
  // const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, 
    resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const formData = new FormData();
      formData.append("firstname", values.firstName);
      formData.append("lastname", values.lastName);
      formData.append("email", values.email);
      formData.append("mobile", values.phoneNumber);
      formData.append("username", values.userName);
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

      const { error } = await authClient.signUp(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      await checkSession?.();
      
      // router.refresh();
      router.push(paths.dashboard.customers);
    },
    [checkSession, router, setError]
  );

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <UsersIcon size={32}/>
          <Typography variant="h5">Register a new user</Typography>
        </Stack>

        {/* <Typography variant="h5">Sign up</Typography> */}
        {/* <Typography color="text.secondary" variant="body2">
          Already have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
            Sign in
          </Link>
        </Typography> */}
      </Stack>

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
              <FormControl error={Boolean(errors.firstName)}>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput {...field} label="Last name" />
                {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
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
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <FormControl error={Boolean(errors.phoneNumber)}>
                <InputLabel>Phone number</InputLabel>
                <OutlinedInput {...field} label="Phone number" type="tel" />
                {errors.phoneNumber ? <FormHelperText>{errors.phoneNumber.message}</FormHelperText> : null}
              </FormControl>
            )}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
              <DateTimePicker
                label="Phone number"
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput {...field} label="Password" type="password" />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />

          {/* <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <div>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={
                    <React.Fragment>
                      I have read the <Link>terms and conditions</Link>
                    </React.Fragment>
                  }
                />
                {errors.terms ? <FormHelperText error>{errors.terms.message}</FormHelperText> : null}
              </div>
            )}
          /> */}

          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}

          <Button disabled={isPending} type="submit" variant="contained">
            Sign up
          </Button>
        </Stack>
      </form>

      <ToastContainer />

      {/* <Alert color="warning">Created users are not persisted</Alert> */}

    </Stack>
  );
}
