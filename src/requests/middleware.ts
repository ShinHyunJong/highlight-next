import type { AxiosInterceptorManager, AxiosRequestConfig } from 'axios';

import { api } from '.';

export const insertToken = async (token: string) => {
  const { interceptors } = api;
  const requestInterceptor: AxiosInterceptorManager<AxiosRequestConfig> =
    interceptors.request;

  requestInterceptor.use(async (config: AxiosRequestConfig) => {
    const newConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return token ? newConfig : config;
  });
};
