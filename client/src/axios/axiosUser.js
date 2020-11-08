import axios from 'axios';
import axiosAuth from './axiosAuth';

const axiosUser = axios.create({
  baseURL: '/api/restaurant-reviewy/user',
});

//TODO: NEED TO CHANGE THIS FOR ALL INSTANCES THAT NEED TO BE AUTHENTICATED
axiosUser.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const response = await axiosAuth.get('/refresh-token');

      if (response.status === 200) {
        sessionStorage.setItem('token', response.data.accessToken);
        error.config.headers['Authorization'] =
          'Bearer ' + sessionStorage.getItem('token');
        error.config.baseURL = '/api/restaurant-reviewy/user';
        return axiosUser.request(error.config);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosUser;
