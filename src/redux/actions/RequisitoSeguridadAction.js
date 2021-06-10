import {
  GET_COLECCION_REQUISITO_SEGURIDAD,
  GET_COLECCION_LIGERA_REQUISITO_SEGURIDAD,
  SHOW_REQUISITO_SEGURIDAD,
  UPDATE_REQUISITO_SEGURIDAD,
  DELETE_REQUISITO_SEGURIDAD,
  CREATE_REQUISITO_SEGURIDAD,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import Api from '../../@crema/services/ApiConfig';
import {appIntl} from '../../@crema/utility/Utils';

export const onGetColeccion = (currentPage,rowsPerPage,nombre,orderByToSend,tipo) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const nombreAux = nombre ? nombre : "";
  const tipoAux = tipo ? tipo : "";
  const ordenar_por = orderByToSend ? orderByToSend : "";
  
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('http://solicitudesservicio.test/api/requisitos-de-seguridad', {
      params: {
        page: page,
        limite:rowsPerPage,
        nombre:nombreAux,
        tipo:tipoAux,
        ordenar_por:ordenar_por,
      },
    })
    .then((data) => {
      if (data.status === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_COLECCION_REQUISITO_SEGURIDAD, payload: data});
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
    Api.get('http://solicitudesservicio.test/api/requisitos-de-seguridad', {
      params: {
        ligera: true,
      },
    })
    .then((data) => {
      if (data.status === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_COLECCION_LIGERA_REQUISITO_SEGURIDAD, payload: data});
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
      Api.get('http://solicitudesservicio.test/api/requisitos-de-seguridad/'+id)
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({type: SHOW_REQUISITO_SEGURIDAD, payload: data.data});
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

export const onUpdate = (params) => {
  return (dispatch) =>  {
    dispatch({type: FETCH_START});
    Api.put('http://solicitudesservicio.test/api/requisitos-de-seguridad/' + params.id, params)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_REQUISITO_SEGURIDAD,
            payload: data.data,
          });
          
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
    Api.delete('http://solicitudesservicio.test/api/requisitos-de-seguridad/'+id)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: DELETE_REQUISITO_SEGURIDAD, payload: data.data});
        } else {
          dispatch({type: FETCH_ERROR, payload:data.data.mensajes[0]});
        }
      })
      .catch((error) => {
        if (error.response.data.mensajes){
          dispatch({type: FETCH_ERROR, payload:error.response.data.mensajes[0]});
        } else {
          dispatch({type: FETCH_ERROR, payload:error.message});
        }
      });
  };
};

export const onCreate = (params) => {
  // const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.post('http://solicitudesservicio.test/api/requisitos-de-seguridad',params)
      .then((data) => {
        if (data.status === 201) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: CREATE_REQUISITO_SEGURIDAD,
            payload: data.data,
          });
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

