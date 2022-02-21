import {
  GET_COLECCION_CONSULTA_COTIZACION,
  GET_DATOS_CONSULTA_COTIZACION,
  GET_PROMEDIOS_CONSULTA_COTIZACION,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from '../../shared/constants/ActionTypes';
import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';

import {appIntl} from '../../@crema/utility/Utils';

export const onGetColeccion = (
  currentPage,
  rowsPerPage,
  fechaInicial,
  fechaFinal,
  tipoCotizacion,
  estadoCotizacion,
  orderByToSend,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';
  const tipoCotizacionAux = tipoCotizacion ? tipoCotizacion : '';
  const estadoAux = estadoCotizacion ? estadoCotizacion : '';
  const ordenar_por = orderByToSend ? orderByToSend : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/cotizaciones', {
        params: {
          page: page,
          limite: rowsPerPage,
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          tipoCotizacion: tipoCotizacionAux,
          estadoCotizacion: estadoAux,
          ordenar_por: ordenar_por,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_CONSULTA_COTIZACION,
            payload: data,
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const onGetPromedios = (fechaInicial, fechaFinal, tipoCotizacion) => {
  const {messages} = appIntl();
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';
  const tipoCotizacionAux = tipoCotizacion ? tipoCotizacion : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/cotizaciones', {
        params: {
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          tipoCotizacion: tipoCotizacionAux,
          promedios: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_PROMEDIOS_CONSULTA_COTIZACION,
            payload: data,
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetColeccionDatos = (
  fechaInicial,
  fechaFinal,
  tipoCotizacion,
) => {
  const {messages} = appIntl();
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';
  const tipoCotizacionAux = tipoCotizacion ? tipoCotizacion : '';
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/datos-cotizaciones', {
        params: {
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          tipoCotizacion: tipoCotizacionAux,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_DATOS_CONSULTA_COTIZACION,
            payload: data,
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
