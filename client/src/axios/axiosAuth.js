import axios from 'axios';

const axiosAuth = axios.create({ baseURL: '/api/auth' });

axiosAuth.interceptors.response.use(
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
        error.config.baseURL = '/api/restaurant-reviewy/auth';
        return axiosAuth.request(error.config);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosAuth;
