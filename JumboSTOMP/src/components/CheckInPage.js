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
  AlertIOS
} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';

import StompApiService from '../services/StompApiService';

import StompApiConstants from '../constants/StompApiConstants';
import AuthenticatedComponent from './AuthenticatedComponent';

import StompApiStore from '../stores/StompApiStore';


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
  constructor(props) {
    super(props)
    this.state = {
      user_permissions : this._getStompApiDataState()
    }

      this.changeStompApiDataListener = this._onStompApiDataChange.bind(this);
  }

/*
  componentWillReceiveProps() {
    this.setState({jwt : this.props.jwt});
  }
  */

  _getStompApiDataState() {
    return {
      data: StompApiStore.data
      };
  }


  componentDidMount() {
      StompApiStore.addChangeListener(this.changeStompApiDataListener);
      //StompApiService.submitGet(this.props.serverName + StompApiConstants.USER_PERMISSIONS_URL, this.props.jwt)
  }

  _onStompApiDataChange() {
      this.setState({user_permissions : this._getStompApiDataState()});
  }

  componentWillUnmount() {
      StompApiStore.removeChangeListener(this.changeStompApiDataListener);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
         Check in page
         **{this.state.user_permissions.data} **
         **{this.props.jwt}**
        </Text>
      </View>
    );
  }
});