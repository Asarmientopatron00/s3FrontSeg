import {CLOSE, NO_CLOSE} from '../../shared/constants/ActionTypes';

const initialState = {
  close: false,
};

const closeFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE: {
      return {
        ...state,
        close: true,
      };
    }
    case NO_CLOSE: {
      return {
        ...state,
        close: false,
      };
    }

    default:
      return state;
  }
};

export default closeFormReducer;
