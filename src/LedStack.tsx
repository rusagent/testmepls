import {createStackNavigator} from "@react-navigation/stack";
import {Appbar} from "react-native-paper";
import {TouchableOpacity} from "react-native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {Led} from "./led";
import React from "react";
import {PreferencesContext} from "./context/preferencesContext";
import {getTheme} from "./theme/themes";
import { Ionicons } from './icons'

const Leds = createStackNavigator();

export const LedNavigator = () => {
    const { themeType } = React.useContext(
        PreferencesContext
    );
    const theme = getTheme(themeType);

    return (
        <Leds.Navigator
            initialRouteName="LedList"
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
                                title="Led Tool"
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
            <Leds.Screen
                name="LedList"
                component={Led}
                options={{headerTitle: "Led Tool"}}
            />
        </Leds.Navigator>
    );
};