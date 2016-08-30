/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text
} from 'react-native';


import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomNavBar from './src/navigation/CustomNavBar';

import LoginPage from './src/LoginPage';
import MyAccount from './src/MyAccount';


class JumboSTOMP extends Component {
  logoutUser(i) {
        console.log('You clicked');
  }
  render() {
    return (
      <ScrollableTabView>
        <LoginPage tabLabel="React" />
        <MyAccount tabLabel="MyAccount" />
        <LoginPage tabLabel="Jest" />
        <Text tabLabel="Logout" onClick={this.logoutUser.bind(this)}></Text>
      </ScrollableTabView>
    );
  }
}

AppRegistry.registerComponent('JumboSTOMP', () => JumboSTOMP);