import React from 'react';
import { 
    StyleSheet,
    Picker
} from 'react-native';

export function Select(props) {

  return (
    <Picker
      selectedValue={props.selectedValue}
      onValueChange={(itemValue, itemIndex) => {
        props.setValue(itemValue) }
      }
    >
        {props.array.map((prop, key) => {
        return (
            <Picker.Item label={prop.name} value={prop.label} key={prop._id} />
        )
        })}
    </Picker>
  );
};

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      padding: 20,
      backgroundColor: '#ffffff',
    },
    contentContainer: {
      paddingTop: 30,
    },
    }
);