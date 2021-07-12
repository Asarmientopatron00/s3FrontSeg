import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';

import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_GALLERY_PHOTO,
} from '../../shared/constants/ActionTypes';
import IntlMessages from '../../@crema/utility/IntlMessages';
import React from 'react';

export const onGetGalleryPhotos = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/gallery/photos')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_GALLERY_PHOTO, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
