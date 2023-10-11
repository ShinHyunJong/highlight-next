export const ACCESS_TOKEN_KEY = '@highlight.discoverrealmusic.accessToken';

export const tokenStorage = {
  getAccessToken: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      return token;
    }
    return null;
  },
  setAccessToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      return token;
    }
    return null;
  },
  deleteAccessToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
    return null;
  },
};
