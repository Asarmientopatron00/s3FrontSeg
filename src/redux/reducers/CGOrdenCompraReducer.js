import {
  GET_COLECCION_CONSULTA_ORDEN_COMPRA,
  GET_DATOS_CONSULTA_ORDEN_COMPRA,
  SHOW_PEDIDO,
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

const CGOrdenCompraReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_CONSULTA_ORDEN_COMPRA:
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

    case GET_DATOS_CONSULTA_ORDEN_COMPRA:
      return {
        ...state,
        ligera: action.payload.data,
      };

    case SHOW_PEDIDO:
      return {
        ...state,
        selectedRow: action.payload,
      };

    default:
      return state;
  }
};
export default CGOrdenCompraReducer;
