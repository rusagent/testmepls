import {createStackNavigator} from "@react-navigation/stack";
import {Appbar, useTheme} from "react-native-paper";
import {TouchableOpacity} from "react-native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {Preferences} from "./preferences";
import React from "react";
import {PreferencesContext} from "./context/preferencesContext";
import {getTheme} from "./theme/themes";
import { Ionicons } from './icons';

const Pref = createStackNavigator();

export const PrefNavigator = () => {
    const { themeType } = React.useContext(
        PreferencesContext
    );
    const theme = getTheme(themeType);
    return (
        <Pref.Navigator
            initialRouteName="Preferences"
            headerMode="screen"
            screenOptions={{
                header: ({ navigation }) => {

                    return (
                        <Appbar.Header
                            theme={{ colors: { primary: theme.colors.surface } }}
                        >
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
                            <Appbar.Content
                                title="Options"
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
            <Pref.Screen
                name="Preferences"
                component={Preferences}
                options={{headerTitle: "Settings"}}
            />
        </Pref.Navigator>
    );
};