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
	Card,
	CardItem,
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


var styles = StyleSheet.create({
 	description: {
		marginBottom: 20,
		fontSize: 18,
		textAlign: 'center',
		color: '#656565'
  	},
  	container: {
		padding: 30,
		marginTop: 10,
		alignItems: 'center'
  	}
});


export default AuthenticatedComponent(class AccountPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			details : this._getStompApiUserDetailsState(),
			loading : true,
	  	}

	  	this.changeStompApiUserDetailsListener = this._onStompApiUserDetailsChange.bind(this);
	}


	_getStompApiUserDetailsState() {
	 	return (StompApiStore.getUserDetails());
	}


	componentWillMount() {
	  	StompApiStore.addChangeListener(this.changeStompApiUserDetailsListener);
	}

	componentDidMount() {
		StompApiService.getUserDetails(this.props.serverName, this.props.jwt);
	}

	_onStompApiUserDetailsChange() {
	  	this.setState({details : JSON.parse(this._getStompApiUserDetailsState())});

	  	this.setState({loading : false});
	}

	componentWillUnmount() {
	  	StompApiStore.removeChangeListener(this.changeStompApiUserDetailsListener);
	}

	editAccount() {
		Actions.EditAccountPage();
  	}

	_renderRow(detail) {
		return (
			<View>
				<Card>
                    <CardItem>              
                        <Icon name='ios-person' />                
                        <Text> {detail.f_name} {detail.l_name} ({detail.username})</Text>
                    </CardItem>
                    <CardItem>              
                        <Icon name='ios-mail' />                
                        <Text> {detail.email}</Text>
                    </CardItem>
                    <CardItem>              
                        <Icon name='ios-call' />                
                        <Text> {detail.phone == null ? "" : detail.phone}</Text>
                    </CardItem>
                    <CardItem>              
                        <Icon name='ios-people' />                
                        <Text> {detail.userPermission.join(', ')}</Text>
                    </CardItem>
                    <CardItem>              
                        <Icon name='ios-key' />                
                        <Text> {detail.apiVersion}</Text>
                    </CardItem>
				</Card>
				<View style = {styles.container}>
					<Button block danger onPress={AuthService.logout}>Logout</Button>
				</View>
			</View>
		);
	}


  	render() {
		return (
			<Container theme={Theme}>
				<Header> 
					<Button transparent onPress = {this.editAccount.bind(this)}>
                 		<Text> Edit </Text>
                 	</Button>
                	<Title>My Account</Title>
				</Header>

				<Content>
				{this.state.loading ? <Spinner/> : 
					<List
						dataArray={this.state.details}
						renderRow = { detail => (this._renderRow(detail)) }>
					</List>
				}
				</Content>
		  	</Container>
		);
  	}
});