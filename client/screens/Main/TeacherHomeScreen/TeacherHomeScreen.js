import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet
} from 'react-native';
import { connect } from "react-redux";
import * as SecureStore from 'expo-secure-store';

import ClassInfos from './ClassInfos';
import { Select } from '../../../components/Select';
import { Button } from '../../../components/Button';
import { getGroups } from '../../../actions/apiActions';

function mapDispatchToProps(dispatch) {
  return {
    getGroups: params => dispatch(getGroups(params))
  };
}

/*
  * TODO :
  *
  * Mettre un disabled sur les boutons + texte qui explique pourquoi quand on arrive pas à accéder à ID de classe en AsyncStorage
*/

mapStateToProps = state => {
  return { 
    classesIds: state.classesIds,
    courses: state.courses,
    groups: state.groups
  };
};

class connectedTeacherHomeScreen extends Component {

  state = {selectedCourse: this.props.courses[0].label, selectedGroup: {}};

  async selectCourse (newCourse) {
    this.setState({selectedCourse: newCourse});

    const userToken = await SecureStore.getItemAsync('userToken');
    const headers = {
      'Authorization': 'Bearer ' + userToken
    };
    this.props.getGroups({headers: headers, courseLabel: newCourse});
  }

  render(){

    if (this.props.groups) 
      groupSelect = <Select 
                      array={this.props.groups} 
                      selectedValue={this.state.selectedGroup} 
                      setValue={param => this.setState({selectedGroup: param})}/>
    else groupSelect = null

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>

            <ClassInfos classesIds={this.props.classesIds}/>

            <Select array={this.props.courses} selectedValue={this.state.selectedCourse} setValue={param => this.selectCourse(param)}/>

            { groupSelect }

            <Button 
              title={"Create a new course"}
              action={() => this.props.navigation.navigate('CourseCreationScreen')}
            />

            <Button 
              title={"Create a new group"}
              action={() => this.props.navigation.navigate('GroupCreationScreen')}
            />

            <Button 
              title={"Create a new form"} 
              action={() => this.props.navigation.navigate('FormCreationScreen')} // mettre en paramètre 
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