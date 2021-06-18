import {
  GET_COLECCION_CIUDAD,
  GET_COLECCION_LIGERA_CIUDAD,
  SHOW_CIUDAD,
  UPDATE_CIUDAD,
  DELETE_CIUDAD,
  CREATE_CIUDAD,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import Api from '../../@crema/services/ApiConfig';
import {appIntl} from '../../@crema/utility/Utils';

export const onGetColeccion = (currentPage,rowsPerPage,nombre,orderByToSend,departamento) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const nombreAux = nombre ? nombre : "";
  const departamentoAux = departamento ? departamento : "";
  const ordenar_por = orderByToSend ? orderByToSend : "";
  
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('http://solicitudesservicio.test/api/ciudades', {
      params: {
        page: page,
        limite:rowsPerPage,
        nombre:nombreAux,
        departamento:departamentoAux,
        ordenar_por:ordenar_por,
      },
    })
    .then((data) => {
      if (data.status === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_COLECCION_CIUDAD, payload: data});
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

export const onGetColeccionLigera = (depto) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('http://solicitudesservicio.test/api/ciudades', {
      params: {
        ligera: true,
        departamento_id: depto,
      },
    })
    .then((data) => {
      if (data.status === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_COLECCION_LIGERA_CIUDAD, payload: data});
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
    if(id!==0){
      dispatch({type: FETCH_START});
      Api.get('http://solicitudesservicio.test/api/ciudades/'+id)
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({type: SHOW_CIUDAD, payload: data.data});
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

export const onUpdate = (params,handleOnClose,updateColeccion) => {
  return (dispatch) =>  {
    dispatch({type: FETCH_START});
    Api.put('http://solicitudesservicio.test/api/ciudades/' + params.id, params)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_CIUDAD,
            payload: data.data,
          });
          updateColeccion();
          handleOnClose();
          dispatch({
            type: SHOW_MESSAGE,
            payload:data.data.mensajes[0],
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: data.data.mensajes[0],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload:error.response.data.mensajes[0]});
      });
  };
};

export const onDelete = (id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.delete('http://solicitudesservicio.test/api/ciudades/'+id)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: DELETE_CIUDAD, payload: data.data});
        } else {
          dispatch({type: FETCH_ERROR, payload:data.data.mensajes[0]});
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data.mensajes){
          dispatch({type: FETCH_ERROR, payload:error.response.data.mensajes[0]});
        } else {
          dispatch({type: FETCH_ERROR, payload:error.message});
        }
      });
  };
};

export const onCreate = (params,handleOnClose,updateColeccion) => {
  // const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.post('http://solicitudesservicio.test/api/ciudades',params)
      .then((data) => {
        console.log(data);
        if (data.status === 201) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: CREATE_CIUDAD,
            payload: data.data,
          });
          updateColeccion();
          handleOnClose();
          dispatch({
            type: SHOW_MESSAGE,
            payload:data.data.mensajes[0],
          });
        } else {

          dispatch({type: FETCH_ERROR, payload:data.data.mensajes[0]});
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload:error.response.data.mensajes[0]});
      });
  };
};

