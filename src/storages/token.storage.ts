import localforage from 'localforage';

export const ACCESS_TOKEN_KEY = '@hmt.highlight.accessToken';
export const REFRESH_TOKEN_KEY = '@hmt.highlight.refreshToken';
export const ON_BOARDED = '@hmt.highlight.onBoarded';
export const HAS_LOGOUT = '@hmt.highlight.hasLogout';

export const tokenStorage = {
  getAccessToken: async (): Promise<string | null> => {
    const token: string | null = await localforage.getItem(ACCESS_TOKEN_KEY);
    return token;
  },
  getRefreshToken: async () => {
    const token = await localforage.getItem(REFRESH_TOKEN_KEY);
    return token;
  },
  getOnboarded: async () => {
    const token = await localforage.getItem(ON_BOARDED);
    return token;
  },
  getHasLogout: async (): Promise<boolean | null> => {
    const token: boolean | null = await localforage.getItem(HAS_LOGOUT);
    return token;
  },
  setAccessToken: async (token: string) => {
    await localforage.setItem(ACCESS_TOKEN_KEY, token);
  },
  setOnboarded: async (b: boolean) => {
    await localforage.setItem(ON_BOARDED, b);
  },
  setRefreshToken: async (token: string) => {
    await localforage.setItem(REFRESH_TOKEN_KEY, token);
  },
  setHasLogout: async (b: boolean) => {
    await localforage.setItem(HAS_LOGOUT, b);
  },
  deleteAccessToken: async () => {
    await localforage.removeItem(ACCESS_TOKEN_KEY);
  },
  deleteRefreshToken: async () => {
    await localforage.removeItem(REFRESH_TOKEN_KEY);
  },
};
