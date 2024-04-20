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
import FormUser from './formUser';
import { Stack, Typography } from '@mui/material';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { UserCircle } from '@phosphor-icons/react';


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

  const [user, setUser] = useState<User>();
  
  
  // const [dataUserToEdit, setDataUserToEdit] = useState<any>(
  //   {
  //     id: '1',
  //     firstName: 'Jr',
  //     lastName: 'Finn',
  //     userName: 'Jr Finn',
  //     email: 'jr.finn@devias.io',
  //     phone: '415-907-2647',
  //     birthDate: '2024-12-12',
  //     // avatar: '/assets/avatar-9.png',
  //     // address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
  //     createdAt: dayjs().subtract(2, 'hours').toDate(),
  //   },
  // );

  // const [value, setValue] = React.useState<Dayjs | null>(dayjs(dataUserToEdit.birthDate));

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

  useEffect(() => {    
    fetchAllUsers(userId)
  }, [userId])

  return (
    <>
      <Stack spacing={0} mb={3}>
        <Card>
          
          <Stack direction="row" spacing={2} padding={3} sx={{ alignItems: 'center' }}>
            <UserCircle size={75} color='gray'/>
            {user && 
              <Stack direction="column" spacing={0} sx={{ alignItems: 'flex-start' }}>
                <Typography variant="h4" color={'gray'}>{user.username}</Typography>
                <Typography fontSize={'16px'} color={'gray'}>{user.email}</Typography>
              </Stack>
            }
          </Stack>
        </Card>
      </Stack>

      <Card>
        <CardContent>
          {user && <FormUser user={user} />}
        </CardContent>
      </Card>
    </>
  );
}