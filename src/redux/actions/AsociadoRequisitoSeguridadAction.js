import {
  GET_COLECCION_ASOCIADO_REQUISITO_SEGURIDAD,
  SHOW_ASOCIADO_REQUISITO_SEGURIDAD,
  UPDATE_ASOCIADO_REQUISITO_SEGURIDAD,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';

import {appIntl} from '../../@crema/utility/Utils';

export const onGetColeccion = (currentPage, orderByToSend, asociado_id) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('asociados-requisitos-seguridad', {
        params: {
          page: page,
          asociado_id: asociado_id,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_ASOCIADO_REQUISITO_SEGURIDAD,
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
        .get('asociados-requisitos-seguridad/' + id)
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({
              type: SHOW_ASOCIADO_REQUISITO_SEGURIDAD,
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

export const onUpdate = (params, updateColeccion) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .put('asociados-requisitos-seguridad', params)
      .then((data) => {
        if (data.status === 201) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_ASOCIADO_REQUISITO_SEGURIDAD,
            payload: data.data,
          });
          updateColeccion();
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
