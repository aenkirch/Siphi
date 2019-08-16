import React from 'react';
import { 
    StyleSheet,
    TouchableHighlight,
    Text
} from 'react-native';

export function RedButton(props) {
  return (
    <TouchableHighlight style={styles.button} onPress={props.action} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableHighlight>
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
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
    },
    button: {
      height: 36,
      backgroundColor: '#d81c01',
      borderColor: '#d81c01',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }
  });