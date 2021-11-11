import {
  GET_COLECCION_SOLICITUD_COTIZACION_PRODUCTO,
  GET_COLECCION_LIGERA_SOLICITUD_COTIZACION_PRODUCTO,
  SHOW_SOLICITUD_COTIZACION_PRODUCTO,
  UPDATE_SOLICITUD_COTIZACION_PRODUCTO,
  DELETE_SOLICITUD_COTIZACION_PRODUCTO,
  CREATE_SOLICITUD_COTIZACION_PRODUCTO,
  GET_COLECCION_LIGERA_SOLICITUD_COTIZACION_CIUDAD,
  GET_COLECCION_LIGERA_SOLICITUD_COTIZACION_SERVICIO,
  INFORMACION_SOLICITUD_COTIZACION_PRODUCTO_CONTACTO,
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
  numero_solicitud,
  orderByToSend,
  nombre_empresa,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const numero_solicitudAux = numero_solicitud ? numero_solicitud : '';
  const ordenar_por = orderByToSend ? orderByToSend : '';
  const nombre_empresaAux = nombre_empresa ? nombre_empresa : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('solicitudes-cotizaciones-productos', {
        params: {
          page: page,
          limite: rowsPerPage,
          numero_solicitud: numero_solicitudAux,
          ordenar_por: ordenar_por,
          nombre_empresa: nombre_empresaAux,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_SOLICITUD_COTIZACION_PRODUCTO,
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

export const onGetColeccionLigera = (sol) => {
  const page = sol ? sol : false;
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('solicitudes-cotizaciones-productos', {
        params: {
          ligera: true,
          sol: page,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_LIGERA_SOLICITUD_COTIZACION_PRODUCTO,
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
        .get('solicitudes-cotizaciones-productos/' + id)
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({
              type: SHOW_SOLICITUD_COTIZACION_PRODUCTO,
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
      .put('solicitudes-cotizaciones-productos/' + params.id, params)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_SOLICITUD_COTIZACION_PRODUCTO,
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
      .delete('solicitudes-cotizaciones-productos/' + id)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: DELETE_SOLICITUD_COTIZACION_PRODUCTO,
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
      .post('solicitudes-cotizaciones-productos', params)
      .then((data) => {
        console.log(data);
        if (data.status === 201) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: CREATE_SOLICITUD_COTIZACION_PRODUCTO,
            payload: data.data,
          });
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

export const onGetColeccionLigeraCiudad = (depto) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('ciudades', {
        params: {
          ligera: true,
          departamento_id: depto,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_LIGERA_SOLICITUD_COTIZACION_CIUDAD,
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

export const onGetColeccionLigeraServicio = () => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('servicios', {
        params: {
          ligera: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_LIGERA_SOLICITUD_COTIZACION_SERVICIO,
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

export const onGetInformacionSolicitudContacto = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/solicitud-contacto')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: INFORMACION_SOLICITUD_COTIZACION_PRODUCTO_CONTACTO,
            payload: data.data,
          });
          // dispatch({
          //   type: SHOW_MESSAGE,
          //   payload: data.data.mensajes[0],
          // });
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

export const onCreateContacto = (params, handleOnClose, setConsecutivo) => {
  // const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .post('crear-cotizacion-contacto', params)
      .then((data) => {
        if (data.status === 201) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: CREATE_SOLICITUD_COTIZACION_PRODUCTO,
            payload: data.data,
          });
          setConsecutivo(data.data.datos.numero_solicitud);
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
