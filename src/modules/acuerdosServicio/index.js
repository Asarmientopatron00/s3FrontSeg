import React from 'react';

export const acuerdoServicioConfig = [
  {
    auth: '',
    routes: [
      {
        exact: true,
        path: ['/acuerdos-servicio'],
        component: React.lazy(() => import('./AcuerdoServicio')),
      },
    ],
  },
];
