import {
    // GET_COLECCION,
    GET_COLECCION_LIGERA,
    // SHOW,
    // UPDATE,
    // DELETE,
    // CREATE,
    // FETCH_ERROR,
    // FETCH_START,
    // FETCH_SUCCESS,
    // SHOW_MESSAGE,
  } from '../../shared/constants/ActionTypes';
  
  const initialState = {
    rows: [],
    selectedRow: null,
    ligera: [],
  };
  
  const rolReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COLECCION_LIGERA:
        return {
          ...state,
          ligera: action.payload.data,
        };

      default:
        return state;
    }
  };
  export default rolReducer;
  