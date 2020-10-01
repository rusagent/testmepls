import React from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, Switch, Text, TouchableRipple } from "react-native-paper";
import { PreferencesContext } from "./context/preferencesContext";
import { getTheme, ThemeMode } from "./theme/themes";

export const Preferences = () => {
  const { rtl, themeType, toggleRTL, setTheTheme } = React.useContext(
    PreferencesContext
  );

  const theme = getTheme(themeType);
  return (
    <View style={{ backgroundColor: theme.colors.surface, height: '100%' }}>
      <View>
        <Text>Light</Text>
        <RadioButton
          value={ThemeMode.light}
          status={ themeType === ThemeMode.light ? 'checked' : 'unchecked'}
          onPress={() => setTheTheme(ThemeMode.light)}
        />
      </View>
      <View>
        <Text>Dark</Text>
        <RadioButton
          value={ThemeMode.dark}
          status={themeType === ThemeMode.dark ? 'checked' : 'unchecked'}
          onPress={() => setTheTheme(ThemeMode.dark)}
        />
      </View>
      <View>
        <Text>System</Text>
        <RadioButton
          value={ThemeMode.system}
          status={themeType === ThemeMode.system ? 'checked' : 'unchecked'}
          onPress={() => setTheTheme(ThemeMode.system)}
        />
      </View>
      <TouchableRipple onPress={toggleRTL}>
        <View style={styles.preference}>
          <Text>RTL</Text>
          <View pointerEvents="none">
            <Switch value={rtl === 'right'} />
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
