'use strict';

import React, { Component } from 'react';
import {
 	StyleSheet,
  	Text,
  	View
} from 'react-native';
import Button from 'react-native-button';

import {Actions} from 'react-native-router-flux';

import AuthService from '../services/AuthService';
import StompApiService from '../services/StompApiService';

import {USER_PERMISSIONS_URL} from '../constants/StompApiConstants';
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


export default AuthenticatedComponent(class AccountPage extends Component {

	constructor() {
		super()
		this.state = {
			api : this._getStompApiDataState()
	  	}
	}

	_getStompApiDataState() {
	 	return {
			data: StompApiStore.data
	  	};
	}

	//All loads
	componentWillMount() {
	  	this.changeStompApiDataListener = this._onStompApiDataChange.bind(this);
	  	StompApiStore.addChangeListener(this.changeStompApiDataListener);

	  	var url = this.props.serverName + USER_PERMISSIONS_URL;
	  	//StompApiService.submitGet(this.props.serverName + USER_PERMISSIONS_URL, this.props.jwt);
	  	//StompApiService.getUserPermission(this.props.jwt);
	}

	_onStompApiDataChange() {
	  	this.setState({api : this._getStompApiDataState()});
	}

	componentWillUnmount() {
	  	StompApiStore.removeChangeListener(this.changeStompApiDataListener);
	}

  	render() {
		return (
	  		<View style={styles.container}>
				<Text style={styles.description}>
		  			My account page. {this.state.api.data} {this.props.serverName}
				</Text>
		 		<Button onPress={AuthService.logoutUser}>Logout</Button>
				<Text style={styles.description}>
		 			Search by place-name, postcode or search near your location.
				</Text>
		  	</View>
		);
  	}
});