import {
  GET_COLECCION_CONSULTA_ORDEN_SERVICIO,
  GET_DATOS_CONSULTA_ORDEN_SERVICIO,
  GET_PROMEDIOS_CONSULTA_ORDEN_SERVICIO,
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
  fechaInstInicial,
  fechaInstFinal,
  estadoOrdenServicio,
  orderByToSend,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';
  const fechaInstInicialAux = fechaInstInicial ? fechaInstInicial : '';
  const fechaInstFinalAux = fechaInstFinal ? fechaInstFinal : '';
  const estadoAux = estadoOrdenServicio ? estadoOrdenServicio : '';
  const ordenar_por = orderByToSend ? orderByToSend : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/ordenes-servicio', {
        params: {
          page: page,
          limite: rowsPerPage,
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          fechaInstInicial: fechaInstInicialAux,
          fechaInstFinal: fechaInstFinalAux,
          estadoOrdenServicio: estadoAux,
          ordenar_por: ordenar_por,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_CONSULTA_ORDEN_SERVICIO,
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
export const onGetPromedios = (
  fechaInicial,
  fechaFinal,
  fechaInstInicial,
  fechaInstFinal,
) => {
  const {messages} = appIntl();
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';
  const fechaInstInicialAux = fechaInstInicial ? fechaInstInicial : '';
  const fechaInstFinalAux = fechaInstFinal ? fechaInstFinal : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/ordenes-servicio', {
        params: {
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          fechaInstInicial: fechaInstInicialAux,
          fechaInstFinal: fechaInstFinalAux,
          todos: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_PROMEDIOS_CONSULTA_ORDEN_SERVICIO,
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
  fechaInstInicial,
  fechaInstFinal,
) => {
  const {messages} = appIntl();
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';
  const fechaInstInicialAux = fechaInstInicial ? fechaInstInicial : '';
  const fechaInstFinalAux = fechaInstFinal ? fechaInstFinal : '';
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/datos-ordenes-servicio', {
        params: {
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          fechaInstInicial: fechaInstInicialAux,
          fechaInstFinal: fechaInstFinalAux,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_DATOS_CONSULTA_ORDEN_SERVICIO,
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
