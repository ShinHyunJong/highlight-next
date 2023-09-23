const THEME_KEY = '@appTheme';

export const themeStorage = {
  removeTheme: () => {
    localStorage.removeItem(THEME_KEY);
  },
};
