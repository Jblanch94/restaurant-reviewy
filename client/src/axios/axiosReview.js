import axios from 'axios';
import axiosAuth from './axiosAuth';

const axiosReview = axios.create({
  baseURL: '/api/reviews',
});

axiosReview.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    if (error.response.status === 401) {
      const response = await axiosAuth.get('/refresh-token');

      if (response.status === 200) {
        sessionStorage.setItem('token', response.data.accessToken);
        error.config.header['Authorization'] =
          'Bearer ' + sessionStorage.getItem('token');
        error.config.baseURL = '/api/restaurant-reviewy/reviews';
        return axiosReview.request(error.config);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosReview;
