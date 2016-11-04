/*
 *	AuthService.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 10-04-2016
 *
 *	Class to handle Authentication service (user login and logout)
 */
 
'use strict';

import LoginConstants from '../constants/LoginConstants';
import LoginActions from '../actions/LoginActions';

const LOGIN_TIMEOUT = 7000; //Milliseconds before timeout

class AuthService {
	/*
	 * Attempt to login given a username and password
	 */
	login(values, postSubmit) {
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Accept', 'application/json');

		var postData = new FormData();
		postData.append( "username", values.username );
		postData.append( "password", values.password );

		var timeoutId = setTimeout(function () {
			postSubmit();
			LoginActions.loginError("Connection Error", 
				"The operation timed out, contact an administrator immediately");
		}, LOGIN_TIMEOUT);

		return fetch(LoginConstants.LOGIN_URL, {
				method: "POST",
				mode:'cors',
				headers: myHeaders,
				body: postData
			})
			.then((response) => { 			//Received response from server
				clearTimeout(timeoutId);
				return response.json()
			})
			.then((responseData) => {
				if(responseData.error) { 	//Api returned an error
					LoginActions.loginError("LoginError", responseData.error);
					return false;
				} else { 					//Successful login
					LoginActions.loginUser(responseData);
					return true;
				}
			})
			.catch((error) => {
				LoginActions.loginError("Connection Error", error.message)
				return false;
			})
			.done(() => {
				postSubmit();

			});
	}

	/*
	 * Logout the user
	 */
	logout() {
		LoginActions.logoutUser();
	}
}

export default new AuthService()