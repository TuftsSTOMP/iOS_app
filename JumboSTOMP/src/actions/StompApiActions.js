import {Actions} from 'react-native-router-flux';
import {AlertIOS} from 'react-native';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import StompApiConstants from '../constants/StompApiConstants';
import MaterialCartConstants from '../constants/MaterialCartConstants';
import MaterialCartActions from './MaterialCartActions';
import LoginStore from '../stores/LoginStore';
import StompApiStore from '../stores/StompApiStore';

import _ from 'underscore';

export default {
	ApiGenericRequestSuccess: (data) => {
	
		console.log("Api generic request success", data);
		AlertIOS.alert("Successful Api Call", data);
	},

	ApiRequestSuccess: (data) => {
	
		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_SUCCESS,
			data: data
		});
	},

	ApiUserDetailsRequestSuccess: (data) => {
		
		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_USER_DETAILS_SUCCESS,
			data: data
		});
	},

	ApiMaterialListRequestSuccess: (data) => {

		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_MATERIAL_LIST_SUCCESS,
			data: data
		});
	},

	ApiMaterialDetailRequestSuccess: (data) => {

		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_MATERIAL_DETAIL_SUCCESS,
			data: data
		});
	},

	ApiCheckinListRequestSuccess: (data) => {

		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_CHECKIN_LIST_REQUEST_SUCCESS,
			data: data
		});

		//Load CheckIn list by incrementally calling ChangeQuantity
		data = JSON.parse(data);
		if (data.length == 0) {
			AppDispatcher.dispatch({
				actionType: MaterialCartConstants.REMOVE_CHECKIN_ALL,
			});
		} else {
  			for (var i = 0; i < data.length; ++i) {
  				MaterialCartActions.AddCheckInItemWithMaxQuantity(data[i].name, data[i].quantity, data[i].quantity, data[i].transaction_date);
    		}
    	}
	},

	ApiUserUpdateSuccess: (data) => {
		Actions.AccountPage();
	},

	ApiRequestError: (title, error) => {
	
		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_ERROR,
			error: error
		});

		AlertIOS.alert(title, error);
	}
}