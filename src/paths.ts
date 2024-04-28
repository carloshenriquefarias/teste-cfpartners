export const paths = {
  home: '/dashboard/customers',
  // landing: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
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
