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
        path: '/aprobacion-cotizaciones',
        component: React.lazy(() => import('./AprobacionCotizacion')),
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
      {
        exact: true,
        path: ['/productos'],
        component: React.lazy(() => import('./Producto')),
      },
      {
        exact: true,
        path: '/pedidos',
        component: React.lazy(() => import('./Pedido')),
      },
      {
        exact: true,
        path: ['/pedido/:accion/:id'],
        component: React.lazy(() => import('./Pedido/PedidoCreador')),
      },
      {
        exact: true,
        path: ['/pedido/:accion'],
        component: React.lazy(() => import('./Pedido/PedidoCreador')),
      },
      {
        exact: true,
        path: ['/solicitud-cotizacion-producto'],
        component: React.lazy(() => import('./SolicitudCotizacionProducto')),
      },
      {
        exact: true,
        path: ['/solicitud-cotizacion-productos/:accion/:id'],
        component: React.lazy(() =>
          import(
            './SolicitudCotizacionProducto/SolicitudCotizacionProductoCreador'
          ),
        ),
      },
      {
        exact: true,
        path: ['/solicitud-cotizacion-productos/:accion'],
        component: React.lazy(() =>
          import(
            './SolicitudCotizacionProducto/SolicitudCotizacionProductoCreador'
          ),
        ),
      },
      {
        exact: true,
        path: '/cotizaciones-productos',
        component: React.lazy(() => import('./CotizacionProducto')),
      },
      {
        exact: true,
        path: ['/cotizacion-productos/:accion/:id'],
        component: React.lazy(() =>
          import('./CotizacionProducto/CotizacionProductoCreador'),
        ),
      },
      {
        exact: true,
        path: ['/cotizacion-productos/:accion'],
        component: React.lazy(() =>
          import('./CotizacionProducto/CotizacionProductoCreador'),
        ),
      },
    ],
  },
];
