import React from 'react';

export const inventarioBitacoraEquipoConfig = [
  {
    auth: '',
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
    ],
  },
];
