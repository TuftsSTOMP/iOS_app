'use strict';

import React, {Component} from 'react';
import ReactMixin from 'react-mixin';
//import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Auth from '../services/AuthService';

import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	AlertIOS
} from 'react-native';

var styles = StyleSheet.create({
		container: {
				padding: 30,
				marginTop: 65,
				alignItems: 'center'
		},
		welcome: {
				fontSize: 28,
				textAlign: 'center',
				margin: 20,
		},
		instructions: { 
				color: 'blue',
				fontSize: 22,
				marginBottom: 5,
		},
		textEdit: {
				height: 40, 
				borderColor: 'grey', 
				backgroundColor: 'white',
				borderWidth: 1
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

				<GiftedForm
					formName='loginForm' 

					style = {{
						marginTop: 40,
					}}
					
					defaults = {{
						username:'',
						password:''
					}}
					
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
						clearButtonMode='while-editing' />


					<GiftedForm.TextInputWidget
						name='password' // mandatory
						title='Password'
						placeholder='******'
						clearButtonMode='while-editing'
						secureTextEntry={true} />

					<GiftedForm.SubmitWidget
						title='Login'
						
						onSubmit = {(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
							if (isValid === true) {
								Auth.login(values, postSubmit);
								GiftedFormManager.reset('loginForm');
							}
						}} />

					<GiftedForm.NoticeWidget
						title='By logging in, you agree to the Terms of Service of the STOMP organization.' />

				</GiftedForm> 
			);
		}
}

// We’re using the mixin `LinkStateMixin` to have two-way databinding between
//ReactMixin(Login.prototype, LinkedStateMixin);