import type {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import axios from 'axios';

import storage from '@/storages';

export const API_ENDPOINT = 'https://api-prod.discoverrealmusic.com';
// export const API_ENDPOINT = 'http://localhost:4000';
export const api = axios.create({
  baseURL: API_ENDPOINT,
});

const refershUrl = `${API_ENDPOINT}/refresh`;

const { interceptors } = api;
const requestInterceptor: AxiosInterceptorManager<AxiosRequestConfig> =
  interceptors.request;

requestInterceptor.use(
  async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const token = storage.tokenStorage.getAccessToken();
    const accessToken = token ? JSON.parse(token) : null;
    const newConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    return accessToken ? newConfig : config;
  },
);

const responseInterceptor: AxiosInterceptorManager<AxiosResponse> =
  interceptors.response;

// responseInterceptor.use(
//   (response) => response,
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;
//     const originalRequest = config;
//     if (status === 401) {
//       const options: any = {
//         method: 'GET',
//         url: refershUrl,
//         headers: {
//           Authorization: `Bearer ${storage.tokenStorage.getRefreshToken()}`,
//         },
//       };
//       try {
//         const response = await axios(options);
//         storage.tokenStorage.setAccessToken(response.data.access_token);
//         storage.tokenStorage.setRefreshToken(response.data.refresh_token);
//         originalRequest.headers = {
//           Authorization: `Bearer ${response.data.access_token}`,
//         };
//         return await axios(originalRequest);
//       } catch (err) {
//         storage.tokenStorage.deleteAccessToken();
//         storage.tokenStorage.deleteRefreshToken();
//         // window.location.href = '/auth/signIn';
//       }
//     }
//     return Promise.reject(error);
//   },
// );
