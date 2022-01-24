import React from 'react';
import {authRole} from '../../shared/constants/AppConst';

export const consultasGerencialesConfig = [
  {
    auth: authRole.user,
    routes: [
      {
        exact: true,
        path: ['/exportacion-odes'],
        component: React.lazy(() => import('./ExportacionOdeS')),
      },
    ],
  },
];
