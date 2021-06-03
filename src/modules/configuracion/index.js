import React from 'react';
// import {Redirect} from 'react-router-dom';
import {authRole} from '../../shared/constants/AppConst';

export const configuracionConfig = [
  {
    auth: authRole.user,
    routes: [
      {
        path: ['/configuracion/tipos-documentos'],
        component: React.lazy(() => import('./TipoDocumento')),
      },
      {
        path: ['/configuracion/paises'],
        component: React.lazy(() => import('./Pais')),
      },
    ],
  },
];
