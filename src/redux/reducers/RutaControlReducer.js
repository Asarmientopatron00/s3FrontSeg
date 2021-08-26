import {
  GET_COLECCION_RUTA_CONTROL,
  SHOW_RUTA_CONTROL,
  UPDATE_RUTA_CONTROL,
  DELETE_RUTA_CONTROL,
  CREATE_RUTA_CONTROL,
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

const rutaControlReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_RUTA_CONTROL:
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

    case SHOW_RUTA_CONTROL:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case UPDATE_RUTA_CONTROL:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case DELETE_RUTA_CONTROL:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case CREATE_RUTA_CONTROL:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    default:
      return state;
  }
};
export default rutaControlReducer;
