import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './stack';
import {DrawerContent} from './drawerContent';
import {getTheme} from "./theme/themes";
import {PreferencesContext} from "./context/preferencesContext";
import {PrefNavigator} from "./PrefStack";
import {LedNavigator} from "./LedStack";
import { LicNavigator } from "./licstack";

const Drawer = createDrawerNavigator();

export const RootNavigator = () => {
    const {  themeType } = React.useContext(
        PreferencesContext
    );
    const theme = getTheme(themeType);

  return (
    <NavigationContainer theme={{...theme}}>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={StackNavigator} />
        <Drawer.Screen name="Preferences" component={PrefNavigator} />
        <Drawer.Screen name="LedList" component={LedNavigator} />
        <Drawer.Screen name="Licenses" component={LicNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
