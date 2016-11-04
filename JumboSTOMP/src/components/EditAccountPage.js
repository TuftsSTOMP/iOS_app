/*
 *	EditAccountPage.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 10-04-2016
 *
 *	The page to handle editing a users account
 */

'use strict';

import React, { Component } from 'react';
import {
 	StyleSheet,
  	View,
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
	InputGroup,
	Input,
	Icon,
	Title
} from 'native-base';

import Theme from '../themes/version1';

import {Actions} from 'react-native-router-flux';

import AuthService from '../services/AuthService';
import StompApiService from '../services/StompApiService';

import StompApiConstants from '../constants/StompApiConstants';
import StompApiActions from '../actions/StompApiActions';
import LoginConstants from '../constants/LoginConstants';

import AuthenticatedComponent from './AuthenticatedComponent';

import StompApiStore from '../stores/StompApiStore';
import LoginStore from '../stores/LoginStore';


var styles = StyleSheet.create({
  	container: {
		padding: 30,
		marginTop: 10,
		alignItems: 'center'
  	}
});


class EditAccountPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			details : JSON.parse(StompApiStore.getUserDetails())[0],
			tempPassword : ""
	  	}
	}

	updateUserDetails(newElement) {
		var updatedDetails = Object.assign({}, this.state.details, newElement);
		this.setState({details : updatedDetails});
	}

	_submitUpdateAccount() {
		var pwd = this.state.tempPassword;
		var userDetails;

		if (pwd != "") {
			var newElement = {pwd : pwd};
			userDetails = Object.assign({}, this.state.details, newElement);
		} else {
			userDetails = this.state.details;
		}

		var postData = new FormData();
		for (var property in userDetails) {
    		if (userDetails.hasOwnProperty(property)) {
        		postData.append(property, userDetails[property]);
    		}
		}
		
		StompApiService.updateUser(this.props.serverName, this.props.jwt, postData);
	}


  	render() {
  		let user = this.state.details;
		return (
			<Container theme={Theme}>
				<Header> 
					<Button transparent onPress={Actions.pop}>
                 		<Text> Cancel </Text>
                 	</Button>
                	<Title>Edit Account</Title>
				</Header>

				<Content>
					 <List>
					 	<ListItem>
                            <InputGroup>
                                <Input inlineLabel label='FIRST NAME' 
                                	placeholder={user.f_name}
									onChangeText={(text) => this.updateUserDetails({f_name : text})}
        							value={this.state.details.f_name} />
                            </InputGroup>
                        </ListItem>

                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label='LAST NAME' 
                                	placeholder={user.l_name} 
                                	onChangeText={(text) => this.updateUserDetails({l_name : text})}
        							value={this.state.details.l_name}/>
                            </InputGroup>
                        </ListItem>

                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label='EMAIL' 
                                	placeholder={user.email} 
                                	onChangeText={(text) => this.updateUserDetails({email : text})}
        							value={this.state.details.email} />
                            </InputGroup>
                        </ListItem>

                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label='PHONE' 
                                	placeholder={user.phone} 
                                	onChangeText={(text) => this.updateUserDetails({phone : text})}
        							value={this.state.details.phone} />
                            </InputGroup>
                        </ListItem>

                        <ListItem>
                            <InputGroup borderType='rounded'>
                                <Icon name='ios-unlock' />
                                <Input placeholder='PASSWORD' 
                                	secureTextEntry={true}
                                	onChangeText={(text) => this.setState({tempPassword : text}) }/>
                            </InputGroup>
                        </ListItem>
                    </List>

                    <View style={styles.container}>
						<Button block success onPress = {this._submitUpdateAccount.bind(this)}>
							<Text> Update Account Info </Text>
						</Button>
					</View>
				</Content>
		  	</Container>
		);
  	}
}

export default AuthenticatedComponent(EditAccountPage);