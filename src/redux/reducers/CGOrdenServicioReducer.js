import {
  GET_COLECCION_CONSULTA_ORDEN_SERVICIO,
  GET_DATOS_CONSULTA_ORDEN_SERVICIO,
  GET_PROMEDIOS_CONSULTA_ORDEN_SERVICIO,
} from '../../shared/constants/ActionTypes';

const initialState = {
  rows: [],
  ligera: [],
  promedios: [],
  selectedRow: null,
  desde: 1,
  hasta: 1,
  por_pagina: 1,
  pagina_actual: 1,
  ultima_pagina: 1,
  total: 1,
};

const CGOrdenServicioReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_CONSULTA_ORDEN_SERVICIO:
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

    case GET_DATOS_CONSULTA_ORDEN_SERVICIO:
      return {
        ...state,
        ligera: action.payload.data,
      };

    case GET_PROMEDIOS_CONSULTA_ORDEN_SERVICIO:
      return {
        ...state,
        promedios: action.payload.data,
      };

    default:
      return state;
  }
};
export default CGOrdenServicioReducer;
