import React from 'react';
import { 
    StyleSheet,
    TouchableHighlight,
    Text
} from 'react-native';

export function ButtonTopic(props) {
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
      width: '90%',
      margin: '5%',
      backgroundColor: '#184b6c',
      borderColor: '#2f95dc',
      borderWidth: 0,
      borderRadius: 7,
      marginBottom: 10,
      justifyContent: 'center'
    }
  });

  export function ButtonPostCom(props) {
    return (
      <TouchableHighlight style={styles2.button} onPress={props.action} underlayColor='#99d9f4'>
          <Text style={styles2.buttonText}>{props.title}</Text>
      </TouchableHighlight>
    );
  };
  
  const styles2 = StyleSheet.create({
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
        width: '90%',
        margin: '5%',
        backgroundColor: '#184b6c',
        borderColor: '#2f95dc',
        borderWidth: 0,
        borderRadius: 7,
        marginBottom: 10,
        justifyContent: 'center'
      }
    });