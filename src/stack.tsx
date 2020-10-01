import React from 'react';
import {LayoutAnimation, TouchableOpacity, View} from 'react-native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Appbar, useTheme, Text } from 'react-native-paper';

import { BottomTabs } from './bottomTabs';
import { MaterialCommunityIcons } from './icons';
import { Ionicons } from './icons';
const Stack = createStackNavigator();


function getHeaderTitle(route) {
  if(route.state){
      return route.state.routes[route.state.index].name;
  }
  switch (route.name) {
    case 'FeedList':
      return 'Feed';
      default:
          return;
  }
}
export const StackNavigator = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="FeedList"
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
                title={
                  title === 'Feed' ? (
                    <MaterialCommunityIcons
                      style={{ marginRight: 10 }}
                      name="twitter"
                      size={40}
                    />
                  ) : (
                    title
                  )
                }
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
      <Stack.Screen
        name="FeedList"
        component={BottomTabs}
        options={({ route }) => {
          console.log('!@# options', { route });
          return { headerTitle: getHeaderTitle(route) };
        }}
      />
    </Stack.Navigator>
  );
};

