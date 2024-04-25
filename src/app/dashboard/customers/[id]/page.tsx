import * as React from 'react';
import type { Metadata } from 'next';

import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { AccountDetailsForm } from '@/components/dashboard/account/account-details-form';

export const metadata = { title: `Account | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page( {params} : {params : {id: string}}): React.JSX.Element {

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Typography variant="h4">Edit profile</Typography>
      </Stack>

      <Grid container spacing={3}>
        <Grid lg={12} md={12} xs={12}>
          <AccountDetailsForm userId={params.id}/>
        </Grid>
      </Grid>
    </Stack>
  );
}
