import {
  GET_COLECCION_DEPARTAMENTO,
  GET_COLECCION_LIGERA_DEPARTAMENTO,
  SHOW_DEPARTAMENTO,
  UPDATE_DEPARTAMENTO,
  DELETE_DEPARTAMENTO,
  CREATE_DEPARTAMENTO,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import Api from '../../@crema/services/ApiConfig';
import {appIntl} from '../../@crema/utility/Utils';

export const onGetColeccion = (
  currentPage,
  rowsPerPage,
  nombre,
  orderByToSend,
  pais,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const nombreAux = nombre ? nombre : '';
  const paisAux = pais ? pais : '';
  const ordenar_por = orderByToSend ? orderByToSend : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('http://solicitudesservicio.test/api/departamentos', {
      params: {
        page: page,
        limite: rowsPerPage,
        nombre: nombreAux,
        pais: paisAux,
        ordenar_por: ordenar_por,
      },
    })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_COLECCION_DEPARTAMENTO, payload: data});
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
    Api.get('http://solicitudesservicio.test/api/departamentos', {
      params: {
        ligera: true,
      },
    })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_COLECCION_LIGERA_DEPARTAMENTO, payload: data});
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
    if (id !== 0) {
      dispatch({type: FETCH_START});
      Api.get('http://solicitudesservicio.test/api/departamentos/' + id)
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({type: SHOW_DEPARTAMENTO, payload: data.data});
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
    }
  };
};

export const onUpdate = (params, handleOnClose, updateColeccion) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.put(
      'http://solicitudesservicio.test/api/departamentos/' + params.id,
      params,
    )
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_DEPARTAMENTO,
            payload: data.data,
          });
          updateColeccion();
          handleOnClose();
          dispatch({
            type: SHOW_MESSAGE,
            payload: data.data.mensajes[0],
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: data.data.mensajes[0],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.response.data.mensajes[0]});
      });
  };
};

export const onDelete = (id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.delete('http://solicitudesservicio.test/api/departamentos/' + id)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: DELETE_DEPARTAMENTO, payload: data.data});
        } else {
          dispatch({type: FETCH_ERROR, payload: data.data.mensajes[0]});
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data.mensajes) {
          dispatch({
            type: FETCH_ERROR,
            payload: error.response.data.mensajes[0],
          });
        } else {
          dispatch({type: FETCH_ERROR, payload: error.message});
        }
      });
  };
};

export const onCreate = (params, handleOnClose, updateColeccion) => {
  // const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.post('http://solicitudesservicio.test/api/departamentos', params)
      .then((data) => {
        console.log(data);
        if (data.status === 201) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: CREATE_DEPARTAMENTO,
            payload: data.data,
          });
          updateColeccion();
          handleOnClose();
          dispatch({
            type: SHOW_MESSAGE,
            payload: data.data.mensajes[0],
          });
        } else {
          dispatch({type: FETCH_ERROR, payload: data.data.mensajes[0]});
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.response.data.mensajes[0]});
      });
  };
};
