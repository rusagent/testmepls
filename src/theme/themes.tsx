import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import { Appearance } from 'react-native-appearance';
const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export let currentTheme = CombinedDefaultTheme;

export const setDark = () => {
  currentTheme = {
    ...CombinedDarkTheme,
    colors: { ...CombinedDarkTheme.colors, primary: '#1ba1f2' },
  };
};
export const setLight = () => {
  currentTheme = {
    ...CombinedDefaultTheme,
    colors: { ...CombinedDefaultTheme.colors, primary: '#1ba1f2' },
  };
};

export const getTheme = (mode: ThemeMode) => {
  switch (mode) {
    case ThemeMode.dark: {
      setDark();
      break;
    }
    case ThemeMode.light: {
      setLight();
      break;
    }
    case ThemeMode.system: {
      Appearance.getColorScheme() === 'dark' ? setDark() : setLight();
      return currentTheme;
    }
    case ThemeMode.current:
      return currentTheme;
  }
  return currentTheme;
};

export enum ThemeMode {
  dark = 'dark',
  light = 'light',
  system = 'system',
  current = 'current'
}
