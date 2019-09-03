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
import CourseCreationScreen from '../screens/Main/TeacherHomeScreen/CourseCreationScreen';
import GroupCreationScreen from '../screens/Main/TeacherHomeScreen/GroupCreationScreen';

import StudentHomeScreen from '../screens/Main/StudentHomeScreen/StudentHomeScreen';
import FormAnsweringScreen from '../screens/Main/StudentHomeScreen/FormAnsweringScreen';

import ForumScreen from '../screens/Main/Forum/ForumScreen';
import TopicScreen from '../screens/Main/Forum/TopicScreen';
import CreateTopicScreen from '../screens/Main/Forum/CreateTopicsScreen';

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

const ForumStack = createStackNavigator({
  Forum: ForumScreen,
  Topic: TopicScreen,
  CreateTopic: CreateTopicScreen
});

ForumStack.navigationOptions = {
  tabBarLabel: 'Forum',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  CourseCreationScreen: CourseCreationScreen,
  GroupCreationScreen: GroupCreationScreen,
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
  ForumStack,
  SettingsStack,
});