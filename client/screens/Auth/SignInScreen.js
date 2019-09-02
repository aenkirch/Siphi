import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  AsyncStorage
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { connect } from "react-redux";
import t from 'tcomb-form-native';

import { Button } from '../../components/Button';
import { loginAccount } from '../../actions/loginActions';

/*
  * TODO :
  *
  * Traitement de la connexion de l‘utilisateur
*/

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
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
    loginAccount: formData => dispatch(loginAccount(formData))
  };
}

mapStateToProps = state => {
  return { 
    loggedInAccountUser: state.loggedInAccountUser,
    loggedInAccountError: state.loggedInAccountError
  }
};

class connectedSignInScreen extends React.Component {

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
          <Button title={"Sign in"} action={this.signIn} />
        </View>
      </View>
    );
  }

  signIn  = () => {
    if (this._form.validate().isValid() == true){
      const value = this._form.getValue();
      this.props.loginAccount(value);
    }
  }

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    // Saving token and opening Main
    if (prevProps.loggedInAccountUser !== this.props.loggedInAccountUser && this.props.loggedInAccountUser.token) {
      await SecureStore.setItemAsync('userToken', this.props.loggedInAccountUser.token);
      await AsyncStorage.setItem('isTeacher', JSON.stringify(this.props.loggedInAccountUser.user.isTeacher) );
      await AsyncStorage.setItem('username', this.props.loggedInAccountUser.user.username);
      this.props.navigation.navigate('AuthLoading');
    }
    // Alert for error
    if (prevProps.loggedInAccountError !== this.props.loggedInAccountError) {
      Alert.alert(
        'Something went wrong...',
        this.props.loggedInAccountError
      )
    }
  }
}

connectedSignInScreen.navigationOptions = {
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
      color: 'white',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
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

const SignInScreen = connect(mapStateToProps, mapDispatchToProps)(connectedSignInScreen);

export default SignInScreen;