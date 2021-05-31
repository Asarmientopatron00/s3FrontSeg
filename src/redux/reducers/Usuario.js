import {
    GET_COLECCION,
    SHOW,
    UPDATE,
    DELETE,
    CREATE,
  } from '../../shared/constants/ActionTypes';
  
  const initialState = {
    rows: [],
    selectedRow: null,
    desde:1,
    hasta:1,
    por_pagina:1,
    pagina_actual:1,
    ultima_pagina:1,
    total:1,
  };
  
  const usuarioReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COLECCION:
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

      case SHOW:
        return {
          ...state,
          selectedRow: action.payload,
        };

      case UPDATE:
        return {
          ...state,
          selectedRow: action.payload,
        };

      case DELETE:
        return {
          ...state,
          selectedRow: action.payload,
        };

      case CREATE:
        return {
          ...state,
          selectedRow: action.payload,
        };
    
      default:
        return state;
    }
  };
  export default usuarioReducer;
  