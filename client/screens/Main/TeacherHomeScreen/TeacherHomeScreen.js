import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Alert
} from 'react-native';
import { connect } from "react-redux";
import * as SecureStore from 'expo-secure-store';

import ClassInfos from './ClassInfos';
import { Select } from '../../../components/Select';
import { Button } from '../../../components/Button';
import { getGroups } from '../../../actions/apiActions';
import { selectCourse, selectGroup, resetGroups } from '../../../actions/inAppActions';

function mapDispatchToProps(dispatch) {
  return {
    getGroups: params => dispatch(getGroups(params)),
    selectCourse: params => dispatch(selectCourse(params)),
    selectGroup: params => dispatch(selectGroup(params)),
    resetGroups: param => dispatch(resetGroups(param))
  };
}

mapStateToProps = state => {
  return {
    courses: state.courses,
    groups: state.groups,
    selectedCourse: state.selectedCourse,
    selectedGroup: state.selectedGroup
  };
};

class connectedTeacherHomeScreen extends Component {

  state = {confirmedChoice: false};

  async selectCourse (newCourse) {
    this.props.resetGroups();
    this.props.selectCourse(newCourse);

    const userToken = await SecureStore.getItemAsync('userToken');
    const headers = {
      'Authorization': 'Bearer ' + userToken
    };
    await this.props.getGroups({headers: headers, courseLabel: newCourse});
  }

  confirmChoice = () => {
    if (this.props.selectedGroup)
      this.setState({confirmedChoice: true});
    else {
      Alert.alert('Error', 'You have to select a group before confirming', 
          [
              {text: 'OK'}
          ],
          { cancelable: false }
      )
    }
  }

  render(){

    if (this.props.groups) 
      groupSelect = <Select 
                      array={this.props.groups} 
                      selectedValue={this.props.selectedGroup} 
                      setValue={param => this.props.selectGroup(param)}/>
    else groupSelect = null

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>

            <ClassInfos />

            {this.state.confirmedChoice ? 
              (
                <View>
                  <Text style={styles.textStyle}>You selected group {this.props.selectedGroup} in {this.props.selectedCourse}</Text>
                  <Button 
                    title={"Change group"}
                    action={() => this.setState({confirmedChoice: false})}
                  />
                  <Button 
                    title={"Create a new form"} 
                    action={() => this.props.navigation.navigate('FormCreationScreen', {selectedCourse: this.state.selectedCourse, selectedGroup: this.state.selectedGroup})}
                  />
                </View>
              ) 
              : 
              (
                <View>
                  <Select array={this.props.courses} selectedValue={this.props.selectedCourse} setValue={param => this.selectCourse(param)}/>
                  { groupSelect }
                  <Button 
                    title={"Confirm"}
                    action={() => this.confirmChoice()}
                  />
                </View>
              )
            }

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
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20
  }
});

const TeacherHomeScreen = connect(mapStateToProps, mapDispatchToProps)(connectedTeacherHomeScreen);

export default TeacherHomeScreen;