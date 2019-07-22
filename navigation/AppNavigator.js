import React from "react";
import { createAppContainer, createSwitchNavigator, createStackNavigator } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import LoadingScreen from "../screens/LoadingScreen";
import MainTabNavigator from "./MainTabNavigator";
import ScanScreen from '../screens/ScanScreen';
import TestScreen from '../screens/TestScreen';


const HomeStack = createStackNavigator(
  {
    MainScreen: {
      screen: MainTabNavigator,
      navigationOptions: {}
    },
    ScanScreen: {
      screen: ScanScreen,
      navigationOptions: {}
    },
    TestScreen: {
      screen: TestScreen,
      navigationOptions: {}
    }
  }
)

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      Login: LoginScreen,
      Dashboard: HomeStack
    }
  )
);
