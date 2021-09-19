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
      {
        exact: true,
        path: ['/orden-servicio/:accion/:id'],
        component: React.lazy(() =>
          import('./OrdenServicio/OrdenServicioCreador'),
        ),
      },
      {
        exact: true,
        path: ['/orden-servicio/:accion'],
        component: React.lazy(() =>
          import('./OrdenServicio/OrdenServicioCreador'),
        ),
      },
      {
        exact: true,
        path: ['/orden-servicio-indexacion/:orden_servicio_id'],
        component: React.lazy(() => import('./IndexacionDocumento')),
      },
      {
        exact: true,
        path: ['/ordenes-servicio-aprobacion'],
        component: React.lazy(() => import('./AprobacionOrdenServicio')),
      },
      {
        exact: true,
        path: ['/ordenes-servicio-importacion'],
        component: React.lazy(() => import('./ImportacionOrdenServicio')),
      },
    ],
  },
];
