import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { IFinalLicense } from '../libref';
import { getTheme } from '../theme/themes';
import { PreferencesContext } from '../context/preferencesContext';
import Animated from 'react-native-reanimated';
import { MaterialCommunityIcons } from '../icons';


export const Lic = (props: IFinalLicense) => {

  const { themeType } = React.useContext(PreferencesContext);
  const theme = getTheme(themeType);
  return (
    <Animated.View >
      <TouchableRipple onPress={() => props.onPress(props.licenseSpecs)}>
        <View style={styles.mainContainer}>
          <View style={styles.leftContainer}>
            <View style={styles.item}>
              <Text style={styles.title}>{props.name}</Text>
              <Text style={[styles.subitem, { color: theme.colors.disabled }]}>{props.version}</Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={40}
              color={theme.colors.primary}
            />
          </View>
        </View>
      </TouchableRipple>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    paddingTop: 10,
    paddingRight: 15,
  },
  rightContainer:{
    paddingTop: 5,
    marginLeft: 'auto',
  },
  item: {
    marginHorizontal: 16,
  },
  subitem: {
    fontSize: 14,
  },
  title: {
    fontSize: 17,
  },
});
