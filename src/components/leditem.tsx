import React from 'react';
import { StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  id: number;
  name: string;
  color: string;
  textcolor: string;
  active: boolean;
  onPress: (id: number) => void;
};

export const LedItem = (props: Props) => {
  return (
    <Button style={styles.item} 
      mode="contained"
      color={props.color}
      onPress={() => props.onPress(props.id)}>
      {props.name}
    </Button>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
