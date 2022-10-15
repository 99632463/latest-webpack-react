import axios, { AxiosPromise } from 'axios';

const Api = {
  axios: axios.create({
    baseURL: 'xxxxx'
  })
};

// Api.axios.interceptors.request.use(
//   config => {
//     const token = true;
//     if (token) {
//       config.headers.Authorization = `xxxxx ${token}`;
//     }

//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

export const Q = <T>(axiosPromise: AxiosPromise): Promise<T> => {
  return new Promise<T>(resolve => {
    axiosPromise
      .then(response => resolve(response.data))
      .catch(error => console.log('error: ', error));
  });
};

export default Api.axios;