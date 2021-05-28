import React from 'react';
// import {Redirect} from 'react-router-dom';
import {authRole} from '../../shared/constants/AppConst';

export const configuracionConfig = [
  {
    auth: authRole.user,
    routes: [
      {
        path: ['/configuracion/usuarios'],
        component: React.lazy(() => import('./Usuario')),
      },
    ],
  },
];
