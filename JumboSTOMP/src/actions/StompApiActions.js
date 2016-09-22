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

	ApiMaterialListRequestSuccess: (data) => {

		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_MATERIAL_LIST_SUCCESS,
			data: data
		});

		console.log("Api material list request success", data)
	},

	ApiMaterialDetailRequestSuccess: (data) => {

		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_MATERIAL_DETAIL_SUCCESS,
			data: data
		});

		console.log("stomp api material detail request success: ", data)
	},

	ApiCheckinListRequestSuccess: (data) => {

		console.log("stomp api material checkin List request success: ", data);

		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_CHECKIN_LIST_REQUEST_SUCCESS,
			data: data
		});

		//Load CheckIn list by incrementally calling ChangeQuantity
		data = JSON.parse(data);
  		for (var i = 0; i < data.length; ++i) {
  			MaterialCartActions.AddCheckInItemWithMaxQuantity(data[i].name, data[i].quantity, data[i].quantity, data[i].transaction_date);
    	}
	},

	ApiRequestError: (title, error) => {
	
		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_ERROR,
			error: error
		});

		AlertIOS.alert(title, error);
	}
}