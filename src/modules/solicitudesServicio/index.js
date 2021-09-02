import React from 'react';

export const solicitudesServicioConfig = [
  {
    auth: '',
    routes: [
      {
        exact: true,
        path: ['/ordenes-servicio'],
        component: React.lazy(() => import('./OrdenServicio')),
      },
    ],
  },
];
