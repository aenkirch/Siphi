import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Alert
} from 'react-native';
import { connect } from "react-redux";
import t from 'tcomb-form-native';

import { Button } from '../../../components/Button';

/*
  * TODO :
  *
  * - Gérer les erreurs
*/

const Form = t.form.Form;

const Question = t.struct({
  question: t.String,
  answer1: t.String,
  answer2: t.String,
  answer3: t.String,
  answer4: t.maybe(t.String),
  answer5: t.maybe(t.String)
});

const options = {
  fields: {
    question: {
      error: 'A valid question is needed'
    },
    answer1: {
      error: '3 questions are needed : the 1st one is included :)'
    },
    answer2: {
      error: '3 questions are needed : the 2nd one is included :)'
    },
    answer3: {
      error: '3 questions are needed : the 3rd one is included :)'
    }
  },
  stylesheet: formStyles,
};

class connectedFormCreationScreen extends Component {

  // faire appel au POST correspondant dans apiActions

  createForm = () => {
    if (this._form.validate().isValid() == true){
      const value = this._form.getValue();
      this.props.socket.emit('setForm', value);
      this.props.socket.on('successfullySetForm', 
        () => Alert.alert('Success !', 'Your form was created.', 
          [
            {text: 'Great !'}
          ],
          { cancelable: false }
          )
        );
    }
  };

  render(){
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}>
          <View style={styles.welcomeContainer}>

            <Form
              ref={c => this._form = c}
              type={Question}
              options={options}
            />

            <Button 
              title={"Save"} 
              action={this.createForm}
            />

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
  }
};

const mapStateToProps = state => {
    return { socket: state.socket }
};

const FormCreationScreen = connect(mapStateToProps)(connectedFormCreationScreen);

export default FormCreationScreen;