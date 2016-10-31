import AppDispatcher from '../dispatchers/AppDispatcher.js';
import LoginConstants from '../constants/LoginConstants.js';
import {AlertIOS} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default {
	loginUser: (loginJsonResponse) => {
	
		AppDispatcher.dispatch({
	  		actionType: LoginConstants.LOGIN_USER,
	  		jwt: loginJsonResponse.stomp_jwt,
	  		serverName: loginJsonResponse.stomp_serverName,
	  		user: loginJsonResponse.stomp_user,
		});

		Actions.AppContent()
  	},
  
  	logoutUser: () => {

		AppDispatcher.dispatch({
	  		actionType: LoginConstants.LOGOUT_USER
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