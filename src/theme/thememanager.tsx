import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';


export const THEME_KEY = '@theme';

export const setCurrentTheme = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getCurrentTheme = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(THEME_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

