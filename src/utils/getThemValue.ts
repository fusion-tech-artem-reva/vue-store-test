export type ThemeValuesType = {
  dark: string;
  light: string;
  green: string;
  'dark-blue': string;
  'dark-green': string;
  'light-grey': string;
  'dark-grey': string;
  'white': string;
  'error': string;
  'success': string;
}

type ThemePossibleValues = keyof ThemeValuesType;

export const getThemeValue = (value?: ThemePossibleValues) => {
  if (!value) return '';
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${value}`);
}