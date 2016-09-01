'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image
} from 'react-native';
import Button from 'react-native-button';
import AuthenticatedComponent from './AuthenticatedComponent';
import {Actions} from 'react-native-router-flux';


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


export default AuthenticatedComponent(class CheckInPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
         Check in page
        </Text>
      </View>
    );
  }
});