import React from 'react';
import { 
    StyleSheet,
    TouchableHighlight,
    Text
} from 'react-native';



export function ButtonCreateGroup(props) {
    return (
      <TouchableHighlight style={styles2.button} onPress={props.action} underlayColor='#99d9f4'>
          <Text style={styles2.buttonText}>{props.title}</Text>
      </TouchableHighlight>
    );
  };
  
  const styles2 = StyleSheet.create({
      container: {
        marginTop: 100,
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
        width: "60%",
        marginLeft:"20%",
        backgroundColor: '#184b6c',
        borderColor: '#2f95dc',
        borderWidth: 0,
        borderRadius: 7,
        marginBottom: 10,
        justifyContent: 'center'
      }
    });