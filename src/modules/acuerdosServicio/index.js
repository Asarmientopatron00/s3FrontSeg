import React from 'react';
import {authRole} from '../../shared/constants/AppConst';

export const acuerdoServicioConfig = [
  {
    auth: authRole.user,
    routes: [
      {
        exact: true,
        path: ['/acuerdos-servicio'],
        component: React.lazy(() => import('./AcuerdoServicio')),
      },
      {
        exact: true,
        path: ['/acuerdos-contactos/:acuerdo_id'],
        component: React.lazy(() => import('./NotificacionContacto')),
      },
      {
        exact: true,
        path: ['/rutas-autorizacion/:acuerdo_id'],
        component: React.lazy(() => import('./RutaAutorizacion')),
      },
      {
        exact: true,
        path: ['/puestos-parada/:acuerdo_id'],
        component: React.lazy(() => import('./PuestoParada')),
      },
      {
        exact: true,
        path: ['/rutas-control/:acuerdo_id'],
        component: React.lazy(() => import('./RutaControl')),
      },
      {
        exact: true,
        path: ['/puestos-control/:acuerdo_id'],
        component: React.lazy(() => import('./PuestoControl')),
      },
      {
        exact: true,
        path: ['/aprobacion-acuerdo'],
        component: React.lazy(() => import('./AprobacionAcuerdoServicio')),
      },
    ],
  },
];
