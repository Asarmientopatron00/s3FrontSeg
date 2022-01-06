import {
  GET_COLECCION_FACTURAR_CLIENTE_TERMINADO,
  GET_COLECCION_LIGERA_FACTURAR_CLIENTE_TERMINADO,
  SHOW_FACTURAR_CLIENTE_TERMINADO,
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

const ODSTFacturarClienteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_FACTURAR_CLIENTE_TERMINADO:
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

    case GET_COLECCION_LIGERA_FACTURAR_CLIENTE_TERMINADO:
      return {
        ...state,
        ligera: action.payload.data,
      };

    case SHOW_FACTURAR_CLIENTE_TERMINADO:
      return {
        ...state,
        selectedRow: action.payload,
      };

    default:
      return state;
  }
};
export default ODSTFacturarClienteReducer;
