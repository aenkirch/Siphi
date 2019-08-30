import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text
} from 'react-native';
import { connect } from "react-redux";
import t from 'tcomb-form-native';
import * as SecureStore from 'expo-secure-store';

import { Select } from '../../../components/Select';
import { Button } from '../../../components/Button';
import { setGroup } from '../../../actions/apiActions';

function mapDispatchToProps(dispatch) {
  return {
    setGroup: params => dispatch(setGroup(params))
  };
}

const Form = t.form.Form;

const Question = t.struct({
  name: t.String,
});

const options = {
  fields: {
    name: {
      error: 'Your course need a name'
    },
  },
  stylesheet: formStyles,
};

class connectedGroupCreationScreen extends Component {

  state = { token : {}, selectedGroup: this.props.courses[0].label }

  async componentDidMount () {
    const userToken = await SecureStore.getItemAsync('userToken');
    this.setState({ token: userToken  });
  }

  setGroup = () => {

    const headers = {
      'Authorization': 'Bearer ' + this.state.token
    };

    if (this._form.validate().isValid() == true){
      const value = {};
      value.name = this._form.getValue().name;
      value.courseLabel = this.state.selectedGroup;
      this.props.setGroup({  value, headers  });
    }
  };

  render(){
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}>
          <View style={styles.welcomeContainer}>

            <Text style={styles.text}>First, select your course</Text>

            <Select array={this.props.courses} selectedValue={this.state.selectedGroup} setValue={param => this.setState({selectedGroup: param})}/>

            <Form
              ref={c => this._form = c}
              type={Question}
              options={options}
            />

            <Button 
              title={"Save"} 
              action={this.setGroup}
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
  text: {
    fontWeight: 'bold',
    fontSize: 17
  }
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
    return { 
      socket: state.socket,
      courses: state.courses
    }
};

const GroupCreationScreen = connect(mapStateToProps, mapDispatchToProps)(connectedGroupCreationScreen);

export default GroupCreationScreen;