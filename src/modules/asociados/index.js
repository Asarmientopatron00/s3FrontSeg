import React from 'react';
// import {Redirect} from 'react-router-dom';
import {authRole} from '../../shared/constants/AppConst';

export const asociadoConfig = [
  {
    auth: authRole.user,
    routes: [
      {
        exact: true,
        path: ['/asociados/datos-basicos'],
        component: React.lazy(() => import('./AsociadoDatoBasico')),
      },
      {
        exact: true,
        path: ['/asociados/asociados-negocios'],
        component: React.lazy(() => import('./AsociadoNegocio')),
      },
      {
        exact: true,
        path: ['/asociados/asociados-negocios/:accion/:id'],
        component: React.lazy(() =>
          import('./AsociadoNegocio/AsociadoNegocioCreador'),
        ),
      },
      {
        exact: true,
        path: ['/asociados/asociados-negocios/:accion'],
        component: React.lazy(() =>
          import('./AsociadoNegocio/AsociadoNegocioCreador'),
        ),
      },
      {
        exact: true,
        path: ['/asociados/asociados-negocios-legales/:asociado_id'],
        component: React.lazy(() => import('./AsociadoContactoLegal')),
      },
      {
        exact: true,
        path: ['/asociados/asociados-negocios-contactos/:asociado_id'],
        component: React.lazy(() => import('./AsociadoContacto')),
      },
      {
        exact: true,
        path: ['/asociados/asociados-negocios-bancarias/:asociado_id'],
        component: React.lazy(() => import('./AsociadoBancaria')),
      },
      {
        exact: true,
        path: ['/asociados/asociados-negocios-comerciales/:asociado_id'],
        component: React.lazy(() => import('./AsociadoComercial')),
      },
      {
        exact: true,
        path: [
          '/asociados/asociados-negocios-requisitos-seguridad/:asociado_id',
        ],
        component: React.lazy(() => import('./AsociadoRequisitoSeguridad')),
      },
      {
        exact: true,
        path: ['/asociados/asociados-negocios-documentos/:asociado_id'],
        component: React.lazy(() => import('./AsociadoDocumento')),
      },
    ],
  },
];
