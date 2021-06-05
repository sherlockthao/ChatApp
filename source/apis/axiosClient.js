// import {API_URL} from '@env';
import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: 'http://it4895.herokuapp.com/it4895',
  // headers: {
  //   'content-type': 'application/json',
  // },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle error
    throw error;
  },
);

export default axiosClient;
