import React from 'react';
import {
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LedItem } from './components/leditem';
import { ledds } from './data';
import { PreferencesContext } from './context/preferencesContext';
import { getTheme } from './theme/themes';

type LedProps = React.ComponentProps<typeof LedItem>;

function renderItem({ item }: { item: LedProps }) {
  if (item.active) return <LedItem {...item} />;
}

function keyExtractor(item: LedProps) {
  return item.id.toString();
}
export const Led = () => {
  const { themeType } = React.useContext(PreferencesContext);
  const theme = getTheme(themeType);

  const data = ledds.map((ledProps) => ({
    ...ledProps,
    onPress: () => {},
  }));
  return (
    <SafeAreaView style={[styles.container]} >
      <FlatList
        style={{ backgroundColor: theme.colors.surface }}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%"
  }
});
