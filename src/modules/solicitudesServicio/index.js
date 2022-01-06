import React from 'react';
import {authRole} from '../../shared/constants/AppConst';

export const solicitudesServicioConfig = [
  {
    auth: authRole.user,
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
