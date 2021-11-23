import {
  GET_COLECCION_HORARIO_RECURSO_TECNICO,
  GET_COLECCION_LIGERA_HORARIO_RECURSO_TECNICO,
  SHOW_HORARIO_RECURSO_TECNICO,
  UPDATE_HORARIO_RECURSO_TECNICO,
  DELETE_HORARIO_RECURSO_TECNICO,
  CREATE_HORARIO_RECURSO_TECNICO,
  CONSULTAR_FECHAS,
  PROGRAMAR_HORARIOS,
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

const ProductoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_HORARIO_RECURSO_TECNICO:
      return {
        ...state,
        rows: action.payload.data.datos,
        desde: action.payload.data.desde,
        hasta: action.payload.data.hasta,
        por_pagina: action.payload.data.por_pagina,
        pagina_actual: action.payload.data.pagina_actual,
        ultima_pagina: action.payload.data.ultima_pagina,
        total: action.payload.data.total,
        fechas: [],
      };

    case GET_COLECCION_LIGERA_HORARIO_RECURSO_TECNICO:
      return {
        ...state,
        ligera: action.payload.data,
      };

    case CONSULTAR_FECHAS:
      return {
        ...state,
        fechas: action.payload,
      };

    case SHOW_HORARIO_RECURSO_TECNICO:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case UPDATE_HORARIO_RECURSO_TECNICO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case PROGRAMAR_HORARIOS:
      return {
        ...state,
      };

    case DELETE_HORARIO_RECURSO_TECNICO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case CREATE_HORARIO_RECURSO_TECNICO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    default:
      return state;
  }
};
export default ProductoReducer;
