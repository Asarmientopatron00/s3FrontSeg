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
      {
        exact: true,
        path: '/cotizaciones',
        component: React.lazy(() => import('./Cotizacion')),
      },
      {
        exact: true,
        path: '/consulta-cotizaciones',
        component: React.lazy(() => import('./ConsultaCotizacion')),
      },
      {
        exact: true,
        path: ['/cotizacion/:accion/:id'],
        component: React.lazy(() => import('./Cotizacion/CotizacionCreador')),
      },
      {
        exact: true,
        path: ['/cotizacion/:accion'],
        component: React.lazy(() => import('./Cotizacion/CotizacionCreador')),
      },
    ],
  },
];
