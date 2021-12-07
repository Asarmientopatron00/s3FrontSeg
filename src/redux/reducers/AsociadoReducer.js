import {
  GET_COLECCION_ASOCIADO,
  GET_COLECCION_LIGERA_ASOCIADO,
  SHOW_ASOCIADO,
  UPDATE_ASOCIADO,
  DELETE_ASOCIADO,
  CREATE_ASOCIADO,
  GET_COLECCION_DATOS_BASICOS_ASOCIADO,
  GET_COLECCION_LIGERA_ASOCIADO_CIUDAD,
  GET_COLECCION_LIGERA_ASOCIADO_CIUDAD_OTRA,
  GET_COLECCION_LIGERA_ASOCIADO_ACTIVIDAD_ECONOMICA,
  GET_CLAUSULAS,
  GET_TIPO_ROL,
  VERIFICAR_ASOCIADO,
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
  ciudades_otra: [],
  actividades_economicas: [],
  clausulas: [],
  tipo_rol: [],
};

const asociadoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_ASOCIADO:
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

    case GET_COLECCION_LIGERA_ASOCIADO:
      return {
        ...state,
        ligera: action.payload.data,
      };
    case GET_COLECCION_LIGERA_ASOCIADO_CIUDAD:
      return {
        ...state,
        ciudades: action.payload.data,
      };
    case GET_COLECCION_LIGERA_ASOCIADO_CIUDAD_OTRA:
      return {
        ...state,
        ciudades_otra: action.payload.data,
      };
    case GET_COLECCION_LIGERA_ASOCIADO_ACTIVIDAD_ECONOMICA:
      return {
        ...state,
        actividades_economicas: action.payload.data,
      };
    case GET_CLAUSULAS:
      return {
        ...state,
        clausulas: action.payload.data,
      };
    case GET_TIPO_ROL:
      return {
        ...state,
        tipo_rol: action.payload.data,
      };
    case GET_COLECCION_DATOS_BASICOS_ASOCIADO:
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

    case SHOW_ASOCIADO:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case VERIFICAR_ASOCIADO:
      return {
        ...state,
        // selectedRow: action.payload,
      };

    case UPDATE_ASOCIADO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case DELETE_ASOCIADO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case CREATE_ASOCIADO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    default:
      return state;
  }
};
export default asociadoReducer;
