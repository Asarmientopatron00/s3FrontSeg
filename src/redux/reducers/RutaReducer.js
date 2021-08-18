import {
  GET_COLECCION_RUTA,
  GET_COLECCION_LIGERA_RUTA,
  SHOW_RUTA,
  CLEAN_RUTA,
  UPDATE_RUTA,
  DELETE_RUTA,
  CREATE_RUTA,
  BUSCAR_RUTA,
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
  cantidadRutas: 0,
};

const RutaReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_RUTA:
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

    case GET_COLECCION_LIGERA_RUTA:
      return {
        ...state,
        ligera: action.payload.data,
      };

    case SHOW_RUTA:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case UPDATE_RUTA:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case DELETE_RUTA:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case CREATE_RUTA:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case BUSCAR_RUTA:
      return {
        ...state,
        cantidadRutas: action.payload.data,
      };

    case CLEAN_RUTA:
      return initialState;

    default:
      return state;
  }
};
export default RutaReducer;
