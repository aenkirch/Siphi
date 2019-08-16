import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';

import { Button } from '../../../components/Button';

/*
  * TODO :
  *
  *
*/

class StudentHomeScreen extends Component {

  render(){
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>

            <Button 
                title={"Answer latest form"} 
                action={() => this.props.navigation.navigate('FormAnsweringScreen')}
            />

          </View>
        </ScrollView>
      </View>
    );
  }
}

StudentHomeScreen.navigationOptions = {
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

export default StudentHomeScreen;