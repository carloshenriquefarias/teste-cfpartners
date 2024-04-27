import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import { SignUpForm } from '@/components/auth/sign-up-form';

export const metadata = { title: `Register new user` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <SignUpForm/>
    </Stack>
  );
}
