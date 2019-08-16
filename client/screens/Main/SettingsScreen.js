import React from 'react';
import { 
  View 
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { RedButton } from '../../components/RedButton';

class SettingsScreen extends React.Component {

  render(){
    return (
      <View>
        <RedButton title={"Sign off"} action={this._signOff}/>
      </View>
    )
  }

  _signOff = async () => {
    await SecureStore.setItemAsync('userToken', '');
    this.props.navigation.navigate('AuthLoading');
  }
}

export default SettingsScreen;