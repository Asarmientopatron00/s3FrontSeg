import {
  GET_COLECCION_ORDEN_SERVICIO,
  GET_COLECCION_LIGERA_ORDEN_SERVICIO,
  SHOW_ORDEN_SERVICIO,
  UPDATE_ORDEN_SERVICIO,
  DELETE_ORDEN_SERVICIO,
  CREATE_ORDEN_SERVICIO,
  APPROVE_ORDEN_SERVICIO,
  GET_ORDEN_SERVICIO_RUTAS,
  GET_COLECCION_LIGERA_ASOCIADO_ORDEN,
  GET_COLECCION_LIGERA_TERCERO_SERVICIO_ORDEN,
  GET_ORDEN_SERVICIO_PROGRAMACION,
  ENVIAR_PROGRAMACION,
} from '../../shared/constants/ActionTypes';

const initialState = {
  rows: [],
  ligera: [],
  selectedRow: null,
  desde: 1,
  hasta: 1,
  por_pagina: 1,
  pagina_actual: 1,
  ultima_pagina: 1,
  total: 1,
  ciudades: [],
  servicios: [],
  consecutivo: [],
  asociados: [],
  tercerosServicios: [],
  rutas: [],
  ordenesEnviar: [],
};

const ordenServicioReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_ORDEN_SERVICIO:
      return {
        ...state,
        rows: action.payload.data.datos,
        desde: action.payload.data.desde,
        hasta: action.payload.data.hasta,
        por_pagina: action.payload.data.por_pagina,
        pagina_actual: action.payload.data.pagina_actual,
        ultima_pagina: action.payload.data.ultima_pagina,
        total: action.payload.data.total,
      };

    case GET_COLECCION_LIGERA_ORDEN_SERVICIO:
      return {
        ...state,
        ligera: action.payload.data,
      };
    case SHOW_ORDEN_SERVICIO:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case GET_ORDEN_SERVICIO_PROGRAMACION:
      return {
        ...state,
        ordenesEnviar: action.payload,
      };

    case UPDATE_ORDEN_SERVICIO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };
    case DELETE_ORDEN_SERVICIO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };
    case APPROVE_ORDEN_SERVICIO:
      return {
        ...state,
      };

    case CREATE_ORDEN_SERVICIO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };
    case GET_COLECCION_LIGERA_ASOCIADO_ORDEN:
      return {
        ...state,
        asociados: action.payload.data,
      };
    case GET_ORDEN_SERVICIO_RUTAS:
      return {
        ...state,
        rutas: action.payload.data,
      };
    case GET_COLECCION_LIGERA_TERCERO_SERVICIO_ORDEN:
      return {
        ...state,
        tercerosServicios: action.payload.data,
      };
    default:
      return state;
  }
};
export default ordenServicioReducer;
