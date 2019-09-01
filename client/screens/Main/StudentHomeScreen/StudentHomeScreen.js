import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text
} from 'react-native';
import { connect } from "react-redux";

import { Button } from '../../../components/Button';

mapStateToProps = state => {
  return {
    availableForms: state.availableForms,
    myGroupInfos: state.myGroupInfos
  };
};

class connectedStudentHomeScreen extends Component {

  render(){

    availableForms = this.props.availableForms;
    myGroupInfos = this.props.myGroupInfos;

    if (this.props.availableForms && this.props.myGroupInfos) {
      toRender = (
        <View>
          {availableForms.map(form => {
            return (
              <Button 
                title={"New form - " + myGroupInfos[form.relatedGroup].courseLabel + " " + myGroupInfos[form.relatedGroup].name} 
                action={() => this.props.navigation.navigate('FormAnsweringScreen', {selectedForm: form})}
                key={form._id}
              />
            )
          })}
        </View>)
    }

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>

            { toRender }

          </View>
        </ScrollView>
      </View>
    );
  }
}

connectedStudentHomeScreen.navigationOptions = {
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

const StudentHomeScreen = connect(mapStateToProps)(connectedStudentHomeScreen);

export default StudentHomeScreen;