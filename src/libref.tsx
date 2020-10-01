import React from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { PreferencesContext } from './context/preferencesContext';
import { getTheme, ThemeMode } from './theme/themes';
import { Text } from 'react-native-paper';
import { Lic } from './components/lic';
import { StackNavigationProp } from '@react-navigation/stack';
import { LicenseNavigationParamList } from './types';

export interface ILicense {
  licenses: string;
  repository: string;
  licenseUrl: string;
  parents: string;
}

export interface IFinalLicense {
  name: string;
  version: string;
  licenseSpecs: ILicense;
  onPress: (license: ILicense) => void;
}

type LicProps = React.ComponentProps<typeof Lic>;
function renderItem({ item }: { item: LicProps }) {
  return <Lic {...item} />;
}

function keyExtractor(item: LicProps) {
  return item.name;
}
type Props = {
  navigation?: StackNavigationProp<LicenseNavigationParamList>;
};
export const LibReferences = (props: Props) => {

  const { themeType } = React.useContext(PreferencesContext);
  const theme = getTheme(themeType);
// LET'S GET THE LICENSES AND DEFINE OUR REGEXES
  const licenses: { [id: string]: ILicense } = require('../licenses.json');
  const numberRegex = /\d+(\.\d+)*/;
  const atRegex = /(?:@)/gi;
  const finalLicense: IFinalLicense[] = [];


  Object.keys(licenses).map((idx) => {
    let item = licenses[idx];
    // Extract the version of the library from the name
    const version = idx.match(numberRegex);
    // Removes the part after the @
    const nameWithoutVersion = idx
      .replace(atRegex, '')
      .replace(version ? version[0] : '', '');
    finalLicense.push({
      name: nameWithoutVersion,
      version: version ? version[0] : '',
      licenseSpecs: item,
      onPress: () =>
        props.navigation && props.navigation.push('Details', item),
    });
  });
  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        contentContainerStyle={{ backgroundColor: theme.colors.background }}
        style={{ backgroundColor: theme.colors.background }}
        data={finalLicense}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
});

