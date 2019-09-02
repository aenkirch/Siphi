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
import * as SecureStore from 'expo-secure-store';

import { Button } from '../../../components/Button';
import { answerForm } from '../../../actions/apiActions';

class connectedFormAnsweringScreen extends Component {

  state = {token: {}, selectedValue: {}}

  async componentDidMount () {
    const userToken = await SecureStore.getItemAsync('userToken');
    this.setState({ token: userToken  });
  }

  confirmChoice = (formId) => {
    if (this.state.selectedValue) {
      const headers = {
        'Authorization': 'Bearer ' + this.state.token
      };

      const value = { formId: formId, submittedAnswer: this.state.selectedValue,  }

      this.props.answerForm({ value, headers });
    }
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
    if (selectedForm.a4) optionalAnswers.push({answer: selectedForm.a4, id: "a4"});
    if (selectedForm.a5) optionalAnswers.push({answer: selectedForm.a5, id: "a5"});

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
                <Picker.Item label={selectedForm.a1} value={"a1"} />
                <Picker.Item label={selectedForm.a2} value={"a2"} />
                <Picker.Item label={selectedForm.a3} value={"a3"} />
                {optionalAnswers.map(optionalAnswer => {
                  return (
                    <Picker.Item label={optionalAnswer.answer} value={optionalAnswer.id} key={optionalAnswer} />
                  )
                })}
            </Picker>
          </View>
        </ScrollView>
        <View>
          <Button title={"Confirm"} action={() => this.confirmChoice(selectedForm._id)} />
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

function mapDispatchToProps(dispatch) {
  return {
    answerForm: params => dispatch(answerForm(params))
  };
}

const FormAnsweringScreen = connect(mapStateToProps, mapDispatchToProps)(connectedFormAnsweringScreen);

export default FormAnsweringScreen;