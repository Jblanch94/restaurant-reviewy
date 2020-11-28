import types from './types';
import axiosReview from '../axios/axiosReview';

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
      history.push('/');
    } catch (err) {
      console.error(err.message);
    }
  };
};
