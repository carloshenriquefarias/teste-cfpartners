'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Trash } from '@phosphor-icons/react/dist/ssr/Trash';
import { PencilLine } from '@phosphor-icons/react/dist/ssr/PencilLine';

import { useSelection } from '@/hooks/use-selection';
import { paths } from '@/paths';
import Modal from './modal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';

import { toastApiResponse } from '@/utils/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";  

function noop(): void {
  // do nothing
}

export interface Users {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  mobile: string;
  // birthDate: Date;
  password: string;
  // avatar: string;
  // address: { city: string; state: string; country: string; street: string };
  // createdAt: Date;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  birthDate: Date;
  // avatar: string;
  // address: { city: string; state: string; country: string; street: string };
  createdAt: Date;
}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
}

export function CustomersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: CustomersTableProps): React.JSX.Element {

  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const [open, setOpen] = React.useState(false);
  const [allUser, setAllUsers] = useState(rows);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState<Users[]>([]);
  const [rechargeListUsers, setRechargeListUsers] = useState(false);
  const router = useRouter();

  const handleOpenModal = (userId: any) => {
    setSelectedUserId(userId);
    setOpen(true);
  };

  const handleClickEditUser = (userId: string) => {
    router.push(`/dashboard/customers/${userId}`);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  const fetchAllUsers = async () => {
    try {
      setIsLoading(true);
      const response = await api.post('/crud_users/api/v2/users');
      const newsResponse = response.data;
      setUsers(newsResponse?.data) 
      setIsLoading(false);
  
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
                  <TableCell>{user.mobile}</TableCell>
                  <TableCell>{'10/10/2024'}</TableCell>
                  {/* <TableCell>{dayjs(user.birthDate).format('MMM D, YYYY')}</TableCell> */}

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
                        onClick={() => handleOpenModal(user.id)}                    
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

      {/* <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}

      <ToastContainer />
    </Card>
  );
}
