import {Actions} from 'react-native-router-flux';
import {AlertIOS} from 'react-native';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {STOMP_API_SUCCESS, STOMP_API_ERROR} from '../constants/StompApiConstants';

export default {
	ApiRequestSuccess: (data) => {
	
		AppDispatcher.dispatch({
			actionType: STOMP_API_SUCCESS,
			data: data
		});

		AlertIOS.alert("Api Success", data);
	},

	ApiRequestError: (title, error) => {
	
		AppDispatcher.dispatch({
			actionType: STOMP_API_ERROR,
			error: error
		});

		AlertIOS.alert(title, error);
	}
}