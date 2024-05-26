export const paths = {
  index: '/',

  verifyEmail: '/verify-email',
  login: '/login',
  signup: '/signup',
  forgetPassword: '/forgot-pass',

  dashboard: {
    index: '/dashboard',
  },
  products: {
    index: '/dashboard/products',
    add: '/dashboard/products/add',
    edit: (id: string) => `/dashboard/products/${id}`,
  },
  users: {
    index: '/dashboard/users',
    edit: (id: string) => `/dashboard/users/${id}`,
  },
};

export const params = {
  redirect: {
    key: 'redirect',
    query: (path: string) => `?${params.redirect.key}=${path}`,
  },
};
