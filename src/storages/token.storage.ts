import localforage from 'localforage';

export const ACCESS_TOKEN_KEY = '@hmt.highlight.accessToken';
export const REFRESH_TOKEN_KEY = '@hmt.highlight.refreshToken';
export const ON_BOARDED = '@hmt.highlight.onBoarded';

export const tokenStorage = {
  getAccessToken: () => {
    const token = localforage.getItem(ACCESS_TOKEN_KEY);
    return token;
  },
  getRefreshToken: () => {
    const token = localforage.getItem(REFRESH_TOKEN_KEY);
    return token;
  },
  getOnboarded: async () => {
    const token = await localforage.getItem(ON_BOARDED);
    return token;
  },
  setAccessToken: (token: string) => {
    localforage.setItem(ACCESS_TOKEN_KEY, token);
  },
  setOnboarded: (b: boolean) => {
    localforage.setItem(ON_BOARDED, b);
  },
  setRefreshToken: (token: string) => {
    localforage.setItem(REFRESH_TOKEN_KEY, token);
  },
  deleteAccessToken: () => {
    localforage.removeItem(ACCESS_TOKEN_KEY);
  },
  deleteRefreshToken: () => {
    localforage.removeItem(REFRESH_TOKEN_KEY);
  },
};
