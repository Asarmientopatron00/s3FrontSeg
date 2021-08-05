import React from 'react';
// import {Redirect} from 'react-router-dom';
// import {authRole} from '../../shared/constants/AppConst';

export const cotizacionConfig = [
  {
    auth: '',
    routes: [
      {
        exact: true,
        path: ['/solicitar-cotizacion'],
        component: React.lazy(() => import('./SolicitudCotizacion')),
      },
      {
        exact: true,
        path: '/solicitud-contacto',
        component: React.lazy(() => import('./SolicitudContacto')),
      },
    ],
  },
];