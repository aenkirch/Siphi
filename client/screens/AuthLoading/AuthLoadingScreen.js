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
import axios from 'axios';

import { LoadingScreen } from '../../components/LoadingScreen';
import { IP } from '../../constants/config';
import { setSocket } from '../../actions/loginActions';
import { getCourses, getGroups } from '../../actions/apiActions';
import { selectCourse } from '../../actions/inAppActions';

function mapDispatchToProps(dispatch) {
  return {
    setSocket: socket => dispatch(setSocket(socket)),
    getCourses: params => dispatch(getCourses(params)),
    getGroups: params => dispatch(getGroups(params)),
    selectCourse: params => dispatch(selectCourse(params))
  };
}

class connectedAuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // doing a useless request to check if jwt is still recognized on server side
  verifyToken = async (jwtInHeaders) => { 
    const res = await axios.get(IP + '/api/verificationRequest', {
      headers: jwtInHeaders
    })
    .then(res => {return true;})
    .catch(err => {return false;})

    return res;
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await SecureStore.getItemAsync('userToken');

    const headers = {
      'Authorization': 'Bearer ' + userToken
    };

    const pass = await this.verifyToken(headers);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    
    if (pass) {

      //  We‘re authenticating the user to use websockets using his token

      var socket = socketIO.connect(IP, {
          'query': 'token=' + userToken
      });
  
      this.props.setSocket(socket);

      //  Here, we are checking his status in order to check what HomeScreen we should open

      const isTeacher = await AsyncStorage.getItem('isTeacher');

      if (JSON.parse(isTeacher)){
        await this.props.getCourses(headers);
        if (this.props.courses.length > 0) {
          this.props.selectCourse(this.props.courses[0].label);
          this.props.getGroups({headers: headers, courseLabel: this.props.courses[0].label});
        }
        this.props.navigation.navigate('TeacherHomeScreen')
      }
      else {
        this.props.navigation.navigate('StudentHomeScreen')
      }
    }
    else
      this.props.navigation.navigate('Auth');
  };

  // Render loading content while async content is being downloaded
  render() {
    return (
      <LoadingScreen />
    );
  }
}

const mapStateToProps = state => {
  return { 
    courses: state.courses
  }
};

const AuthLoadingScreen = connect(mapStateToProps, mapDispatchToProps)(connectedAuthLoadingScreen);

export default AuthLoadingScreen;