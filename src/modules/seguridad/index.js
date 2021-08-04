import React from 'react';

// import {Redirect} from 'react-router-dom';
import {authRole} from '../../shared/constants/AppConst';

export const SeguridadConfig = () => {
  return [
    {
      auth: authRole.user,
      routes: [
        {
          path: ['/usuarios'],
          component: React.lazy(() => import('./Usuario')),
        },
        {
          exact: true,
          path: ['/roles'],
          component: React.lazy(() => import('./Rol')),
        },
        {
          path: ['/aplicaciones'],
          component: React.lazy(() => import('./Aplicacion')),
        },
        {
          path: ['/modulos'],
          component: React.lazy(() => import('./Modulo')),
        },
        {
          path: ['/opciones-sistema'],
          component: React.lazy(() => import('./OpcionSistema')),
        },
        {
          path: ['/acciones-permisos'],
          component: React.lazy(() => import('./Permiso')),
        },
        {
          exact: true,
          path: ['/roles/permisos/:rol_id'],
          component: React.lazy(() => import('./Permissions')),
        },
        {
          exact: true,
          path: ['/consulta-auditoria'],
          component: React.lazy(() => import('./ConsultaAuditoria')),
        },
      ],
    },
  ];
};
