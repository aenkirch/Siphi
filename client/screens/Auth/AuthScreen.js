import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView
} from 'react-native';

import { Button } from '../../components/Button';

class AuthScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Image
            style={{
                resizeMode: 'contain',
                marginTop: 100,
                width: '90%',
            }}
            source={require('../../assets/images/logo-hat.png')}
        />
        {/* <ScrollView>
            <Text style={styles.titleText}>Welcome to Siphi</Text>
        </ScrollView> */}
        <View style={{marginTop : 50}}>
            <Button title={"Sign in"} action={this.onClickSignIn}/>
            <Button title={"Sign up"} action={this.onClickSignUp}/>
        </View>
      </View>
    );
  }

  onClickSignIn = () => {
    this.props.navigation.navigate('SignIn');
  }

  onClickSignUp = () => {
    this.props.navigation.navigate('SignUp')
  }

}

AuthScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    padding: 20,
    backgroundColor: '#2f95dc',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 60,
    color:'#184b6c'

  }
});

export default AuthScreen;