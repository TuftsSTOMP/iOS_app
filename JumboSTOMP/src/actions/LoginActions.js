import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants.js';
import {AlertIOS} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default {
	loginUser: (loginJsonResponse) => {
	
		AppDispatcher.dispatch({
	  		actionType: LOGIN_USER,
	  		jwt: loginJsonResponse.stomp_jwt,
	  		serverName: loginJsonResponse.stomp_serverName,
	  		user: loginJsonResponse.stomp_user,
		});

		Actions.HomeTabbar()
  	},
  
  	logoutUser: () => {

		AppDispatcher.dispatch({
	  		actionType: LOGOUT_USER
		});

	 	Actions.Login()
  	},

  	loginError: (title, error) => {
	
		AppDispatcher.dispatch({
	  		actionType: LOGOUT_USER,
	  		error: error
		});

		AlertIOS.alert(title, error);
	}
}