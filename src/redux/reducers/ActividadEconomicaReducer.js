import {
  GET_COLECCION_ACTIVIDAD_ECONOMICA,
  GET_COLECCION_LIGERA_ACTIVIDAD_ECONOMICA,
  SHOW_ACTIVIDAD_ECONOMICA,
  UPDATE_ACTIVIDAD_ECONOMICA,
  DELETE_ACTIVIDAD_ECONOMICA,
  CREATE_ACTIVIDAD_ECONOMICA,
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
};

const ActividadEconomicaReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_ACTIVIDAD_ECONOMICA:
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

    case GET_COLECCION_LIGERA_ACTIVIDAD_ECONOMICA:
      return {
        ...state,
        ligera: action.payload.data,
      };

    case SHOW_ACTIVIDAD_ECONOMICA:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case UPDATE_ACTIVIDAD_ECONOMICA:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case DELETE_ACTIVIDAD_ECONOMICA:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case CREATE_ACTIVIDAD_ECONOMICA:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    default:
      return state;
  }
};
export default ActividadEconomicaReducer;
