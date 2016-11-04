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
		//Demo method
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
		//Load data into StompApiStore
		//Used to handle refresh. This is the copy of the real amount that must 
		//	be returned
		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_CHECKIN_LIST_REQUEST_SUCCESS,
			data: data
		});


		//Load data into the MaterialCartStore
		//This is so the user can return portions of their cart. Refreshing
		//	the cart will trigger a call to the StompApiStore
		jsonData = JSON.parse(data);
		if (jsonData.length == 0) {
			AppDispatcher.dispatch({
				actionType: MaterialCartConstants.REMOVE_CHECKIN_ALL,
			});
		} else {
			for (var i = 0; i < jsonData.length; ++i) {
				jsonData[i].maxQuantity = jsonData[i].quantity;
			}
			MaterialCartActions.AddCheckInList(jsonData);
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