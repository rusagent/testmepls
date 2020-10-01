import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import { Provider as PaperProvider } from 'react-native-paper';
import { Main } from './src/main';
import { PreferencesContext } from './src/context/preferencesContext';
import { getTheme, ThemeMode } from './src/theme/themes';
import { AppState, I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import AsyncStorage from '@react-native-community/async-storage';


enableScreens();

export default function App() {
  let justloaded = false;
  const [themeType, setThemeType] = React.useState(ThemeMode.light);

  const [rtl] = React.useState<boolean>(I18nManager.isRTL);

  const toggleRTL = React.useCallback(() => {
    I18nManager.forceRTL(!rtl);
    RNRestart.Restart();
  }, [rtl]);

  const [curTheme, setCurTheme] = React.useState(Appearance.getColorScheme);
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(appState.current);

  React.useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if(appState.current.match(/inactive|background/)){
      setCurTheme(themeType === ThemeMode.light ? 'light' : 'dark');
      setData(themeType);
    }
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
     // console.log("App has come to the foreground!");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log("AppState", appState.current);
  };

  const setData = async (val) => {
    try {
      if (justloaded)
        return;
      else
        justloaded = false;
      AsyncStorage.setItem('@theme', val);
      console.log('set', val);
    } catch (e) {
      console.log(e);
    }
  };


  const setTheTheme = React.useCallback((type) => {
    return setThemeType(type);
  }, [themeType]);

  const preferences = React.useMemo(
    () => ({
      setTheTheme,
      toggleRTL,
      themeType,
      rtl: (rtl ? 'right' : 'left') as 'right' | 'left',
      curTheme,
    }),
    [rtl, themeType, toggleRTL, setTheTheme, curTheme],
  );

  React.useEffect(() => {
    const sub = Appearance.addChangeListener(onThemeChange);
    return () => sub.remove();
  }, [themeType]);

  const onThemeChange = ({}) => {
    if (curTheme !== Appearance.getColorScheme())
      setCurTheme(Appearance.getColorScheme());
  };

  function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
  }

  function handleLoadingError(error) {
    console.warn('error', error);
  }

  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  async function loadResourcesAsync() {
    const val = await AsyncStorage.getItem('@theme');
    console.log('loaded', val);
    justloaded = true;

    if (val) {
      setTheTheme(val);
      setCurTheme(val === ThemeMode.light ? 'light' : 'dark');
    }
  }


  function themeSwitch(param) {
    console.log('switch', param);
    return getTheme(param);
  }

  if (!isLoadingComplete) {
    return <AppLoading
      startAsync={loadResourcesAsync}
      onError={handleLoadingError}
      onFinish={() => handleFinishLoading(setLoadingComplete)}
    />;
  } else {
    return (
      <AppearanceProvider>
        <SafeAreaProvider>
          <PreferencesContext.Provider value={preferences}>
            <PaperProvider theme={{ ...themeSwitch(themeType) }}>
              <Main />
            </PaperProvider>
          </PreferencesContext.Provider>
        </SafeAreaProvider>
      </AppearanceProvider>
    );
  }
}
