import {
  GET_COLECCION_INFORMACION_EQUIPO,
  GET_COLECCION_LIGERA_INFORMACION_EQUIPO,
  SHOW_INFORMACION_EQUIPO,
  UPDATE_INFORMACION_EQUIPO,
  DELETE_INFORMACION_EQUIPO,
  CREATE_INFORMACION_EQUIPO,
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

const InformacionEquipoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_INFORMACION_EQUIPO:
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

    case GET_COLECCION_LIGERA_INFORMACION_EQUIPO:
      return {
        ...state,
        ligera: action.payload.data,
      };

    case SHOW_INFORMACION_EQUIPO:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case UPDATE_INFORMACION_EQUIPO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case DELETE_INFORMACION_EQUIPO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case CREATE_INFORMACION_EQUIPO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    default:
      return state;
  }
};
export default InformacionEquipoReducer;
