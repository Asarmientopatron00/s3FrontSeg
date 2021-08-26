import {
  FETCH_START,
  FETCH_SUCCESS,
  SET_AUTH_TOKEN,
  SIGNOUT_AUTH_SUCCESS,
  UPDATE_AUTH_USER,
  FETCH_ERROR,
} from '../../shared/constants/ActionTypes';
import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';
import {fetchError, fetchStart, fetchSuccess} from './Common';
import {AuthType} from '../../shared/constants/AppEnums';
import {defaultUser} from '../../shared/constants/AppConst';

export const onJwtUserSignUp = ({email, password, name}) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const body = {email, name, password};
    try {
      const res = await jwtAxios.post('users', body);
      localStorage.setItem('token', res.data.token);
      dispatch(setJWTToken(res.data.token));
      dispatch(loadJWTUser());
    } catch (err) {
      console.log('error!!!!', err.response.data);
      // dispatch(fetchError(err.response.data.error));
      dispatch({
        type: FETCH_ERROR,
        payload: err.response.data.mensajes[0],
      });
    }
  };
};

export const onJwtSignIn = ({username, password}) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const body = {username, password};
    try {
      const res = await jwtAxios.post('/users/token', body);
      localStorage.setItem('token', res.data.token);
      dispatch(setJWTToken(res.data.access_token));
      dispatch(loadJWTUser());
    } catch (err) {
      // dispatch(fetchError(err.response.data.error));
      dispatch({
        type: FETCH_ERROR,
        payload: 'Error de conexión con el servidor',
      });
    }
  };
};

export const loadJWTUser = () => {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const res = await jwtAxios.get('/users/current/session');
      dispatch(fetchSuccess());
      console.log('res.data', res.data);
      dispatch({
        type: UPDATE_AUTH_USER,
        payload: {
          id: res.data.usuario.id,
          authType: AuthType.JWT_AUTH,
          displayName: res.data.usuario.nombre,
          identificacion_usuario: res.data.usuario.identificacion_usuario,
          email: res.data.usuario.email,
          telefono: res.data.usuario.telefono,
          asociado: {
            id: res.data.usuario.asociado.id,
            nombre: res.data.usuario.asociado.nombre,
            numero_documento: res.data.usuario.asociado.numero_documento,
          },
          rol: {
            id: res.data.usuario.rol.id,
            nombre: res.data.usuario.rol.nombre,
            tipo: res.data.usuario.rol.tipo,
          },
          role: defaultUser.role,
          token: res.data._id,
          permisos: res.data.usuario.permisos,
        },
      });
    } catch (err) {
      console.log('error!!!!', err);
      dispatch(fetchError(err.response.error));
    }
  };
};

export const setJWTToken = (token) => {
  return async (dispatch) => {
    dispatch({
      type: SET_AUTH_TOKEN,
      payload: token,
    });
  };
};

export const onJWTAuthSignout = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    setTimeout(() => {
      dispatch({type: SIGNOUT_AUTH_SUCCESS});
      dispatch({type: FETCH_SUCCESS});
      localStorage.removeItem('token');
    }, 500);
  };
};
