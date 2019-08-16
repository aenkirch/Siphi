import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  AsyncStorage,
  View,
} from 'react-native';
import { connect } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import socketIO from 'socket.io-client';

import { IP } from '../../constants/config';
import { setSocket } from '../../actions/loginActions';

function mapDispatchToProps(dispatch) {
  return {
    setSocket: socket => dispatch(setSocket(socket))
  };
}

class connectedAuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await SecureStore.getItemAsync('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    
    if (userToken) {

      //  We‘re authenticating the user to use websockets using his token

      var socket = socketIO.connect(IP, {
          'query': 'token=' + userToken
      });

      this.props.setSocket(socket);

      //  Here, we are checking his status in order to check what HomeScreen we should open

      const isTeacher = await AsyncStorage.getItem('isTeacher');

      JSON.parse(isTeacher) ? this.props.navigation.navigate('TeacherHomeScreen') : this.props.navigation.navigate('StudentHomeScreen');
    }
    else
      this.props.navigation.navigate('Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const AuthLoadingScreen = connect(null, mapDispatchToProps)(connectedAuthLoadingScreen);

export default AuthLoadingScreen;