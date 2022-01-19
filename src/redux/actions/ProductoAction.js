import {
  GET_COLECCION_PRODUCTO,
  GET_COLECCION_LIGERA_PRODUCTO,
  SHOW_PRODUCTO,
  UPDATE_PRODUCTO,
  DELETE_PRODUCTO,
  CREATE_PRODUCTO,
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
  codigo_producto,
  orderByToSend,
  nombre,
  tipo_producto_id,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const codigo_productoAux = codigo_producto ? codigo_producto : '';
  const nombreAux = nombre ? nombre : '';
  const ordenar_por = orderByToSend ? orderByToSend : '';
  const tipo_producto_idAux = tipo_producto_id ? tipo_producto_id : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('productos', {
        params: {
          page: page,
          limite: rowsPerPage,
          codigo_producto: codigo_productoAux,
          nombre: nombreAux,
          tipo_producto_id: tipo_producto_idAux,
          ordenar_por: ordenar_por,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_COLECCION_PRODUCTO, payload: data});
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
      .get('productos', {
        params: {
          ligera: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_COLECCION_LIGERA_PRODUCTO, payload: data});
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
        .get('productos/' + id)
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({type: SHOW_PRODUCTO, payload: data.data});
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
    var formData = new FormData();
    formData.append('archivo', params['archivo']);
    formData.append('archivo_foto', params['archivo_foto']);
    formData.append('id', params['id']);
    formData.append('codigo_producto', params['codigo_producto']);
    formData.append('nombre', params['nombre']);
    formData.append('alias_producto', params['alias_producto']);
    formData.append(
      'descripcion_tecnica_producto',
      params['descripcion_tecnica_producto'],
    );
    formData.append('tipo_producto_id', params['tipo_producto_id']);
    formData.append('color_id', params['color_id']);
    formData.append('dimensiones_producto', params['dimensiones_producto']);
    formData.append(
      'caracteristicas_producto',
      params['caracteristicas_producto'],
    );
    formData.append('producto_empaque', params['producto_empaque']);
    formData.append(
      'producto_cliente_especifico',
      params['producto_cliente_especifico'],
    );
    formData.append('producto_produccion_id', params['producto_produccion_id']);
    formData.append(
      'producto_facturacion_id',
      params['producto_facturacion_id'],
    );
    formData.append('estado', params['estado']);

    dispatch({type: FETCH_START});
    jwtAxios
      .post('productos/' + params.id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((data) => {
        if (data.status === 200 || data.status === 201) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_PRODUCTO,
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
      .delete('productos/' + id)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: DELETE_PRODUCTO, payload: data.data});
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

export const onCreate = (params, handleOnClose, updateColeccion) => {
  // const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .post('productos', params)
      .then((data) => {
        console.log(data);
        if (data.status === 201) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: CREATE_PRODUCTO,
            payload: data.data,
          });
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
