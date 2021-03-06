/*
 *	LoginActions.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 10-04-2016
 *
 *	Dispatch flux actions related to Login
 */
 
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import LoginConstants from '../constants/LoginConstants.js';
import StompApiConstants from '../constants/StompApiConstants.js';
import MaterialCartConstants from '../constants/MaterialCartConstants.js';
import {AlertIOS} from 'react-native';
import {Actions} from 'react-native-router-flux';
import StompApiService from '../services/StompApiService';

export default {
	loginUser: (loginJsonResponse) => {
		AppDispatcher.dispatch({
	  		actionType: LoginConstants.LOGIN_USER,
	  		jwt: loginJsonResponse.stomp_jwt,
	  		serverName: loginJsonResponse.stomp_serverName,
	  		user: loginJsonResponse.stomp_user,
		});

		StompApiService.getUserDetails(loginJsonResponse.stomp_serverName, loginJsonResponse.stomp_jwt);

		switch(loginJsonResponse.stomp_user){
			case 'Stomper':
				Actions.StomperAppContent();
				break;
			case '_Guest':
				Actions.GuestAppContent();
				break;
			default:
				AlertIOS.alert("BROKEN LOGIN", "Invalid User Type");
		}

		//Request permission to use geolocation after 1st login
		navigator.geolocation.getCurrentPosition(
        	(position) => {},
         	(error) => AlertIOS.alert("Geolocation issue", error.message),
         	{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      	);
		
  	},
  
  	logoutUser: () => {
		AppDispatcher.dispatch({
	  		actionType: LoginConstants.LOGOUT_USER
		});

		AppDispatcher.dispatch({
			actionType: MaterialCartConstants.REMOVE_ALL,
		});

		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_MATERIAL_LIST_TOGGLE_FALSE_ALL,
		});

	 	Actions.Login()
  	},

  	loginError: (title, error) => {
		AppDispatcher.dispatch({
	  		actionType: null,
	  		error: error
		});

		AlertIOS.alert(title, error);
	}
}