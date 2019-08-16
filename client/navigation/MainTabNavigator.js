import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ChatScreen from '../screens/Main/ChatScreen';
import SettingsScreen from '../screens/Main/SettingsScreen';

import TeacherHomeScreen from '../screens/Main/TeacherHomeScreen/TeacherHomeScreen';
import FormCreationScreen from '../screens/Main/TeacherHomeScreen/FormCreationScreen';

import StudentHomeScreen from '../screens/Main/StudentHomeScreen/StudentHomeScreen';
import FormAnsweringScreen from '../screens/Main/StudentHomeScreen/FormAnsweringScreen';

const HomeStack = createStackNavigator({
  TeacherHomeScreen: TeacherHomeScreen,
  FormCreationScreen: FormCreationScreen,
  StudentHomeScreen: StudentHomeScreen,
  FormAnsweringScreen: FormAnsweringScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const ChatStack = createStackNavigator({
  Chat: ChatScreen,
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ChatStack,
  SettingsStack,
});