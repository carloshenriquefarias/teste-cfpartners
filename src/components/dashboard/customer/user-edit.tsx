'use client';

import * as React from 'react';

import UserEditForm from './user-edit-form';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Stack, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';

import "react-toastify/ReactToastify.min.css";  

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

// export function UserEdit({ userId }: any): React.JSX.Element {
export function UserEdit({ userId: editedUserId }: any): React.JSX.Element {

  const [user, setUser] = useState<User>();

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
    fetchAllUsers(editedUserId)
  }, [editedUserId])

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
          {user && <UserEditForm user={user} />}
        </CardContent>
      </Card>
    </>
  );
}