import * as React from 'react';
import type { Metadata } from 'next';

import { Layout } from '@/components/landing-page/layout';
import { LandingPage } from '@/components/landing-page/page';

export const metadata = { title: `Landing page` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <LandingPage />
    </Layout>
  );
}
