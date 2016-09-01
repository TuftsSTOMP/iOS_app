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


export default AuthenticatedComponent(class CheckOutPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
         MaterialListPage
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
          **{this.props.userLoggedIn}**
        </Text>
      </View>
    );
  }
});