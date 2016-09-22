'use strict';

import React, { Component } from 'react';
import {
 	StyleSheet,
  	View,
  	AlertIOS
} from 'react-native';
import { 
	Container, 
	Content, 
	Text,
	List,
	ListItem,
	Header,
	Button,
	Spinner,
	Icon,
	Title
} from 'native-base';

//import Button from 'react-native-button';
import Theme from '../themes/version1';

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
		marginTop: 15,
		alignItems: 'center'
  	}
});


export default AuthenticatedComponent(class AccountPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			user_permissions : this._getStompApiDataState(),
			loading : true,
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

	  	this.setState({loading : false});
	}

	componentWillUnmount() {
	  	StompApiStore.removeChangeListener(this.changeStompApiDataListener);
	}



  	render() {
		return (
			<Container theme={Theme}>

				<Header> 
                	<Title>My Account</Title>
				</Header>

				<Content>
				{ this.state.loading ? <Spinner/> :
	  				<View style={styles.container}>
	  					<Text style={styles.description}>
		 					Interact with the supply closet from your fingertips!
						</Text>
						<Text style={styles.description}>
		 					Additional features coming soon...
						</Text>
						<Text style={styles.description}>
		 					For any questions or to report an issue, Contact Sam Heilbron at samheilbron@gmail.com
						</Text>
						<Button block danger onPress={AuthService.logout}>Logout</Button>
		  			</View>
		  		}
		  		</Content>
		  	</Container>
		);
  	}
});