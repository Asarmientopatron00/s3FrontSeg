import React from 'react';
// import {Redirect} from 'react-router-dom';
import {authRole} from '../../shared/constants/AppConst';

export const configuracionConfig = [
  {
    auth: authRole.user,
    routes: [
      {
        path: ['/tipos-documentos'],
        component: React.lazy(() => import('./TipoDocumento')),
      },
      {
        path: ['/paises'],
        component: React.lazy(() => import('./Pais')),
      },
      {
        path: ['/actividades-economicas'],
        component: React.lazy(() => import('./ActividadEconomica')),
      },
      {
        exact: true,
        path: ['/listas-documentos'],
        component: React.lazy(() => import('./ListaDocumento')),
      },
      {
        path: ['/requisitos-seguridad'],
        component: React.lazy(() => import('./RequisitoSeguridad')),
      },
      {
        path: ['/parametros-constantes'],
        component: React.lazy(() => import('./ParametroConstante')),
      },
      {
        path: ['/departamentos'],
        component: React.lazy(() => import('./Departamento')),
      },
      {
        path: ['/ciudades'],
        component: React.lazy(() => import('./Ciudad')),
      },
      {
        path: ['/servicios'],
        component: React.lazy(() => import('./Servicio')),
      },
      {
        path: ['/terceros-servicio'],
        component: React.lazy(() => import('./TerceroServicio')),
      },
      {
        path: ['/eventos-notificacion'],
        component: React.lazy(() => import('./EventoNotificacion')),
      },
      {
        path: ['/eventos-notificacion'],
        component: React.lazy(() => import('./EventoNotificacion')),
      },
      {
        path: ['/parametros-correos'],
        component: React.lazy(() => import('./ParametroCorreo')),
      },
      {
        path: ['/rutas'],
        component: React.lazy(() => import('./Ruta')),
      },
      {
        path: ['/tarifas'],
        component: React.lazy(() => import('./Tarifa')),
      },
      {
        path: ['/lugares'],
        component: React.lazy(() => import('./Lugar')),
      },
      {
        path: ['/estados-equipos'],
        component: React.lazy(() => import('./EstadoEquipo')),
      },
      {
        path: ['/eventos-bitacora-equipos'],
        component: React.lazy(() => import('./EventoBitacoraEquipo')),
      },
    ],
  },
];
