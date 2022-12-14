import React from 'react';
import {Redirect} from 'react-router-dom';

import {createRoutes} from '../@crema/utility/Utils';
import {dashBoardConfigs} from './dashboard';
import {muiComponentConfigs} from './muiComponents';
import {thirdPartyConfigs} from './thirdParty';
import {userPagesConfig} from './userPages';
import {extraPagesConfigs} from './extraPages';
import {userListConfig} from './userList';
import {errorPagesConfigs} from './errorPages';
import {ecommerceConfig} from './ecommerce';
import {authRouteConfig} from './auth';
import {initialUrl} from '../shared/constants/AppConst';
import {menuLevelConfig} from './menu';
import {configuracionConfig} from './configuracion';
import {SeguridadConfig} from './seguridad';
import {asociadoConfig} from './asociados';
import {cotizacionConfig} from './cotizaciones';
import {acuerdoServicioConfig} from './acuerdosServicio';
import {solicitudesServicioConfig} from './solicitudesServicio';
import {inventarioBitacoraEquipoConfig} from './inventarioBitacoraEquipo';
import {programacionServicioConfig} from './programacionServicio';
import {facturacionConfig} from './facturacion';
import {consultasGerencialesConfig} from './consultasGerenciales';

const routeConfigs = [
  ...authRouteConfig,
  ...dashBoardConfigs,
  ...muiComponentConfigs,
  ...thirdPartyConfigs,
  ...userPagesConfig,
  ...userListConfig,
  ...extraPagesConfigs,
  ...errorPagesConfigs,
  ...ecommerceConfig,
  ...menuLevelConfig,
  ...configuracionConfig,
  ...SeguridadConfig(),
  ...asociadoConfig,
  ...cotizacionConfig,
  ...acuerdoServicioConfig,
  ...solicitudesServicioConfig,
  ...inventarioBitacoraEquipoConfig,
  ...programacionServicioConfig,
  ...facturacionConfig,
  ...consultasGerencialesConfig,
];

const routes = [
  ...createRoutes(routeConfigs),
  {
    path: '/',
    exact: true,
    component: () => <Redirect to={initialUrl} />,
  },
  {
    component: () => <Redirect to='/error-pages/error-404' />,
  },
];

export default routes;
