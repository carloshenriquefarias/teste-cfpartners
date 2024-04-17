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
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function noop(): void {
  // do nothing
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
  const [selectedUserId, setSelectedUserId] = useState(null);
  const router = useRouter();

  const handleOpenModal = (userId: any) => {
    console.log('o ID do user e', userId);
    setSelectedUserId(userId);
    setOpen(true);
  };

  const handleClickEditUser = (userId: string) => {
    router.push(`/dashboard/account/${userId}`);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  const handleDeleteUser = () => {
    if (selectedUserId) {

      const updatedCustomers = rows.filter((customer) => customer.id !== selectedUserId);
      console.log('Usuário deletado:', selectedUserId);
      console.log('Lista atualizada de usuários:', updatedCustomers);

      // Atualizar a lista de customers (exemplo: usando setState, se for um componente React)
      // setCustomers(updatedCustomers);

      handleCloseModal();
    }
  };

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
              {/* <TableCell>Signed Up</TableCell> */}
              <TableCell>Update data</TableCell>
              <TableCell>Delete account</TableCell>
              {/* <TableCell padding="checkbox">
                <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
                  Register new user
                </Button>
              </TableCell> */}
              {/* <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      {/* <Avatar src={row.avatar} /> */}
                      <Typography variant="subtitle2">{row.firstName}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.userName}</TableCell>
                 
                  <TableCell>{row.email}</TableCell>
                  {/* <TableCell>
                    {row.address.city}, {row.address.state}, {row.address.country}
                  </TableCell> */}
                  <TableCell>{row.phone}</TableCell>
                   <TableCell>{dayjs(row.birthDate).format('MMM D, YYYY')}</TableCell>
                  {/* <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell> */}
                  <TableCell>
                    <Button 
                      startIcon={<PencilLine fontSize="var(--icon-fontSize-md)" />} 
                      variant="contained" 
                      // href={paths.dashboard.account}
                      onClick={() => handleClickEditUser(row.id)}
                      sx={{ backgroundColor: '#5fff9e', color: 'gray', '&:hover': { backgroundColor: '#00a340', color: 'white', } }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      startIcon={<Trash fontSize="var(--icon-fontSize-md)" />} 
                      variant="contained"  
                      onClick={() => handleOpenModal(row.id)}                    
                      sx={{ backgroundColor: '#ff6961', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.id);
                        } else {
                          deselectOne(row.id);
                        }
                      }}
                    />
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>

      <Modal 
        open={open} 
        handleClose={handleCloseModal} 
        handleDeleteUserById={handleDeleteUser}
      />

      <Divider />

      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
