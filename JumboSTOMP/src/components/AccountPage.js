'use strict';

import React, { Component } from 'react';
import {
 	StyleSheet,
  	Text,
  	View,
  	AlertIOS
} from 'react-native';
import Button from 'react-native-button';

import {Actions} from 'react-native-router-flux';

import AuthService from '../services/AuthService';
import StompApiService from '../services/StompApiService';

import StompApiConstants from '../constants/StompApiConstants';
import LoginConstants from '../constants/LoginConstants';
import AuthenticatedComponent from './AuthenticatedComponent';

import StompApiStore from '../stores/StompApiStore';
import LoginStore from '../stores/LoginStore';

import MaterialListPage from './MaterialListPage';


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
			data: StompApiStore.getData()
	  
	  	};
	}


	componentWillMount() {
	  	StompApiStore.addChangeListener(this.changeStompApiDataListener);
	}

	componentDidMount() {
		StompApiService.getUserPermission(this.props.serverName, this.props.jwt);
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
		  			My account page. 
		  			**{this.props.serverName}**
		  			**{this.state.user_permissions.data}**
		  			
				</Text>
				<Button onPress={AuthService.logout}>Logout</Button>
	
				<Text style={styles.description}>
		 			Search by place-name, postcode or search near your location.
				</Text>
		  	</View>
		);
  	}
});