import {
  GET_COLECCION_COTIZACION,
  GET_COLECCION_LIGERA_COTIZACION,
  SHOW_COTIZACION,
  UPDATE_COTIZACION,
  DELETE_COTIZACION,
  CREATE_COTIZACION,
  ENVIAR_COTIZACION,
  APPROVE_COTIZACION,
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
    case GET_COLECCION_COTIZACION:
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

    case GET_COLECCION_LIGERA_COTIZACION:
      return {
        ...state,
        ligera: action.payload.data,
      };
    case SHOW_COTIZACION:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case UPDATE_COTIZACION:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };
    case APPROVE_COTIZACION:
      return {
        ...state,
      };
    case DELETE_COTIZACION:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };
    case ENVIAR_COTIZACION:
      return {
        ...state,
      };

    case CREATE_COTIZACION:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    default:
      return state;
  }
};
export default solicitudCotizacionReducer;
