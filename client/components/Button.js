import React from 'react';
import { 
    StyleSheet,
    TouchableHighlight,
    Text
} from 'react-native';

export function Button(props) {
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
      height: 50,
      width: 175,
      backgroundColor: '#184b6c',
      borderColor: '#2f95dc',
      borderWidth: 0,
      borderRadius: 25,
      marginBottom: 10,
      justifyContent: 'center'
    }
  });