/*
 *	LoginPage.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 10-04-2016
 *
 *	The Login page
 */

'use strict';

import React, {Component} from 'react';
import Auth from '../services/AuthService';
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	AlertIOS,
	Image
} from 'react-native';

var styles = StyleSheet.create({
	wrapper : {
		flex: 1,
		alignItems: 'center'
	},
	stompLogo : {

	}
});

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			password: null
		};
	}

	render() {
		return (
			<View style={styles.wrapper}>
			<Image style={styles.stompLogo} source={require('../images/stomp_logo_objects.jpg')} />

			<GiftedForm
				formName='loginForm' 

				style = {{
					marginTop: 40,
				}}
					
				defaults = {{
					username:'',
					password:''
				}}

				clearOnClose={true}
					
				validators={{
					username: {
						title: 'Username',
						validate: [{
							validator: 'isLength',
							arguments: [3, 16],
							message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
						},{
							validator: 'matches',
							arguments: /^[a-zA-Z0-9]*$/,
							message: '{TITLE} can contains only alphanumeric characters'
						}]
					},
					password: {
						title: 'Password',
						validate: [{
							validator: 'isLength',
							arguments: [5, 10],
							message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
						}]
					}
				}}
			>

				<GiftedForm.SeparatorWidget />

				<GiftedForm.TextInputWidget
					name='username'
					title='Username'
					placeholder='Tufts UTLN'
					clearButtonMode='while-editing' 
					widgetStyles={{
						row: {height: 50},
               			textInputTitle: {fontSize: 20},
               			textInput: {fontSize: 20, height: 80},
               			textInputInline: {height: 50},
               			textInputTitleInline: {fontSize: 20,  width: 125}
        			}} />

				<GiftedForm.TextInputWidget
					name='password'
					title='Password'
					placeholder='******'
					clearButtonMode='while-editing'
					secureTextEntry={true} 
					widgetStyles={{
						row: {height: 50},
              			textInputTitle: {fontSize: 20},
            			textInput: {fontSize: 20, height: 80},
            			textInputInline: {height: 50},
            			textInputTitleInline: {fontSize: 20,  width: 125}
          			}} />

				<GiftedForm.SubmitWidget
					title='Login'
					widgetStyles={{
						submitButton: {height: 50},
						textSubmitButton: {fontSize: 20}
					}}
						
					onSubmit = {(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
						if (isValid === true) {
							Auth.login(values, postSubmit);
						}
					}} />

				<GiftedForm.NoticeWidget
					title='By logging in, you agree to the Terms of Service of the STOMP organization.' />

			</GiftedForm> 
			</View>
		);
	}
}