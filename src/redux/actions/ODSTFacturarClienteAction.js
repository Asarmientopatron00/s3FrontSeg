import {
  GET_COLECCION_FACTURAR_CLIENTE_TERMINADO,
  GET_COLECCION_LIGERA_FACTURAR_CLIENTE_TERMINADO,
  SHOW_FACTURAR_CLIENTE_TERMINADO,
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
  asociado,
  orderByToSend,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';
  const asociadoAux = asociado ? asociado : '';
  const ordenar_por = orderByToSend ? orderByToSend : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('facturacion-cliente', {
        params: {
          page: page,
          limite: rowsPerPage,
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          asociado: asociadoAux,
          ordenar_por: ordenar_por,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_FACTURAR_CLIENTE_TERMINADO,
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

export const onGetColeccionLigera = (depto) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('facturacion-cliente', {
        params: {
          ligera: true,
          departamento_id: depto,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_LIGERA_FACTURAR_CLIENTE_TERMINADO,
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

export const onShow = (id) => {
  const {messages} = appIntl();
  return (dispatch) => {
    if (id !== 0) {
      dispatch({type: FETCH_START});
      jwtAxios
        .get('facturacion-cliente/' + id)
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({
              type: SHOW_FACTURAR_CLIENTE_TERMINADO,
              payload: data.data,
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
    }
  };
};
