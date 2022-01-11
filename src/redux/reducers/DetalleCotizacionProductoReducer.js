import {
  GET_COLECCION_DETALLE_COTIZACION_PRODUCTO,
  GET_COLECCION_LIGERA_DETALLE_COTIZACION_PRODUCTO,
  SHOW_DETALLE_COTIZACION_PRODUCTO,
  UPDATE_DETALLE_COTIZACION_PRODUCTO,
  DELETE_DETALLE_COTIZACION_PRODUCTO,
  CREATE_DETALLE_COTIZACION_PRODUCTO,
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
    case CREATE_DETALLE_COTIZACION_PRODUCTO:
      let aux = state.rows;
      aux[aux.length] = action.payload;
      return {
        ...state,
        rows: aux,
      };

    case UPDATE_DETALLE_COTIZACION_PRODUCTO:
      let aux2 = state.rows;
      aux2[action.payload.index] = action.payload.aux;
      return {
        ...state,
        rows: aux2,
      };

    case DELETE_DETALLE_COTIZACION_PRODUCTO:
      return {
        ...state,
        rows: action.payload,
      };

    case GET_COLECCION_DETALLE_COTIZACION_PRODUCTO:
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

    case GET_COLECCION_LIGERA_DETALLE_COTIZACION_PRODUCTO:
      return {
        ...state,
        ligera: action.payload.data,
      };

    case SHOW_DETALLE_COTIZACION_PRODUCTO:
      return {
        ...state,
        selectedRow: action.payload,
      };

    default:
      return state;
  }
};
export default solicitudCotizacionReducer;
