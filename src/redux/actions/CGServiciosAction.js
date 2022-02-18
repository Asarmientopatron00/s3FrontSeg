import {
  GET_COLECCION_CONSULTA_SERVICIO_MODALIDAD,
  GET_DATOS_CONSULTA_SERVICIO_MODALIDAD,
  GET_COLECCION_CONSULTA_SERVICIO_RUTA,
  GET_DATOS_CONSULTA_SERVICIO_RUTA,
  GET_PROMEDIOS_CONSULTA_SERVICIO_RUTA,
  GET_COLECCION_CONSULTA_SERVICIO_CLIENTE,
  GET_DATOS_CONSULTA_SERVICIO_CLIENTE,
  GET_PROMEDIOS_CONSULTA_SERVICIO_CLIENTE,
  GET_COLECCION_CIUDADES_ORIGEN,
  GET_COLECCION_CIUDADES_DESTINO,
  GET_COLECCION_ASOCIADOS,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from '../../shared/constants/ActionTypes';
import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';

import {appIntl} from '../../@crema/utility/Utils';

export const onGetColeccionModalidad = (
  currentPage,
  rowsPerPage,
  fechaInicial,
  fechaFinal,
  fechaInstInicial,
  fechaInstFinal,
  tipoServicio,
  orderByToSend,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';
  const fechaInstInicialAux = fechaInstInicial ? fechaInstInicial : '';
  const fechaInstFinalAux = fechaInstFinal ? fechaInstFinal : '';
  const estadoAux = tipoServicio ? tipoServicio : '';
  const ordenar_por = orderByToSend ? orderByToSend : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/servicios', {
        params: {
          page: page,
          limite: rowsPerPage,
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          fechaInstInicial: fechaInstInicialAux,
          fechaInstFinal: fechaInstFinalAux,
          tipoServicio: estadoAux,
          modalidad: true,
          ordenar_por: ordenar_por,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_CONSULTA_SERVICIO_MODALIDAD,
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

export const onGetColeccionDatosModalidad = (
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
      .get('consultas-gerenciales/datos-servicios', {
        params: {
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          fechaInstInicial: fechaInstInicialAux,
          fechaInstFinal: fechaInstFinalAux,
          modalidad: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_DATOS_CONSULTA_SERVICIO_MODALIDAD,
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

export const onGetColeccionRuta = (
  currentPage,
  rowsPerPage,
  fechaInicial,
  fechaFinal,
  fechaInstInicial,
  fechaInstFinal,
  ciudadOrigen,
  ciudadDestino,
  estadoOrdenServicio,
  orderByToSend,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';
  const fechaInstInicialAux = fechaInstInicial ? fechaInstInicial : '';
  const fechaInstFinalAux = fechaInstFinal ? fechaInstFinal : '';
  const ciudadOrigenAux = ciudadOrigen ? ciudadOrigen : '';
  const ciudadDestinoAux = ciudadDestino ? ciudadDestino : '';
  const estadoAux = estadoOrdenServicio ? estadoOrdenServicio : '';
  const ordenar_por = orderByToSend ? orderByToSend : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/servicios', {
        params: {
          page: page,
          limite: rowsPerPage,
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          fechaInstInicial: fechaInstInicialAux,
          fechaInstFinal: fechaInstFinalAux,
          ciudadOrigen: ciudadOrigenAux,
          ciudadDestino: ciudadDestinoAux,
          estadoOrdenServicio: estadoAux,
          ruta: true,
          ordenar_por: ordenar_por,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_CONSULTA_SERVICIO_RUTA,
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

export const onGetPromediosRuta = (
  fechaInicial,
  fechaFinal,
  fechaInstInicial,
  fechaInstFinal,
  ciudadOrigen,
  ciudadDestino,
) => {
  const {messages} = appIntl();
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';
  const fechaInstInicialAux = fechaInstInicial ? fechaInstInicial : '';
  const fechaInstFinalAux = fechaInstFinal ? fechaInstFinal : '';
  const ciudadOrigenAux = ciudadOrigen ? ciudadOrigen : '';
  const ciudadDestinoAux = ciudadDestino ? ciudadDestino : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/servicios', {
        params: {
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          fechaInstInicial: fechaInstInicialAux,
          fechaInstFinal: fechaInstFinalAux,
          ciudadOrigen: ciudadOrigenAux,
          ciudadDestino: ciudadDestinoAux,
          ruta: true,
          todos: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_PROMEDIOS_CONSULTA_SERVICIO_RUTA,
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

export const onGetColeccionDatosRuta = (
  fechaInicial,
  fechaFinal,
  fechaInstInicial,
  fechaInstFinal,
  ciudadOrigen,
  ciudadDestino,
) => {
  const {messages} = appIntl();
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';
  const fechaInstInicialAux = fechaInstInicial ? fechaInstInicial : '';
  const fechaInstFinalAux = fechaInstFinal ? fechaInstFinal : '';
  const ciudadOrigenAux = ciudadOrigen ? ciudadOrigen : '';
  const ciudadDestinoAux = ciudadDestino ? ciudadDestino : '';
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/datos-servicios', {
        params: {
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          fechaInstInicial: fechaInstInicialAux,
          fechaInstFinal: fechaInstFinalAux,
          ciudadOrigen: ciudadOrigenAux,
          ciudadDestino: ciudadDestinoAux,
          ruta: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_DATOS_CONSULTA_SERVICIO_RUTA,
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

export const onGetColeccionCliente = (
  currentPage,
  rowsPerPage,
  fechaInicial,
  fechaFinal,
  fechaInstInicial,
  fechaInstFinal,
  asociadoId,
  estadoOrdenServicio,
  orderByToSend,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';
  const fechaInstInicialAux = fechaInstInicial ? fechaInstInicial : '';
  const fechaInstFinalAux = fechaInstFinal ? fechaInstFinal : '';
  const asociadoIdAux = asociadoId ? asociadoId : '';
  const estadoAux = estadoOrdenServicio ? estadoOrdenServicio : '';
  const ordenar_por = orderByToSend ? orderByToSend : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/servicios', {
        params: {
          page: page,
          limite: rowsPerPage,
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          fechaInstInicial: fechaInstInicialAux,
          fechaInstFinal: fechaInstFinalAux,
          asociadoId: asociadoIdAux,
          estadoOrdenServicio: estadoAux,
          cliente: true,
          ordenar_por: ordenar_por,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_CONSULTA_SERVICIO_CLIENTE,
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

export const onGetPromediosCliente = (
  fechaInicial,
  fechaFinal,
  fechaInstInicial,
  fechaInstFinal,
  asociadoId,
) => {
  const {messages} = appIntl();
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';
  const fechaInstInicialAux = fechaInstInicial ? fechaInstInicial : '';
  const fechaInstFinalAux = fechaInstFinal ? fechaInstFinal : '';
  const asociadoIdAux = asociadoId ? asociadoId : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/servicios', {
        params: {
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          fechaInstInicial: fechaInstInicialAux,
          fechaInstFinal: fechaInstFinalAux,
          asociadoId: asociadoIdAux,
          cliente: true,
          todos: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_PROMEDIOS_CONSULTA_SERVICIO_CLIENTE,
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

export const onGetColeccionDatosCliente = (
  fechaInicial,
  fechaFinal,
  fechaInstInicial,
  fechaInstFinal,
  asociadoId,
) => {
  const {messages} = appIntl();
  const fechaInicialAux = fechaInicial ? fechaInicial : '';
  const fechaFinalAux = fechaFinal ? fechaFinal : '';
  const fechaInstInicialAux = fechaInstInicial ? fechaInstInicial : '';
  const fechaInstFinalAux = fechaInstFinal ? fechaInstFinal : '';
  const asociadoIdAux = asociadoId ? asociadoId : '';
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/datos-servicios', {
        params: {
          fechaInicial: fechaInicialAux,
          fechaFinal: fechaFinalAux,
          fechaInstInicial: fechaInstInicialAux,
          fechaInstFinal: fechaInstFinalAux,
          asociadoId: asociadoIdAux,
          cliente: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_DATOS_CONSULTA_SERVICIO_CLIENTE,
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

export const onGetColeccionCiudadesOrigen = (ciudadDestino) => {
  const {messages} = appIntl();
  const ciudadDestinoAux = ciudadDestino ? ciudadDestino : '';
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/ciudades', {
        params: {
          ciudadDestino: ciudadDestinoAux,
          origen: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_CIUDADES_ORIGEN,
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

export const onGetColeccionCiudadesDestino = (ciudadOrigen) => {
  const {messages} = appIntl();
  const ciudadOrigenAux = ciudadOrigen ? ciudadOrigen : '';
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/ciudades', {
        params: {
          ciudadOrigen: ciudadOrigenAux,
          destino: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_CIUDADES_DESTINO,
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

export const onGetColeccionAsociados = () => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('consultas-gerenciales/asociados', {
        params: {},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_COLECCION_ASOCIADOS,
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
