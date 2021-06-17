import React from 'react';

export const authRouteConfig = [
  {
    routes: [
      {
        exact:true,
        path: '/signin',
        component: React.lazy(() => import('./Signin/index')),
      },
    ],
  },
  {
    routes: [
      {
        exact:true,
        path: '/signup',
        component: React.lazy(() => import('./Signup/index')),
      },
    ],
  },
  {
    routes: [
      {
        exact:true,
        path: '/confirm-signup',
        component: React.lazy(() => import('./ConfirmSignupAwsCognito')),
      },
    ],
  },
  {
    routes: [
      {
        exact:true,
        path: '/reset-password/:token',
        component: React.lazy(() => import('./ResetPasswordAwsCognito')),
      },
    ],
  },
  {
    routes: [
      {
        exact:true,
        path: '/forget-password',
        component: React.lazy(() => import('./ForgetPassword')),
      },
    ],
  },
  {
    routes: [
      {
        path: '/error-pages/error-404',
        component: React.lazy(() => import('../errorPages/Error404/index')),
      },
    ],
  },
];
