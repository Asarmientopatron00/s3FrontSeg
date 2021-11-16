import {
  GET_COLECCION_COTIZACION_PRODUCTO,
  GET_COLECCION_LIGERA_COTIZACION_PRODUCTO,
  SHOW_COTIZACION_PRODUCTO,
  UPDATE_COTIZACION_PRODUCTO,
  DELETE_COTIZACION_PRODUCTO,
  CREATE_COTIZACION_PRODUCTO,
  ENVIAR_COTIZACION_PRODUCTO,
  APPROVE_COTIZACION_PRODUCTO,
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

const solicitudCotizacionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_COTIZACION_PRODUCTO:
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

    case GET_COLECCION_LIGERA_COTIZACION_PRODUCTO:
      return {
        ...state,
        ligera: action.payload.data,
      };
    case SHOW_COTIZACION_PRODUCTO:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case UPDATE_COTIZACION_PRODUCTO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };
    case APPROVE_COTIZACION_PRODUCTO:
      return {
        ...state,
      };
    case DELETE_COTIZACION_PRODUCTO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };
    case ENVIAR_COTIZACION_PRODUCTO:
      return {
        ...state,
      };

    case CREATE_COTIZACION_PRODUCTO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    default:
      return state;
  }
};
export default solicitudCotizacionReducer;
