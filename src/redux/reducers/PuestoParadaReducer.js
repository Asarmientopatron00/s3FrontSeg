import {
  GET_COLECCION_PUESTO_PARADA,
  SHOW_PUESTO_PARADA,
  UPDATE_PUESTO_PARADA,
  DELETE_PUESTO_PARADA,
  CREATE_PUESTO_PARADA,
} from '../../shared/constants/ActionTypes';

const initialState = {
  rows: [],
  selectedRow: null,
  desde: 1,
  hasta: 1,
  por_pagina: 1,
  pagina_actual: 1,
  ultima_pagina: 1,
  total: 1,
  encabezado: {},
};

const rutaAutorizacionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_PUESTO_PARADA:
      return {
        ...state,
        rows: action.payload.data.datos,
        desde: action.payload.data.desde,
        hasta: action.payload.data.hasta,
        por_pagina: action.payload.data.por_pagina,
        pagina_actual: action.payload.data.pagina_actual,
        ultima_pagina: action.payload.data.ultima_pagina,
        total: action.payload.data.total,
        encabezado: action.payload.data.encabezado,
      };

    case SHOW_PUESTO_PARADA:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case UPDATE_PUESTO_PARADA:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case DELETE_PUESTO_PARADA:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case CREATE_PUESTO_PARADA:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    default:
      return state;
  }
};
export default rutaAutorizacionReducer;
