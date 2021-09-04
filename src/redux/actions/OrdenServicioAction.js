import {
  GET_COLECCION_ORDEN_SERVICIO,
  GET_COLECCION_LIGERA_ORDEN_SERVICIO,
  SHOW_ORDEN_SERVICIO,
  UPDATE_ORDEN_SERVICIO,
  DELETE_ORDEN_SERVICIO,
  CREATE_ORDEN_SERVICIO,
  APPROVE_ORDEN_SERVICIO,
  GET_COLECCION_LIGERA_ASOCIADO_ORDEN,
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
  fecha_orden_servicio,
  estados,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const numero_solicitudAux = numero_solicitud ? numero_solicitud : '';
  const ordenar_por = orderByToSend ? orderByToSend : '';
  const nombre_empresaAux = nombre_empresa ? nombre_empresa : '';
  const estadosAux = estados ? estados : '';
  const fecha_orden_servicioAux = fecha_orden_servicio
    ? fecha_orden_servicio
    : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('ordenes-servicios', {
        params: {
          page: page,
          limite: rowsPerPage,
          numero_orden_servicio: numero_solicitudAux,
          ordenar_por: ordenar_por,
          nombre: nombre_empresaAux,
          estados: estadosAux,
          fecha_orden_servicio: fecha_orden_servicioAux,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_COLECCION_ORDEN_SERVICIO, payload: data});
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
      .get('ordenes-servicios', {
        params: {
          ligera: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_LIGERA_ORDEN_SERVICIO,
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
        .get('ordenes-servicios/' + id)
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({type: SHOW_ORDEN_SERVICIO, payload: data.data});
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

export const onUpdate = (params, handleOnClose, detalles) => {
  params['detalles'] = detalles;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .put('ordenes-servicios/' + params.id, params)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_ORDEN_SERVICIO,
            payload: data.data,
          });
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

// export const onEnviarCorreo = (id, updateColeccion) => {
//   return (dispatch) => {
//     dispatch({type: FETCH_START});
//     jwtAxios
//       .get('ordenes-servicios/send-email/' + id)
//       .then((data) => {
//         if (data.status === 200) {
//           dispatch({type: FETCH_SUCCESS});
//           updateColeccion();
//           dispatch({type: ENVIAR_ORDEN_SERVICIO, payload: data.data});
//           dispatch({
//             type: SHOW_MESSAGE,
//             payload: data.data.mensajes[0],
//           });
//         } else {
//           dispatch({type: FETCH_ERROR, payload: data.data.mensajes[0]});
//         }
//       })
//       .catch((error) => {
//         if (error.response.data.mensajes) {
//           dispatch({
//             type: FETCH_ERROR,
//             payload: error.response.data.mensajes[0],
//           });
//         } else {
//           dispatch({type: FETCH_ERROR, payload: error.message});
//         }
//       });
//   };
// };

export const onDelete = (id, updateColeccion) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .delete('ordenes-servicios/' + id)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          updateColeccion();
          dispatch({type: DELETE_ORDEN_SERVICIO, payload: data.data});
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

export const onCreate = (params, handleOnClose, detalles) => {
  params['detalles'] = detalles;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .post('ordenes-servicios', params)
      .then((data) => {
        console.log(data);
        if (data.status === 201) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: CREATE_ORDEN_SERVICIO,
            payload: data.data,
          });
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

export const onApprove = (params, handleOnClose, updateColeccion) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .post('ordenes-servicios/aprobar/' + params.id, params)
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: APPROVE_ORDEN_SERVICIO,
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

export const onGetColeccionLigeraAsociado = () => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('asociados-negocio', {
        params: {
          ligera: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_LIGERA_ASOCIADO_ORDEN,
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
