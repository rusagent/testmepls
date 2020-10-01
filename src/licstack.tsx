import {createStackNavigator} from "@react-navigation/stack";
import {Appbar} from "react-native-paper";
import {TouchableOpacity} from "react-native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import React from "react";
import {PreferencesContext} from "./context/preferencesContext";
import {getTheme} from "./theme/themes";
import { LibReferences } from './libref';
import { Ionicons, MaterialCommunityIcons } from './icons';
import { DetailedLic } from './components/detailedlic';
import { LicenseNavigationParamList } from './types';

const Lics = createStackNavigator<LicenseNavigationParamList>();

export const LicNavigator = () => {
  const { themeType } = React.useContext(
    PreferencesContext
  );
  const theme = getTheme(themeType);
  return (
    <Lics.Navigator
      initialRouteName="LibReferences"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;

          return (
            <Appbar.Header
              theme={{ colors: { primary: theme.colors.surface } }}
            >
              {previous ? (
                <Appbar.BackAction
                  onPress={navigation.goBack}
                  color={theme.colors.primary}
                />
              ) : (
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => {
                    ((navigation as any) as DrawerNavigationProp<{}>).openDrawer();
                  }}
                >
                  <Ionicons
                    name="ios-menu"
                    size={40}
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>
              )}
              <Appbar.Content
                title={title}
                titleStyle={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                }}
              />
            </Appbar.Header>
          );
        },
      }}
    >
      <Lics.Screen
        name="LibReferences"
        component={LibReferences}
        options={({ route }) => {
          console.log('!@# options', { route });
          // @ts-ignore
          const routeName = route.state
            ?
            // @ts-ignore
            route.state.routes[route.state.index].name
            : 'Used Libraries';
          return { headerTitle: routeName };
        }}
      />
      <Lics.Screen
        name="Details"
        component={DetailedLic}
        options={{ headerTitle: 'Details' }}
      />
    </Lics.Navigator>
  );
};