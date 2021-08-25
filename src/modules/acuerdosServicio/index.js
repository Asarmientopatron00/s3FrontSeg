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
    ],
  },
];
