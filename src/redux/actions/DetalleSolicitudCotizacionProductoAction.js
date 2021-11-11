import {
  GET_COLECCION_DETALLE_SOLICITUD_COTIZACION_PRODUCTO,
  GET_COLECCION_LIGERA_DETALLE_SOLICITUD_COTIZACION_PRODUCTO,
  SHOW_DETALLE_SOLICITUD_COTIZACION_PRODUCTO,
  UPDATE_DETALLE_SOLICITUD_COTIZACION_PRODUCTO,
  DELETE_DETALLE_SOLICITUD_COTIZACION_PRODUCTO,
  // CREATE_DETALLE_SOLICITUD_COTIZACION_PRODUCTO,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';

import {appIntl} from '../../@crema/utility/Utils';

export const onGetColeccion = (
  currentPage,
  rowsPerPage,
  orderByToSend,
  cotizacion_id,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const ordenar_por = orderByToSend ? orderByToSend : '';
  const cotizacion_idAux = cotizacion_id ? cotizacion_id : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('detalles-solicitudes-productos', {
        params: {
          page: page,
          limite: rowsPerPage,
          ordenar_por: ordenar_por,
          cotizacion_id: cotizacion_idAux,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_DETALLE_SOLICITUD_COTIZACION_PRODUCTO,
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

export const onGetColeccionLigera = () => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('detalles-solicitudes-productos', {
        params: {
          ligera: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_LIGERA_DETALLE_SOLICITUD_COTIZACION_PRODUCTO,
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
        .get('detalles-solicitudes-productos/' + id)
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({
              type: SHOW_DETALLE_SOLICITUD_COTIZACION_PRODUCTO,
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

export const onUpdate = (params, handleOnClose, updateColeccion) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .put('detalles-solicitudes-productos/' + params.id, params)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_DETALLE_SOLICITUD_COTIZACION_PRODUCTO,
            payload: data.data,
          });
          updateColeccion();
          handleOnClose();
          dispatch({
            type: SHOW_MESSAGE,
            payload: data.data.mensajes[0],
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: data.data.mensajes[0],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.response.data.mensajes[0]});
      });
  };
};

export const onDelete = (id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .delete('detalles-solicitudes-productos/' + id)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: DELETE_DETALLE_SOLICITUD_COTIZACION_PRODUCTO,
            payload: data.data,
          });
        } else {
          dispatch({type: FETCH_ERROR, payload: data.data.mensajes[0]});
        }
      })
      .catch((error) => {
        if (error.response.data.mensajes) {
          dispatch({
            type: FETCH_ERROR,
            payload: error.response.data.mensajes[0],
          });
        } else {
          dispatch({type: FETCH_ERROR, payload: error.message});
        }
      });
  };
};

export const onCreate = (
  params,
  handleOnClose,
  updateColeccion,
  setConsecutivo,
) => {
  // const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .post('detalles-solicitudes-productos', params)
      .then((data) => {
        console.log(data);
        if (data.status === 201) {
          dispatch({type: FETCH_SUCCESS});
          // dispatch({
          //   type: CREATE_DETALLE_SOLICITUD_COTIZACION_PRODUCTO,
          //   payload: data.data,
          // });
          setConsecutivo(data.data.datos.numero_solicitud);
          updateColeccion();
          handleOnClose();
          dispatch({
            type: SHOW_MESSAGE,
            payload: data.data.mensajes[0],
          });
        } else {
          dispatch({type: FETCH_ERROR, payload: data.data.mensajes[0]});
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.response.data.mensajes[0]});
      });
  };
};
