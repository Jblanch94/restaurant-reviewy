import types from './types';
import axiosAuth from 'axios/axiosAuth';

export const registerUser = (formValues, history) => {
  return async (dispatch) => {
    try {
      const response = await axiosAuth.post('/register', formValues);
      sessionStorage.setItem('token', response.data.token);
      dispatch({
        type: types.REGISTER_USER,
        payload: response.data,
      });
      history.push('/user/dashboard');
    } catch (err) {
      console.error(err.message);
    }
  };
};

export const loginUser = (formValues, history) => {
  return async (dispatch) => {
    let response;
    try {
      response = await axiosAuth.post('/login', formValues);
      sessionStorage.setItem('token', response.data.token);
      dispatch({
        type: types.LOGIN_USER,
        payload: response.data,
      });
      history.push('/user/dashboard');

      //if there is error
    } catch (err) {
      console.error(err.message);
      dispatch({
        type: types.ERROR,
        payload: err.response.statusText,
      });
    }
  };
};

export const logout = () => {
  sessionStorage.removeItem('token');
  return { type: types.LOGOUT };
};

export const isAuthenticated = () => {
  return async (dispatch) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axiosAuth.get('/is-authenticated', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      dispatch({
        type: types.IS_AUTHENTICATED,
        payload: response.data.authenticated,
      });
    } catch (err) {
      console.error(err.message);
    }
  };
};
