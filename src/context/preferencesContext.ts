import React from 'react';
import {ThemeMode} from "../theme/themes";
import { Appearance, ColorSchemeName } from "react-native-appearance";

type PreferencesContextType = {
  themeType: ThemeMode;
  curTheme: ColorSchemeName;
  rtl: 'left' | 'right';
  setTheTheme: (type: any) => void;
  toggleRTL: () => void;
};

export const PreferencesContext = React.createContext<PreferencesContextType>({
  rtl: 'left',
  themeType: ThemeMode.light,
  curTheme: Appearance.getColorScheme(),
  setTheTheme: () => {},
  toggleRTL: () => {},
});
