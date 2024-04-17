import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { AccountDetailsForm } from '@/components/dashboard/account/account-details-form';
import { AccountInfo } from '@/components/dashboard/account/account-info';

import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

export const metadata = { title: `Account | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      {/* <div>
        <Typography variant="h4">Profile</Typography>
      </div> */}
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <UsersIcon size={32}/>
        <Typography variant="h4">Personal data of the user</Typography>
      </Stack>

      <Grid container spacing={3}>
        {/* <Grid lg={4} md={6} xs={12}>
          <AccountInfo />
        </Grid> */}
        <Grid lg={12} md={12} xs={12}>
          <AccountDetailsForm />
        </Grid>
      </Grid>
    </Stack>
  );
}
