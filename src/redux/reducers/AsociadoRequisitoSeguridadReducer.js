import {
  GET_COLECCION_ASOCIADO_REQUISITO_SEGURIDAD,
  SHOW_ASOCIADO_REQUISITO_SEGURIDAD,
  UPDATE_ASOCIADO_REQUISITO_SEGURIDAD,
  CLEAN_ROWS,
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

const asociadoRequisitoSeguridadReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_ASOCIADO_REQUISITO_SEGURIDAD:
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

    case SHOW_ASOCIADO_REQUISITO_SEGURIDAD:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case UPDATE_ASOCIADO_REQUISITO_SEGURIDAD:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };
    case CLEAN_ROWS:
      return {
        ...state,
        rows: [],
        encabezado: {},
      };

    default:
      return state;
  }
};
export default asociadoRequisitoSeguridadReducer;
