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

/*
  * TODO :
  *
  * Mettre un disabled sur les boutons + texte qui explique pourquoi quand on arrive pas à accéder à ID de classe en AsyncStorage
*/

mapStateToProps = state => {
  return { 
    loggedInAccountUser: state.loggedInAccountUser,
  }
};

class connectedTeacherHomeScreen extends Component {

  async componentWillMount(){
    
    const userToken = await SecureStore.getItemAsync('userToken');

    const headers = {
      'Authorization': 'Bearer ' + userToken
    };

    // recuperer tout les groupes affilies au compte connecté via une connected route
    // en utilisant le GET correspondant dans apiActions

    // utiliser un mapDispatchToProps 
  }

  render(){
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>

            <ClassInfos />

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

const TeacherHomeScreen = connect(mapStateToProps)(connectedTeacherHomeScreen);

export default TeacherHomeScreen;