/*
 *	AccountPage.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 10-04-2016
 *
 *	The Account page. Access to user information. User data is loaed on login
 *	so the normal StompAPI call is not made in the componentDidMount handler
 */
'use strict';

import React, { Component } from 'react';
import {
 	StyleSheet,
  	View,
  	AlertIOS,
  	Image,
  	TouchableOpacity
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

/*
Look to refactor and add this to the AuthenticatedComponent HOC so that it isn't required
for each new component. Leave like this for now though because it works
*/
const contextTypes = {
  drawer: React.PropTypes.object,
};



class AccountPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			details : JSON.parse(this._getStompApiUserDetailsState()),
			loading : false, //See component did mount function for explanation
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
		// Load the user details immediately when the user logs in, not when they visit the page
		// This way the name is available in the nav bar
		// If the call were made on the page it would be:
		// StompApiService.getUserDetails(this.props.serverName, this.props.jwt);
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
			</View>
		);
	}

	menuClick() {
		this.context.drawer.open()
	}

  	render() {
		return (
			<Container theme={Theme}>
				<Header> 
                 	<Button transparent onPress = {this.menuClick.bind(this)}> 
                 		{this.props.navImageSrc}
                 	</Button>
					<Button transparent onPress = {this.editAccount.bind(this)}>
                 		<Text> Edit </Text>
                 	</Button>
					<Title>{this.props.title}</Title>
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
}

AccountPage.contextTypes = contextTypes;

export default AuthenticatedComponent(AccountPage);