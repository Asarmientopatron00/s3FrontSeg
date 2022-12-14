import {
  GET_COLECCION_ASOCIADO_DOCUMENTO,
  SHOW_ASOCIADO_DOCUMENTO,
  DELETE_ASOCIADO_DOCUMENTO,
  CREATE_ASOCIADO_DOCUMENTO,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';

import {appIntl} from '../../@crema/utility/Utils';

export const onGetColeccion = (asociado_id) => {
  const {messages} = appIntl();

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('asociados-documentos', {
        params: {
          asociado_id: asociado_id,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_COLECCION_ASOCIADO_DOCUMENTO, payload: data});
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
        .get('asociados-documentos/' + id)
        .then((data) => {
          if (data.status === 200) {
            const url = window.URL.createObjectURL(
              new Blob([data.data], {type: 'application/pdf'}),
            );
            // const url = data.data.ruta_documento;
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'documento.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
            dispatch({type: FETCH_SUCCESS});
            dispatch({type: SHOW_ASOCIADO_DOCUMENTO, payload: data});
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

export const onDelete = (id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .delete('asociados-documentos/' + id)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: DELETE_ASOCIADO_DOCUMENTO, payload: data.data});
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

export const onCreate = (params, handleOnCloseForm) => {
  // const {messages} = appIntl();
  return (dispatch) => {
    var formData = new FormData();
    formData.append('archivo', params['archivo']);
    formData.append('nombre_archivo', params['nombre_archivo']);
    formData.append(
      'fecha_vencimiento_documento',
      params['fecha_vencimiento_documento'],
    );
    formData.append('documento_id', params['documento_id']);
    formData.append('asociado_id', params['asociado_id']);
    dispatch({type: FETCH_START});
    jwtAxios
      .post('asociados-documentos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((data) => {
        if (data.status === 201) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: CREATE_ASOCIADO_DOCUMENTO,
            payload: data.data,
          });
          handleOnCloseForm();
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
