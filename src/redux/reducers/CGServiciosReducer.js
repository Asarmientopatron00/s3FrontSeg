import {
  GET_COLECCION_CONSULTA_SERVICIO_MODALIDAD,
  GET_DATOS_CONSULTA_SERVICIO_MODALIDAD,
  GET_COLECCION_CONSULTA_SERVICIO_RUTA,
  GET_DATOS_CONSULTA_SERVICIO_RUTA,
  GET_COLECCION_CONSULTA_SERVICIO_CLIENTE,
  GET_DATOS_CONSULTA_SERVICIO_CLIENTE,
  GET_COLECCION_CIUDADES_ORIGEN,
  GET_COLECCION_CIUDADES_DESTINO,
  GET_COLECCION_ASOCIADOS,
} from '../../shared/constants/ActionTypes';

const initialState = {
  rows: [],
  ligera: [],
  ciudadesOr: [],
  ciudadesDes: [],
  asociados: [],
  selectedRow: null,
  desde: 1,
  hasta: 1,
  por_pagina: 1,
  pagina_actual: 1,
  ultima_pagina: 1,
  total: 1,
};

const CGServiciosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_CONSULTA_SERVICIO_MODALIDAD:
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

    case GET_DATOS_CONSULTA_SERVICIO_MODALIDAD:
      return {
        ...state,
        ligera: action.payload.data,
      };

    case GET_COLECCION_CONSULTA_SERVICIO_RUTA:
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

    case GET_DATOS_CONSULTA_SERVICIO_RUTA:
      return {
        ...state,
        ligera: action.payload.data,
      };

    case GET_COLECCION_CONSULTA_SERVICIO_CLIENTE:
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

    case GET_DATOS_CONSULTA_SERVICIO_CLIENTE:
      return {
        ...state,
        ligera: action.payload.data,
      };

    case GET_COLECCION_CIUDADES_ORIGEN:
      return {
        ...state,
        ciudadesOr: action.payload.data,
      };

    case GET_COLECCION_CIUDADES_DESTINO:
      return {
        ...state,
        ciudadesDes: action.payload.data,
      };

    case GET_COLECCION_ASOCIADOS:
      return {
        ...state,
        asociados: action.payload.data,
      };

    default:
      return state;
  }
};
export default CGServiciosReducer;
