'use client';

import * as React from 'react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { Trash } from '@phosphor-icons/react/dist/ssr/Trash';
import { PencilLine } from '@phosphor-icons/react/dist/ssr/PencilLine';

import Modal from './modal';

import { toastApiResponse } from '@/utils/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export interface Users {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  mobile: string;
  dateofbirth: string;
  password: string;
}

export function UsersListTable() {

  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState<Users[]>([]);
  const [rechargeListUsers, setRechargeListUsers] = useState(false);

  const handleOpenModal = (userId: any) => {
    setSelectedUserId(userId);
    setOpen(true);
  };

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handleClickEditUser = async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push(`/dashboard/customers/edit/${userId}`);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  const fetchAllUsers = async () => {
    try {
      const response = await api.post('/crud_users/api/v2/users');
      const newsResponse = response.data;
      setUsers(newsResponse?.data)

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load users details');
    }
  };

  const handleDeleteUser = async () => {
    if (selectedUserId) {
      try {
        const formData = new FormData();
        formData.append("id", selectedUserId);

        const deleteUserEndpoint = '/crud_users/api/v2/user/delete';
        const response = await api.post(deleteUserEndpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.status) {
          toastApiResponse(response, response.data.message);
        }

        setRechargeListUsers(true);
        handleCloseModal();

      } catch (error) {
        toastApiResponse(null, 'It is not possible to delete this user');
      }
    }
  };

  const formatPhoneNumber = (value: string) => {
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

  useEffect(() => {
    fetchAllUsers();
    setRechargeListUsers(false);
  }, [rechargeListUsers]);

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>User name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Birth date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.length > 0 && users.map((user, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                    <Typography variant="subtitle2">{user.firstname}</Typography>
                  </Stack>
                </TableCell>

                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{(formatPhoneNumber(user.mobile))}</TableCell>
                <TableCell>{(formatDate(user.dateofbirth))}</TableCell>

                <TableCell>
                  <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                    <Button
                      startIcon={<PencilLine fontSize="var(--icon-fontSize-md)" />}
                      variant="contained"
                      onClick={() => handleClickEditUser(user.id)}
                      sx={{
                        backgroundColor: '#00aaff',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#1481b8',
                          color: 'white',
                        }
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      startIcon={<Trash fontSize="var(--icon-fontSize-md)" />}
                      variant="contained"
                      onClick={() => { handleOpenModal(user.id) }}
                      sx={{ backgroundColor: '#ff6961', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Modal
        open={open}
        handleClose={handleCloseModal}
        handleDeleteUserById={handleDeleteUser}
      />

      <Divider />
      <ToastContainer />
    </Card>
  );
}
