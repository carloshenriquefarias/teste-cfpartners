import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';

import { paths } from '@/paths';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const customers = [
  {
    id: '10',
    firstName: 'Alcides',
    lastName: 'Antonio',
    userName: 'Alcides Antonio',
    email: 'alcides.antonio@devias.io',
    phone: '908-691-3242',
    birthDate: dayjs().subtract(2, 'hours').toDate(),
    // avatar: '/assets/avatar-10.png',
    // address: { city: 'Madrid', country: 'Spain', state: 'Comunidad de Madrid', street: '4158 Hedge Street' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: '9',
    firstName: 'Marcus',
    lastName: 'Finn',
    userName: 'Marcus Finn',
    email: 'marcus.finn@devias.io',
    phone: '415-907-2647',
    birthDate: dayjs().subtract(2, 'hours').toDate(),
    // avatar: '/assets/avatar-9.png',
    // address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: '8',
    firstName: 'Joao',
    lastName: 'Zorro',
    userName: 'Joao Zorro',
    email: 'joaozorro@devias.io',
    phone: '415-907-2647',
    birthDate: dayjs().subtract(2, 'hours').toDate(),
    // avatar: '/assets/avatar-9.png',
    // address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: '7',
    firstName: 'Ze',
    lastName: 'Paz',
    userName: 'Ze paz',
    email: 'zepaz@devias.io',
    phone: '415-907-2647',
    birthDate: dayjs().subtract(2, 'hours').toDate(),
    // avatar: '/assets/avatar-9.png',
    // address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: '6',
    firstName: 'Pai',
    lastName: 'de amor',
    userName: 'Pai de amor',
    email: 'paideamor@devias.io',
    phone: '415-907-2647',
    birthDate: dayjs().subtract(2, 'hours').toDate(),
    // avatar: '/assets/avatar-9.png',
    // address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: '5',
    firstName: 'Dava',
    lastName: 'Star',
    userName: 'Dava star',
    email: 'davastar@devias.io',
    phone: '415-907-2647',
    birthDate: dayjs().subtract(2, 'hours').toDate(),
    // avatar: '/assets/avatar-9.png',
    // address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: '4',
    firstName: 'Dhi',
    lastName: 'Silva',
    userName: 'Dhi Silva',
    email: 'dhisilva@devias.io',
    phone: '415-907-2647',
    birthDate: dayjs().subtract(2, 'hours').toDate(),
    // avatar: '/assets/avatar-9.png',
    // address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: '3',
    firstName: 'Cross',
    lastName: 'Finn',
    userName: 'Cross Finn',
    email: 'cross.finn@devias.io',
    phone: '415-907-2647',
    birthDate: dayjs().subtract(2, 'hours').toDate(),
    // avatar: '/assets/avatar-9.png',
    // address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: '2',
    firstName: 'Tais',
    lastName: 'Finn',
    userName: 'Tais Finn',
    email: 'tais.finn@devias.io',
    phone: '415-907-2647',
    birthDate: dayjs().subtract(2, 'hours').toDate(),
    // avatar: '/assets/avatar-9.png',
    // address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: '1',
    firstName: 'Jr',
    lastName: 'Finn',
    userName: 'Jr Finn',
    email: 'jr.finn@devias.io',
    phone: '415-907-2647',
    birthDate: dayjs().subtract(2, 'hours').toDate(),
    // avatar: '/assets/avatar-9.png',
    // address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
] satisfies Customer[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 10;

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <UsersIcon size={32}/>
            <Typography variant="h5">All users registered</Typography>
          </Stack>
          {/* <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack> */}
        </Stack>

        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" href={paths.dashboard.settings}>
            Register new user
          </Button>
        </div>
      </Stack>

      {/* <CustomersFilters /> */}

      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
