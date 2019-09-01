import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Picker,
  Text,
  Alert
} from 'react-native';
import { connect } from "react-redux";

import { Button } from '../../../components/Button';

class connectedFormAnsweringScreen extends Component {

  state = {selectedValue: {}}

  confirmChoice = () => {
    if (this.state.selectedValue) console.log(this.state.selectedValue); // faire dans redux une requete pour valider le résultat puis l‘interpréter coté prof
    else {
      Alert.alert('Error', 'You have to select an answer before confirming', 
      [
          {text: 'OK'}
      ],
      { cancelable: false }
      )
    }
  }

  render(){

    const { navigation } = this.props;
    const selectedForm = navigation.getParam('selectedForm', 'NO-ID');
    
    const optionalAnswers = [];
    if (selectedForm.a4) optionalAnswers.push(selectedForm.a4);
    if (selectedForm.a5) optionalAnswers.push(selectedForm.a5);

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}>
          <View style={styles.welcomeContainer}>

            <Text style={styles.textStyle}>{selectedForm.name}</Text>

            <Picker
                selectedValue={this.state.selectedValue}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({selectedValue: itemValue});
                }}
                style={styles.pickerStyle} >
                <Picker.Item label={selectedForm.a1} value={selectedForm.a1} />
                <Picker.Item label={selectedForm.a2} value={selectedForm.a2} />
                <Picker.Item label={selectedForm.a3} value={selectedForm.a3} />
                {optionalAnswers.map(optionalAnswer => {
                  return (
                    <Picker.Item label={optionalAnswer} value={optionalAnswer} key={optionalAnswer} />
                  )
                })}
            </Picker>
          </View>
        </ScrollView>
        <View>
          <Button title={"Confirm"} action={this.confirmChoice} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  pickerStyle:{  
    height: 150,  
    width: "100%",  
    color: '#344953',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  }
});

const mapStateToProps = state => {
    return { socket: state.socket }
};

const FormAnsweringScreen = connect(mapStateToProps)(connectedFormAnsweringScreen);

export default FormAnsweringScreen;