import types from 'actions/types';
import axiosAuth from 'axios/axiosAuth';
import axiosUser from 'axios/axiosUser';
import axiosRestaurant from 'axios/axiosRestaurant';
import axiosReview from 'axios/axiosReview';

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

export const fetchUser = () => {
  return async (dispatch) => {
    try {
      console.log('fetching user');
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

export const logout = () => {
  sessionStorage.removeItem('token');
  return { type: types.LOGOUT };
};

export const getAllRestaurants = () => {
  return async (dispatch) => {
    try {
      const response = await axiosRestaurant.get('/all-restaurants');
      dispatch({
        type: types.FETCH_RESTAURANTS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: types.ERROR, payload: err.response });
    }
  };
};

export const fetchRestaurantReviews = (id) => {
  return async (dispatch) => {
    try {
      const response = await axiosReview.get(`/restaurant/${id}`);
      dispatch({
        type: types.FETCH_RESTAURANT_REVIEWS,
        payload: response.data,
      });
    } catch (err) {
      console.error(err.message);
    }
  };
};

export const submitReview = (formValues, id, history) => {
  return async (dispatch) => {
    try {
      const response = await axiosReview.post(`/restaurant/${id}`, formValues, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      });
      dispatch({
        type: types.SUBMIT_REVIEW,
        payload: response.data,
      });
      history.push('/user/dashboard');
    } catch (err) {
      console.error(err.message);
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
