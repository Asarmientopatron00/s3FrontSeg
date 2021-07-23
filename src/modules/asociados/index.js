import React from 'react';
// import {Redirect} from 'react-router-dom';
import {authRole} from '../../shared/constants/AppConst';

export const asociadoConfig = [
  {
    auth: authRole.user,
    routes: [
      {
        exact: true,
        path: ['/datos-basicos'],
        component: React.lazy(() => import('./AsociadoDatoBasico')),
      },
      {
        exact: true,
        path: ['/asociados-negocios'],
        component: React.lazy(() => import('./AsociadoNegocio')),
      },
      {
        exact: true,
        path: ['/asociados-negocios/:accion/:id'],
        component: React.lazy(() =>
          import('./AsociadoNegocio/AsociadoNegocioCreador'),
        ),
      },
      {
        exact: true,
        path: ['/asociados-negocios/:accion'],
        component: React.lazy(() =>
          import('./AsociadoNegocio/AsociadoNegocioCreador'),
        ),
      },
      {
        exact: true,
        path: ['/asociados-negocios-legales/:asociado_id'],
        component: React.lazy(() => import('./AsociadoContactoLegal')),
      },
      {
        exact: true,
        path: ['/asociados-negocios-contactos/:asociado_id'],
        component: React.lazy(() => import('./AsociadoContacto')),
      },
      {
        exact: true,
        path: ['/asociados-negocios-bancarias/:asociado_id'],
        component: React.lazy(() => import('./AsociadoBancaria')),
      },
      {
        exact: true,
        path: ['/asociados-negocios-comerciales/:asociado_id'],
        component: React.lazy(() => import('./AsociadoComercial')),
      },
      {
        exact: true,
        path: ['/asociados-negocios-requisitos-seguridad/:asociado_id'],
        component: React.lazy(() => import('./AsociadoRequisitoSeguridad')),
      },
      {
        exact: true,
        path: ['/asociados-negocios-documentos/:asociado_id'],
        component: React.lazy(() => import('./AsociadoDocumento')),
      },
      {
        exact: true,
        path: ['/informe-actualizacion-asociados'],
        component: React.lazy(() => import('./InformeAsociadoNegocio')),
      },
    ],
  },
];
