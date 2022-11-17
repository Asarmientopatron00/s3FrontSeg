import {
  GET_COLECCION_DETALLE_SOLICITUD_COTIZACION_SERVICIO,
  GET_COLECCION_LIGERA_DETALLE_SOLICITUD_COTIZACION_SERVICIO,
  SHOW_DETALLE_SOLICITUD_COTIZACION_SERVICIO,
  UPDATE_DETALLE_SOLICITUD_COTIZACION_SERVICIO,
  DELETE_DETALLE_SOLICITUD_COTIZACION_SERVICIO,
  CREATE_DETALLE_SOLICITUD_COTIZACION_SERVICIO,
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
};

const DetalleSolicitudCotizacionServicioReducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case CREATE_DETALLE_SOLICITUD_COTIZACION_SERVICIO:
      let aux = state.rows;
      aux[aux.length] = action.payload;
      return {
        ...state,
        rows: aux,
      };

    case UPDATE_DETALLE_SOLICITUD_COTIZACION_SERVICIO:
      let aux2 = state.rows;
      aux2[action.payload.index] = action.payload.aux;
      return {
        ...state,
        rows: aux2,
      };

    case DELETE_DETALLE_SOLICITUD_COTIZACION_SERVICIO:
      return {
        ...state,
        rows: action.payload,
      };

    case GET_COLECCION_DETALLE_SOLICITUD_COTIZACION_SERVICIO:
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

    case GET_COLECCION_LIGERA_DETALLE_SOLICITUD_COTIZACION_SERVICIO:
      return {
        ...state,
        ligera: action.payload.data,
      };

    case SHOW_DETALLE_SOLICITUD_COTIZACION_SERVICIO:
      return {
        ...state,
        selectedRow: action.payload,
      };

    default:
      return state;
  }
};
export default DetalleSolicitudCotizacionServicioReducer;
