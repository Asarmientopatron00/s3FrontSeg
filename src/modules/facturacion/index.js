import React from 'react';

export const facturacionConfig = [
  {
    auth: '',
    routes: [
      {
        exact: true,
        path: ['/facturacion-servicio'],
        component: React.lazy(() => import('./ODSTFacturarServicio')),
      },
    ],
  },
];
