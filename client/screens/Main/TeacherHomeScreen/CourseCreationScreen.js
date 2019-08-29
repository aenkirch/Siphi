import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet
} from 'react-native';
import { connect } from "react-redux";
import t from 'tcomb-form-native';
import * as SecureStore from 'expo-secure-store';

import { Button } from '../../../components/Button';
import { setCourse } from '../../../actions/apiActions';

function mapDispatchToProps(dispatch) {
  return {
    setCourse: params => dispatch(setCourse(params))
  };
}

const Form = t.form.Form;

const Question = t.struct({
  name: t.String,
  label: t.String,
});

const options = {
  fields: {
    name: {
      error: 'Your course need a name'
    },
    label: {
      error: 'Your course need a label'
    }
  },
  stylesheet: formStyles,
};

class connectedCourseCreationScreen extends Component {

  state = { token : {} }

  async componentDidMount () {
    const userToken = await SecureStore.getItemAsync('userToken');
    this.setState({ token: userToken  });
  }

  // faire appel au POST correspondant dans apiActions

  createForm = () => {

    const headers = {
      'Authorization': 'Bearer ' + this.state.token
    };

    if (this._form.validate().isValid() == true){
      const value = this._form.getValue();
      this.props.setCourse({  value, headers  });
    }
  };

  render(){
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}>
          <View style={styles.welcomeContainer}>

            <Form
              ref={c => this._form = c}
              type={Question}
              options={options}
            />

            <Button 
              title={"Save"} 
              action={this.createForm}
            />

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

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
  }
};

const mapStateToProps = state => {
    return { socket: state.socket }
};

const CourseCreationScreen = connect(mapStateToProps, mapDispatchToProps)(connectedCourseCreationScreen);

export default CourseCreationScreen;