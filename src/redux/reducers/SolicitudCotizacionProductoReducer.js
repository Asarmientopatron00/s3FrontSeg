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

const solicitudCotizacionProductoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_SOLICITUD_COTIZACION_PRODUCTO:
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

    case GET_COLECCION_LIGERA_SOLICITUD_COTIZACION_PRODUCTO:
      return {
        ...state,
        ligera: action.payload.data,
      };
    case GET_COLECCION_LIGERA_SOLICITUD_COTIZACION_CIUDAD:
      return {
        ...state,
        ciudades: action.payload.data,
      };
    case GET_COLECCION_LIGERA_SOLICITUD_COTIZACION_SERVICIO:
      return {
        ...state,
        servicios: action.payload.data,
      };
    case SHOW_SOLICITUD_COTIZACION_PRODUCTO:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case INFORMACION_SOLICITUD_COTIZACION_PRODUCTO_CONTACTO:
      return {
        ...state,
        ciudades: action.payload.datos.ciudades,
        servicios: action.payload.datos.servicios,
      };

    case UPDATE_SOLICITUD_COTIZACION_PRODUCTO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case DELETE_SOLICITUD_COTIZACION_PRODUCTO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case CREATE_SOLICITUD_COTIZACION_PRODUCTO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    default:
      return state;
  }
};
export default solicitudCotizacionProductoReducer;
