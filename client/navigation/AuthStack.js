import React from 'react';
import { createStackNavigator } from 'react-navigation';

import AuthScreen from '../screens/Auth/AuthScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';

const AuthStack = createStackNavigator({ AuthScreen: AuthScreen, SignIn: SignInScreen, SignUp: SignUpScreen });

export default AuthStack;