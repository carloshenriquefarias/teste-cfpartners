import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'customers', title: 'All users', href: paths.dashboard.customers.list, icon: 'users' },
] satisfies NavItemConfig[];
