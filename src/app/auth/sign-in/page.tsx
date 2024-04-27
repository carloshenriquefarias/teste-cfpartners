import * as React from 'react';
import type { Metadata } from 'next';

import { Layout } from '@/components/auth/layout';
import { LandingPage } from '@/components/auth/sign-in-form';

export const metadata = { title: `Landing page` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <LandingPage />
    </Layout>
  );
}
