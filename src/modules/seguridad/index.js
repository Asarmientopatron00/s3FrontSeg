import React from 'react';
// import {Redirect} from 'react-router-dom';
import {authRole} from '../../shared/constants/AppConst';

export const seguridadConfig = [
  {
    auth: authRole.user,
    routes: [
      {
        path: ['/seguridad/usuarios'],
        component: React.lazy(() => import('./Usuario')),
      },
      {
        exact: true,
        path: ['/seguridad/roles'],
        component: React.lazy(() => import('./Rol')),
      },
      {
        path: ['/seguridad/aplicaciones'],
        component: React.lazy(() => import('./Aplicacion')),
      },
      {
        path: ['/seguridad/modulos'],
        component: React.lazy(() => import('./Modulo')),
      },
      {
        path: ['/seguridad/opciones-sistema'],
        component: React.lazy(() => import('./OpcionSistema')),
      },
      {
        path: ['/seguridad/acciones-permisos'],
        component: React.lazy(() => import('./Permiso')),
      },
      {
        exact: true,
        path: ['/seguridad/roles/permisos/:rol_id'],
        component: React.lazy(() => import('./Permissions')),
      },
    ],
  },
];
