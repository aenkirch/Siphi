import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from "react-redux";

import ClassInfos from './ClassInfos';
import { Button } from '../../../components/Button';
import { LoadingScreen } from '../../../components/LoadingScreen';

/*
  * TODO :
  *
  * Mettre un disabled sur les boutons + texte qui explique pourquoi quand on arrive pas à accéder à ID de classe en AsyncStorage
*/

mapStateToProps = state => {
  return { 
    classesIds: state.classesIds,
  };
};

class connectedTeacherHomeScreen extends Component {

  render(){
    return (
      JSON.stringify( this.props.classesIds ) === JSON.stringify( [null] ) ? <LoadingScreen /> :  
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>

            <ClassInfos classesIds={this.props.classesIds}/>

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