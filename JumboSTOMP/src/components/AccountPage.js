'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import LoginActions from '../actions/LoginActions';
import StompApiService from '../services/StompApiService';


var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  }
});
import AuthenticatedComponent from './AuthenticatedComponent';


export default AuthenticatedComponent(class AccountPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          My account page. {this.props.jwt}
        </Text>
         <Button onPress={LoginActions.logoutUser}>Logout</Button>
         <Button onPress={StompApiService.getUserPermission.bind(this,this.props.jwt)}>Permissions</Button>
        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
        </Text>
      </View>
    );
  }
});