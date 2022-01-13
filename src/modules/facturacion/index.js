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
      {
        exact: true,
        path: ['/ordenes-servicio-importacion-a-facturar'],
        component: React.lazy(() =>
          import('./ImportacionOrdenServicioAFacturar'),
        ),
      },
      {
        exact: true,
        path: ['/consulta-facturacion'],
        component: React.lazy(() => import('./ConsultaFacturacion')),
      },
    ],
  },
];
