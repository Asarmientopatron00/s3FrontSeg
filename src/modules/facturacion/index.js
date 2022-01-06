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
      {
        exact: true,
        path: ['/facturacion-cliente'],
        component: React.lazy(() => import('./ODSTFacturarCliente')),
      },
    ],
  },
];
