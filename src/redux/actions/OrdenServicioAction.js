import {
  GET_COLECCION_ORDEN_SERVICIO,
  GET_COLECCION_LIGERA_ORDEN_SERVICIO,
  SHOW_ORDEN_SERVICIO,
  UPDATE_ORDEN_SERVICIO,
  DELETE_ORDEN_SERVICIO,
  CREATE_ORDEN_SERVICIO,
  APPROVE_ORDEN_SERVICIO,
  GET_COLECCION_LIGERA_ASOCIADO_ORDEN,
  GET_COLECCION_LIGERA_TERCERO_SERVICIO_ORDEN,
  GET_ORDEN_SERVICIO_RUTAS,
  GET_ORDEN_SERVICIO_PROGRAMACION,
  ENVIAR_PROGRAMACION,
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
  fechaOSInicial,
  fechaOSFinal,
  fechaProgInicial,
  fechaProgFinal,
  ciudad,
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
  const fechaOSInicialAux = fechaOSInicial ? fechaOSInicial : '';
  const fechaOSFinalAux = fechaOSFinal ? fechaOSFinal : '';
  const fechaProgInicialAux = fechaProgInicial ? fechaProgInicial : '';
  const fechaProgFinalAux = fechaProgFinal ? fechaProgFinal : '';
  const ciudadAux = ciudad ? ciudad : '';

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
          fechaOSInicial: fechaOSInicialAux,
          fechaOSFinal: fechaOSFinalAux,
          fechaProgInicial: fechaProgInicialAux,
          fechaProgFinal: fechaProgFinalAux,
          ciudad: ciudadAux,
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

export const onGetColeccionProgramacion = (
  currentPage,
  rowsPerPage,
  numero_solicitud,
  orderByToSend,
  nombre_empresa,
  fecha_orden_servicio,
  estados,
  fechaOSInicial,
  fechaOSFinal,
  fechaProgInicial,
  fechaProgFinal,
  ciudad,
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
  const fechaOSInicialAux = fechaOSInicial ? fechaOSInicial : '';
  const fechaOSFinalAux = fechaOSFinal ? fechaOSFinal : '';
  const fechaProgInicialAux = fechaProgInicial ? fechaProgInicial : '';
  const fechaProgFinalAux = fechaProgFinal ? fechaProgFinal : '';
  const ciudadAux = ciudad ? ciudad : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('ordenes-servicios/programacion', {
        params: {
          page: page,
          limite: rowsPerPage,
          numero_orden_servicio: numero_solicitudAux,
          ordenar_por: ordenar_por,
          nombre: nombre_empresaAux,
          estados: estadosAux,
          fecha_orden_servicio: fecha_orden_servicioAux,
          fechaOSInicial: fechaOSInicialAux,
          fechaOSFinal: fechaOSFinalAux,
          fechaProgInicial: fechaProgInicialAux,
          fechaProgFinal: fechaProgFinalAux,
          ciudad: ciudadAux,
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

export const onGetColeccionAceptacion = (
  currentPage,
  rowsPerPage,
  numero_solicitud,
  orderByToSend,
  nombre_empresa,
  fecha_orden_servicio,
  estados,
  fechaOSInicial,
  fechaOSFinal,
  fechaProgInicial,
  fechaProgFinal,
  ciudad,
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
  const fechaOSInicialAux = fechaOSInicial ? fechaOSInicial : '';
  const fechaOSFinalAux = fechaOSFinal ? fechaOSFinal : '';
  const fechaProgInicialAux = fechaProgInicial ? fechaProgInicial : '';
  const fechaProgFinalAux = fechaProgFinal ? fechaProgFinal : '';
  const ciudadAux = ciudad ? ciudad : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('ordenes-servicios/aceptacion', {
        params: {
          page: page,
          limite: rowsPerPage,
          numero_orden_servicio: numero_solicitudAux,
          ordenar_por: ordenar_por,
          nombre: nombre_empresaAux,
          estados: estadosAux,
          fecha_orden_servicio: fecha_orden_servicioAux,
          fechaOSInicial: fechaOSInicialAux,
          fechaOSFinal: fechaOSFinalAux,
          fechaProgInicial: fechaProgInicialAux,
          fechaProgFinal: fechaProgFinalAux,
          ciudad: ciudadAux,
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

export const onGetColeccionReporteHoras = (
  currentPage,
  rowsPerPage,
  numero_solicitud,
  orderByToSend,
  nombre_empresa,
  fecha_orden_servicio,
  estados,
  fechaOSInicial,
  fechaOSFinal,
  fechaProgInicial,
  fechaProgFinal,
  ciudad,
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
  const fechaOSInicialAux = fechaOSInicial ? fechaOSInicial : '';
  const fechaOSFinalAux = fechaOSFinal ? fechaOSFinal : '';
  const fechaProgInicialAux = fechaProgInicial ? fechaProgInicial : '';
  const fechaProgFinalAux = fechaProgFinal ? fechaProgFinal : '';
  const ciudadAux = ciudad ? ciudad : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('ordenes-servicios/horas-trabajadas', {
        params: {
          page: page,
          limite: rowsPerPage,
          numero_orden_servicio: numero_solicitudAux,
          ordenar_por: ordenar_por,
          nombre: nombre_empresaAux,
          estados: estadosAux,
          fecha_orden_servicio: fecha_orden_servicioAux,
          fechaOSInicial: fechaOSInicialAux,
          fechaOSFinal: fechaOSFinalAux,
          fechaProgInicial: fechaProgInicialAux,
          fechaProgFinal: fechaProgFinalAux,
          ciudad: ciudadAux,
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

export const onUpdate = (params, handleOnClose, updateColeccion) => {
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

export const onCreate = (params, handleOnClose) => {
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

export const onGetColeccionLigeraTerceroServicio = () => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('terceros-servicio', {
        params: {
          ligera: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_LIGERA_TERCERO_SERVICIO_ORDEN,
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

export const onGetRutas = (asociado_id) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('ordenes-servicios/rutas', {
        params: {
          asociado_id: asociado_id,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_ORDEN_SERVICIO_RUTAS, payload: data});
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

export const onImport = (params, setActiveStep, setRows) => {
  return (dispatch) => {
    var formData = new FormData();
    formData.append('archivo', params['archivo']);
    dispatch({type: FETCH_START});
    jwtAxios
      .post('ordenes-servicios/importar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((data) => {
        if (data.status === 201) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_ORDEN_SERVICIO_RUTAS, payload: data});
          setRows(data.data.datos);
          setActiveStep(1);
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
        console.log();
        try {
          dispatch({
            type: FETCH_ERROR,
            payload: error.response.data.mensajes[0],
          });
        } catch {
          try {
            dispatch({
              type: FETCH_ERROR,
              payload: error,
            });
          } catch {
            dispatch({
              type: FETCH_ERROR,
              payload: 'Error',
            });
          }
        }
      });
  };
};

export const onEnvioCorreos = (fecha, asociados) => {
  console.log(fecha, asociados);
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .post('ordenes-servicios/envio-correo-programacion', {
        fecha_programacion: fecha,
        asociados: asociados,
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: ENVIAR_PROGRAMACION,
            payload: data.data,
          });
          dispatch({
            type: SHOW_MESSAGE,
            payload: data.data.mensajes[0],
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

export const onGetEnvioCorreos = (fecha) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('ordenes-servicios/envio-correo-programacion', {
        params: {
          fecha_programacion: fecha,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_ORDEN_SERVICIO_PROGRAMACION,
            payload: data.data.datos,
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
