export const paths = {
  home: '/dashboard/customers',
  dashboard: {    
    customers: 
    { 
      list: '/dashboard/customers', 
      create: '/dashboard/customers/create', 
      edit: '/dashboard/customers/user-edit-form'
    },
  },
  errors: { notFound: '/errors/not-found' },
} as const;
