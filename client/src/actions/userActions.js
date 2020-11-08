import types from './types';
import axiosUser from 'axios/axiosUser';

export const fetchUser = () => {
  return async (dispatch) => {
    try {
      const token = sessionStorage.getItem('token');
      let response;

      response = await axiosUser.get('/', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch({
        type: types.FETCH_USER,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: types.ERROR, payload: err.response });
    }
  };
};

export const updateUser = (formValues) => {
  return async (dispatch) => {
    try {
      const token = sessionStorage.getItem('token');
      await axiosUser.patch('/', formValues, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch({ type: types.UPDATE_USER });
    } catch (err) {
      dispatch({ type: types.ERROR, payload: err.response });
    }
  };
};