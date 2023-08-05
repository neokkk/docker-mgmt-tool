import axios, { CreateAxiosDefaults } from 'axios';
import { getCookie } from './cookie';

const createHttpClient = (config?: CreateAxiosDefaults) => {
  const csrftoken = getCookie('csrftoken');
  const axiosInstance = axios.create({
    headers: {
      'X-CSRFToken': csrftoken,
    },
    withCredentials: true,
    ...config,
  });
  return axiosInstance;
};

export const httpClient = createHttpClient();
