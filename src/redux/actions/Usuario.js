import {
  GET_COLECCION,
  GET_COLECCION_LIGERA,
  SHOW,
  UPDATE,
  DELETE,
  CREATE,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import Api from '../../@crema/services/ApiConfig';
import {appIntl} from '../../@crema/utility/Utils';

export const onGetColeccion = (currentPage,rowsPerPage,nombre,orderByToSend) => {
  console.log(orderByToSend)
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const nombreAux = nombre ? nombre : "";
  const ordenar_por = orderByToSend ? orderByToSend : "";
  
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('http://solicitudesservicio.test/api/usuarios', {
      params: {
        page: page,
        limite:rowsPerPage,
        nombre:nombreAux,
        ordenar_por:ordenar_por,
      },
    })
    .then((data) => {
      if (data.status === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_COLECCION, payload: data});
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
      }
    })
    .catch((error) => {
      dispatch({type: FETCH_ERROR, payload: error.message});
    });
  };
};

export const onGetColeccionLigera = () => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/api/contactApp/labels/list')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_COLECCION_LIGERA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onShow = (id) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('http://solicitudesservicio.test/api/usuarios/'+id)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SHOW, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onUpdate = (params) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.put('http://solicitudesservicio.test/api/usuarios/' + params.id, params)
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE,
            payload: data.data,
          });
          dispatch({
            type: SHOW_MESSAGE,
            payload: messages['message.labelUpdated'],
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onDelete = (id) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.delete('http://solicitudesservicio.test/api/usuarios/'+id)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: DELETE, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onCreate = (params) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.post('http://solicitudesservicio.test/api/usuarios/crear',params)
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          alert(1);
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: CREATE,
            payload: data.data,
          });
          dispatch({
            type: SHOW_MESSAGE,
            payload: messages['message.labelUpdated'],
          });
        } else {
          alert(1);
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

