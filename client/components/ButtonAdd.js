import React from 'react';
import { 
    StyleSheet,
    TouchableHighlight,
    Text
} from 'react-native';

export function ButtonAdd(props) {
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
      width: 50,
      marginLeft:20,
      backgroundColor: '#32CD32',
      borderWidth: 0,
      borderRadius: 25,
      marginBottom: 10,
      justifyContent: 'center'
    }
  });

  export function ButtonCreate(props) {
    return (
      <TouchableHighlight style={stylesCreate.button} onPress={props.action} underlayColor='#99d9f4'>
          <Text style={stylesCreate.buttonText}>{props.title}</Text>
      </TouchableHighlight>
    );
  };
  
  const stylesCreate = StyleSheet.create({
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
        marginLeft:20,
        backgroundColor: '#32CD32',
        borderWidth: 0,
        borderRadius: 25,
        marginBottom: 10,
        justifyContent: 'center'
      }
    });