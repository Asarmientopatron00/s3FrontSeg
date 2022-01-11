import React from 'react';
import {authRole} from '../../shared/constants/AppConst';

export const inventarioBitacoraEquipoConfig = [
  {
    auth: authRole.user,
    routes: [
      {
        exact: true,
        path: ['/informacion-equipos'],
        component: React.lazy(() => import('./InformacionEquipo')),
      },
      {
        exact: true,
        path: ['/bitacora-equipos'],
        component: React.lazy(() => import('./BitacoraEquipo')),
      },
      {
        exact: true,
        path: ['/historia-equipos'],
        component: React.lazy(() => import('./HistoriaEquipo')),
      },
    ],
  },
];
