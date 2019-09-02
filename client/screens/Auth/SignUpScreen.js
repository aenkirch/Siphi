import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { connect } from "react-redux";
import t from 'tcomb-form-native';

import { Button } from '../../components/Button';
import { createAccount } from '../../actions/loginActions';

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
  teacherAccount: t.Boolean
});

const options = {
  fields: {
    username: {
      error: 'A valid username is needed'
    },
    password: {
      error: 'A valid password is needed',
      secureTextEntry: true,
      password: true
    },
  },
  stylesheet: formStyles,
};

mapDispatchToProps = dispatch => {
  return {
    createAccount: formData => dispatch(createAccount(formData))
  };
}

mapStateToProps = state => {
  return { 
    createdAccountUsername: state.createdAccountUsername,
    createdAccountError: state.createdAccountError
  }
};

class connectedSignUpScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop:100}}>
          <Form
            ref={c => this._form = c}
            type={User}
            options={options}
          />
        </View>
        <View>
          <Button title={"Sign up"} action={this._signUpAsync} />
        </View>
      </View>
    );
  }

  _signUpAsync = async () => {
    if (this._form.validate().isValid() == true){
      const value = this._form.getValue();
      this.props.createAccount(value);
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Alert for success
    if (prevProps.createdAccountUsername !== this.props.createdAccountUsername) {
      Alert.alert(
        null,
        'Your account was created successfully ' + this.props.createdAccountUsername + '!',
        [
          {text: 'Go to login', onPress: () => this.props.navigation.navigate('SignIn')}
        ]
      )
    }
    // Alert for error
    if (prevProps.createdAccountError !== this.props.createdAccountError) {
      Alert.alert(
        'Something went wrong...',
        this.props.createdAccountError
      )
    }
  }
}

connectedSignUpScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#2f95dc',
    flex: 1
  }
});

const formStyles = {
  ...Form.stylesheet,
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

const SignUpScreen = connect(mapStateToProps, mapDispatchToProps)(connectedSignUpScreen);

export default SignUpScreen;