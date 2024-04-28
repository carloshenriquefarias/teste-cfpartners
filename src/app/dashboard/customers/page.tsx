import * as React from 'react';

import type { Metadata } from 'next';

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { UsersListTable } from '@/components/dashboard/customer/users-list-table';
import { paths } from '@/paths';

export const metadata = { title: `List users` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="column" spacing={1} sx={{ flex: '1 1 auto', width:'100%'}}>

        <Typography variant="h4">List users</Typography>

        <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center', width:'100%'}}>
          <Stack direction="row" sx={{ alignItems: 'center' }}>
            <Stack paddingTop={1.5}>
              <UsersIcon size={45} />            
            </Stack>

            <CardHeader 
              subheader="Find users you search and do actions with them if you want" 
              title="All users"
            />
          </Stack>

          <Stack pt={3}>
            <Button
              startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
              variant="contained"
              color="primary"  
              href={paths.dashboard.customers.create}      
            >
              Register user
            </Button>
          </Stack>
        </CardActions>
      </Stack>

      <UsersListTable/>
    </Stack>
  );
}

