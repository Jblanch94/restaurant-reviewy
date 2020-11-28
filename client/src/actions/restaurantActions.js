import types from './types';
import axiosRestaurant from '../axios/axiosRestaurant';

export const getAllRestaurants = () => {
  return async (dispatch) => {
    try {
      const response = await axiosRestaurant.get('/all-restaurants');
      dispatch({
        type: types.FETCH_RESTAURANTS,
        payload: response.data,
      });
    } catch (err) {
      console.error(err.message);
      // dispatch({ type: types.ERROR, payload: err.response });
    }
  };
};

export const addRestaurant = (formValues, history) => {
  return async () => {
    try {
      await axiosRestaurant.post('/', formValues, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      });
      history.push('/admin/dashboard');
    } catch (err) {
      console.error(err.message);
    }
  };
};
