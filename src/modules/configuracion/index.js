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
      {
        path: ['/configuracion/actividades-economicas'],
        component: React.lazy(() => import('./ActividadEconomica')),
      },
      {
        path: ['/configuracion/listas-documentos'],
        component: React.lazy(() => import('./ListaDocumento')),
      },
      {
        path: ['/configuracion/requisitos-seguridad'],
        component: React.lazy(() => import('./RequisitoSeguridad')),
      },
      {
        path: ['/configuracion/parametros-constantes'],
        component: React.lazy(() => import('./ParametroConstante')),
      },
      {
        path: ['/configuracion/departamentos'],
        component: React.lazy(() => import('./Departamento')),
      },
      {
        path: ['/configuracion/ciudades'],
        component: React.lazy(() => import('./Ciudad')),
      },
      {
        path: ['/configuracion/servicios'],
        component: React.lazy(() => import('./Servicio')),
      },
      {
        path: ['/configuracion/terceros-servicio'],
        component: React.lazy(() => import('./TerceroServicio')),
      },
    ],
  },
];
