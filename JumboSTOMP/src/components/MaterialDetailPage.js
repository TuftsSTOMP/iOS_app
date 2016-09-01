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
import AuthenticatedComponent from './AuthenticatedComponent';
import Button from 'react-native-button';
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


export default AuthenticatedComponent(class MaterialDetailPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
         MaterialDetailPage
        </Text>
        <Button onPress={Actions.pop}>Back</Button>
      </View>
    );
  }
});