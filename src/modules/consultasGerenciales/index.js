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
      {
        exact: true,
        path: ['/exportacion-asociado'],
        component: React.lazy(() => import('./ExportacionAsociado')),
      },
      {
        exact: true,
        path: ['/consulta-asociados'],
        component: React.lazy(() => import('./AsociadoNegocio')),
      },
      {
        exact: true,
        path: ['/consulta-asociados/:accion/:id'],
        component: React.lazy(() =>
          import('./../asociados/AsociadoNegocio/AsociadoNegocioCreador'),
        ),
      },
      {
        exact: true,
        path: ['/cg-ordenes-compra'],
        component: React.lazy(() => import('./OrdenCompra')),
      },
      {
        exact: true,
        path: ['/cg-ordenes-compra/:accion/:id'],
        component: React.lazy(() =>
          import('./../cotizaciones/Pedido/PedidoCreador'),
        ),
      },
      {
        exact: true,
        path: ['/cg-cotizaciones'],
        component: React.lazy(() => import('./Cotizacion')),
      },
      {
        exact: true,
        path: ['/cg-ordenes-servicio'],
        component: React.lazy(() => import('./OrdenServicio')),
      },
    ],
  },
];
