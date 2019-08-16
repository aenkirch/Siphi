import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Picker
} from 'react-native';
import { connect } from "react-redux";

import { Button } from '../../../components/Button';

/*
  * TODO :
  *
  * - Faire autant de Picker.item qu‘il y a de answer (boucle)
*/

class connectedFormAnsweringScreen extends Component {

  render(){
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}>
          <View style={styles.welcomeContainer}>

            <Picker
                style={{height: 50, width: 100}} >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

const mapStateToProps = state => {
    return { socket: state.socket }
};

const FormAnsweringScreen = connect(mapStateToProps)(connectedFormAnsweringScreen);

export default FormAnsweringScreen;