import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from "react-redux";
import * as SecureStore from 'expo-secure-store';

import ClassInfos from './ClassInfos';
import { Button } from '../../../components/Button';
import { LoadingScreen } from '../../../components/LoadingScreen';
import { getCourses } from '../../../actions/apiActions';

/*
  * TODO :
  *
  * Mettre un disabled sur les boutons + texte qui explique pourquoi quand on arrive pas à accéder à ID de classe en AsyncStorage
*/

mapDispatchToProps = dispatch => {
  return {
    getCourses: params => dispatch(getCourses(params))
  };
}

mapStateToProps = state => {
  return { 
    classesIds: state.classesIds,
  };
};

isEqual = (ar1, ar2) => {
  return JSON.stringify(ar1) === JSON.stringify(ar2);
}

class connectedTeacherHomeScreen extends Component {

  async componentWillMount() {
    const userToken = await SecureStore.getItemAsync('userToken');

    const headers = {
      'Authorization': 'Bearer ' + userToken
    };

    this.props.getCourses(headers);
  }

  render(){
    return (
      isEqual(this.props.classesIds, [null]) ? <LoadingScreen /> :  
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>

            <ClassInfos classesIds={this.props.classesIds}/>

            <Button 
              title={"Create a new course"}
              action={() => this.props.navigation.navigate('CourseCreationScreen')}
            />

            <Button 
              title={"Create a new form"} 
              action={() => this.props.navigation.navigate('FormCreationScreen')}
            />

          </View>
        </ScrollView>
      </View>
    );
  }
}

connectedTeacherHomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    paddingTop: 30,
  }
});

const TeacherHomeScreen = connect(mapStateToProps, mapDispatchToProps)(connectedTeacherHomeScreen);

export default TeacherHomeScreen;