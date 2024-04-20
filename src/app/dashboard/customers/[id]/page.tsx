import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'next/navigation';

import { config } from '@/config';
import { AccountDetailsForm } from '@/components/dashboard/account/account-details-form';
import { AccountInfo } from '@/components/dashboard/account/account-info';

import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

export const metadata = { title: `Account | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page( {params} : {params : {id: string}}): React.JSX.Element {

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        {/* <UsersIcon size={32}/> */}
        <Typography variant="h4">Edit profile</Typography>
        {/* <Typography variant="h4">User</Typography>
        <Typography variant="h4">user: {params.id}</Typography> */}
      </Stack>

      <Grid container spacing={3}>
        {/* <Grid lg={4} md={6} xs={12}>
          <AccountInfo />
        </Grid> */}
        <Grid lg={12} md={12} xs={12}>
          <AccountDetailsForm userId={params.id}/>
        </Grid>
      </Grid>
    </Stack>
  );
}
