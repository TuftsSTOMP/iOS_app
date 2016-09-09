import {Actions} from 'react-native-router-flux';
import {AlertIOS} from 'react-native';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import StompApiConstants from '../constants/StompApiConstants';
import LoginStore from '../stores/LoginStore';
import StompApiStore from '../stores/StompApiStore';

export default {
	ApiRequestSuccess: (data) => {
	
		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_SUCCESS,
			data: data
		});
	},

	ApiMaterialListRequestSuccess: (data) => {
	
		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_MATERIAL_LIST_SUCCESS,
			data: data
		});
	},

	ApiRequestError: (title, error) => {
	
		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_ERROR,
			error: error
		});

		AlertIOS.alert(title, error);
	}
}