import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';
import { connect } from "react-redux";
import t from 'tcomb-form-native';
import * as SecureStore from 'expo-secure-store';

import { Button } from '../../../components/Button';
import { ButtonAdd, ButtonCreate } from '../../../components/ButtonAdd';
import { SetTopic } from '../../../actions/apiActions';

mapDispatchToProps = dispatch => {
    return {
        SetTopic: params => dispatch(SetTopic(params))
    };
  }
  
  const mapStateToProps = state => {
    return { 
      loggedInAccountUser: state.loggedInAccountUser,
    };
  };

class connectedCreateTopicsScreen extends Component {
    state = { 
        token: {},
       topicName:'',
    }
    constructor(props){
        super(props);
    }

    componentDidMount () {
        SecureStore.getItemAsync('userToken').then((res)=>{
          this.setState({ token: res });
        })
      }

    CreateTop = () => {
        const headers = {
            'Authorization': 'Bearer ' + this.state.token,
          };
        var topicname = this.state.topicName.toString();
        this.props.SetTopic({ headers, topicname });
        this.props.navigation.goBack();
        
    }
    
    render() {
        return (
            <View>
                <Text styles={{justifyContent: 'center',}}>
                    NOM DU TOPIC : 
                </Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius:5, margin:30,}}
                    onChangeText={(topicName) => this.setState({topicName})}
                    value={this.state.topicName}
                />
                <View>
                    <ButtonCreate
                        title={'Créer'}
                        action={() => this.CreateTop()}
                    />
                </View>
            </View>
        );
    }
}
connectedCreateTopicsScreen.navigationOptions = {
  title: 'Création de topic',
};
const CreateTopicsScreen = connect(mapStateToProps, mapDispatchToProps)(connectedCreateTopicsScreen);

export default CreateTopicsScreen;