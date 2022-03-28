import axios from 'axios';
import defaultConfig from '@crema/utility/ContextProvider/defaultConfig';

const jwtAxios = axios.create({
  // baseURL: 'http://solicitudesservicio.test/api/', //YOUR_API_URL HERE
  baseURL: defaultConfig.API_URL + '/api', //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});
jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  },
);

export const jwtAxios2 = axios.create({
  // baseURL: 'http://solicitudesservicio.test/api/', //YOUR_API_URL HERE
  baseURL: defaultConfig.API_URL2 + '/api', //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});

jwtAxios2.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  },
);

export const setAuthToken = (token) => {
  if (token) {
    jwtAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    jwtAxios2.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    localStorage.setItem('token', token);
  } else {
    delete jwtAxios.defaults.headers.common['Authorization'];
    delete jwtAxios2.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export default jwtAxios;
