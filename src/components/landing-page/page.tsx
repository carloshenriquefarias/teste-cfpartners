'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { toast } from 'react-toastify';
import { toastApiResponse } from '@/utils/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import 'react-toastify/dist/ReactToastify.css';

import { BookOpenText, PencilLine, Trash, UserPlus } from '@phosphor-icons/react';

export function LandingPage(): React.JSX.Element {

  const iconColor = '#635BFF'
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const integrations = [
    {
      id: '1',
      title: 'Create',
      description: 'Register a new user inside our database with your personal data.',
      logo: <UserPlus size={45} color={iconColor} />
    },
    {
      id: '2',
      title: 'List',
      description: 'All users registered in this sistem are show up for the currently user.',
      logo: <BookOpenText size={45} color={iconColor} />,
    },
    {
      id: '3',
      title: 'Edit',
      description: 'If you are not satisfected, you can change data and do new uptades.',
      logo: <PencilLine size={45} color={iconColor} />
    },
    {
      id: '4',
      title: 'Delete',
      description: 'Are you not satisfected? Do not worry, you can delete your user.',
      logo: <Trash size={45} color={iconColor} />
    },
  ];

  const handleClickListUsers = async () => {
    setIsLoading(true);
    toastApiResponse(null, 'Welcome to CRUD Test CF Partners! We hope you enjoy it a lot! Good luck!');
    await new Promise(resolve => setTimeout(resolve, 3000));
    router.push(`/dashboard/customers`);
    setIsLoading(false);
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={1} direction={'column'}>
        <Typography color="inherit" sx={{ textAlign: 'center' }} variant="h4">
          Welcome to project test  {' '}
          <Box component="span" sx={{ color: '#635BFF' }}>
            CRUD from CF Partners
          </Box>
        </Typography>

        <Typography variant="h6" sx={{ mt: 2, lineHeight: '1.5em', textAlign: 'center' }}>
          This project is about a create, read, update, delete users for
          application for managing user details and credentials
        </Typography>
      </Stack>

      <Grid container spacing={2} mb={2}>
        {integrations.map((integration, index) => (
          <Grid key={index} item lg={6} md={6} xs={12}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: "all 0.25s",
                transitionTimingFunction: "spring(1 100 10 10)",
                '&:hover': { transform: 'translateY(-5px)' }
              }
              }>
              <CardContent sx={{ flex: '1 1 auto' }}>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Stack>
                      {integration.logo}
                    </Stack>
                  </Box>
                  <Stack spacing={1}>
                    <Typography align="center" variant="h5">
                      {integration.title}
                    </Typography>
                    <Typography align="center" variant="body1">
                      {integration.description}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
              <Divider />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" color="primary" onClick={handleClickListUsers}>
        {isLoading ? (
          <CircularProgress size={14} color="inherit" />
        ) : (
          'Know the project'
        )}
      </Button>

      <ToastContainer />
    </Stack>
  );
}
