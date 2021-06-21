import {
  GET_COLECCION_LISTA_DOCUMENTO,
  GET_COLECCION_LIGERA_LISTA_DOCUMENTO,
  SHOW_LISTA_DOCUMENTO,
  UPDATE_LISTA_DOCUMENTO,
  DELETE_LISTA_DOCUMENTO,
  CREATE_LISTA_DOCUMENTO,
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

const ListaDocumentoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_LISTA_DOCUMENTO:
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

    case GET_COLECCION_LIGERA_LISTA_DOCUMENTO:
      return {
        ...state,
        ligera: action.payload.data,
      };

    case SHOW_LISTA_DOCUMENTO:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case UPDATE_LISTA_DOCUMENTO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case DELETE_LISTA_DOCUMENTO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case CREATE_LISTA_DOCUMENTO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    default:
      return state;
  }
};
export default ListaDocumentoReducer;
