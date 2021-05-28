import {
    GET_COLECCION,
    GET_COLECCION_LIGERA,
    SHOW,
    // UPDATE,
    // DELETE,
    // CREATE,
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    // SHOW_MESSAGE,
  } from '../../shared/constants/ActionTypes';
  import Api from '../../@crema/services/ApiConfig';
  import {appIntl} from '../../@crema/utility/Utils';
  
  export const onGetColeccion = (currentPage) => {
    const {messages} = appIntl();
    const page = currentPage ? currentPage : 0;
    return (dispatch) => {
      dispatch({type: FETCH_START});
      Api.get('http://solicitudesservicio.test/api/roles', {
        params: {
          page: page,
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
      Api.get('http://solicitudesservicio.test/api/roles', {
        params: {
          ligera: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_COLECCION_LIGERA, payload: data});
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
      Api.get('http://solicitudesservicio.test/api/roles/'+id)
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
  
  // export const onUpdate = (contact) => {
  //   const {messages} = appIntl();
  //   return (dispatch) => {
  //     dispatch({type: FETCH_START});
  //     Api.put('/api/contactApp/update/label', {contactIds, type})
  //       .then((data) => {
  //         if (data.status === 200) {
  //           dispatch({type: FETCH_SUCCESS});
  //           dispatch({
  //             type: UPDATE_CONTACT_LABEL,
  //             payload: {data: data.data, labelName: labelName, labelType: type},
  //           });
  //           dispatch({
  //             type: SHOW_MESSAGE,
  //             payload: messages['message.labelUpdated'],
  //           });
  //         } else {
  //           dispatch({
  //             type: FETCH_ERROR,
  //             payload: messages['message.somethingWentWrong'],
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         dispatch({type: FETCH_ERROR, payload: error.message});
  //       });
  //   };
  // };
  
  // export const onDelete = (type, name, contactIds, page) => {
  //   const {messages} = appIntl();
  //   return (dispatch) => {
  //     dispatch({type: FETCH_START});
  //     Api.post('/api/contactApp/delete/contact', {type, name, contactIds, page})
  //       .then((data) => {
  //         if (data.status === 200) {
  //           dispatch({type: FETCH_SUCCESS});
  //           dispatch({type: DELETE_CONTACT, payload: data.data});
  //           dispatch({
  //             type: SHOW_MESSAGE,
  //             payload: messages['message.contactDeleted'],
  //           });
  //         } else {
  //           dispatch({
  //             type: FETCH_ERROR,
  //             payload: messages['message.somethingWentWrong'],
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         dispatch({type: FETCH_ERROR, payload: error.message});
  //       });
  //   };
  // };
  
  // export const onCreate = (contact) => {
  //   const {messages} = appIntl();
  //   return (dispatch) => {
  //     dispatch({type: FETCH_START});
  //     Api.post('/api/contactApp/compose', {contact})
  //       .then((data) => {
  //         if (data.status === 200) {
  //           dispatch({type: FETCH_SUCCESS});
  //           dispatch({type: CREATE_NEW_CONTACT, payload: data.data});
  //           dispatch({
  //             type: SHOW_MESSAGE,
  //             payload: messages['message.contactCreated'],
  //           });
  //         } else {
  //           dispatch({
  //             type: FETCH_ERROR,
  //             payload: messages['message.somethingWentWrong'],
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         dispatch({type: FETCH_ERROR, payload: error.message});
  //       });
  //   };
  // };
  