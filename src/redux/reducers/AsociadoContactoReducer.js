import {
  GET_COLECCION_ASOCIADO_CONTACTO,
  SHOW_ASOCIADO_CONTACTO,
  UPDATE_ASOCIADO_CONTACTO,
  DELETE_ASOCIADO_CONTACTO,
  CREATE_ASOCIADO_CONTACTO,
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

const asociadoContactoLegalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_ASOCIADO_CONTACTO:
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

    case SHOW_ASOCIADO_CONTACTO:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case UPDATE_ASOCIADO_CONTACTO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case DELETE_ASOCIADO_CONTACTO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case CREATE_ASOCIADO_CONTACTO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    default:
      return state;
  }
};
export default asociadoContactoLegalReducer;
