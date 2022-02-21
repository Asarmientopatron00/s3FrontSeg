import {
  GET_COLECCION_CONSULTA_ORDEN_COMPRA,
  GET_DATOS_CONSULTA_ORDEN_COMPRA,
  GET_PROMEDIOS_CONSULTA_ORDEN_COMPRA,
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
  estadoPedido,
  orderByToSend,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';
  const estadoAux = estadoPedido ? estadoPedido : '';
  const ordenar_por = orderByToSend ? orderByToSend : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/ordenes-compra', {
        params: {
          page: page,
          limite: rowsPerPage,
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          estadoPedido: estadoAux,
          ordenar_por: ordenar_por,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_CONSULTA_ORDEN_COMPRA,
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
export const onGetPromedios = (fechaInicial, fechaFinal) => {
  const {messages} = appIntl();
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/ordenes-compra', {
        params: {
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          promedios: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_PROMEDIOS_CONSULTA_ORDEN_COMPRA,
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

export const onGetColeccionDatos = (fechaInicial, fechaFinal) => {
  const {messages} = appIntl();
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/datos-ordenes-compra', {
        params: {
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_DATOS_CONSULTA_ORDEN_COMPRA,
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
