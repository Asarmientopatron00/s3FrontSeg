import React from 'react';
// import {Redirect} from 'react-router-dom';
import {authRole} from '../../shared/constants/AppConst';

export const asociadoConfig = [
  {
    auth: authRole.user,
    routes: [
      {
        path: ['/asociados/datos-basicos'],
        component: React.lazy(() => import('./AsociadoDatoBasico')),
      },
    ],
  },
];
