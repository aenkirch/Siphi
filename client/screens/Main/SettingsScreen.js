import React from 'react';
import { 
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { RedButton } from '../../components/RedButton';
import { Button } from '../../components/Button';

class SettingsScreen extends React.Component {

  render(){
    return (
      <View styles={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <RedButton title={"Sign off"} action={this._signOff}/>
          <Button 
            title={"Create a new course"}
            action={() => this.props.navigation.navigate('CourseCreationScreen')}
          />

          <Button 
            title={"Create a new group"}
            action={() => this.props.navigation.navigate('GroupCreationScreen')}
          />
        </ScrollView>
      </View>
    )
  }

  _signOff = async () => {
    await SecureStore.setItemAsync('userToken', '');
    this.props.navigation.navigate('AuthLoading');
  }
}

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

SettingsScreen.navigationOptions = {
  header: null,
};

export default SettingsScreen;