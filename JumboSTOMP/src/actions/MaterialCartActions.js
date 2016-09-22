import {Actions} from 'react-native-router-flux';
import {AlertIOS} from 'react-native';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import MaterialCartConstants from '../constants/MaterialCartConstants';
import StompApiConstants from '../constants/StompApiConstants';
import MaterialCartStore from '../stores/MaterialCartStore';

export default {
	AddItemWithMaxQuantity: (materialName, quantity, maxQuantity) => {
	
		AppDispatcher.dispatch({
			actionType: MaterialCartConstants.ADD_ITEM,
			materialName: materialName,
			update: {name: materialName, quantity: quantity, maxQuantity: maxQuantity}
		});

		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_MATERIAL_LIST_SELECTED_TRUE,
			materialName: materialName,
			update: {selected: 1}
		});
	},

	UpdateItemWithQuantity: (materialName, quantity) => {
	
		AppDispatcher.dispatch({
			actionType: MaterialCartConstants.ADD_ITEM,
			materialName: materialName,
			update: {name: materialName, quantity: quantity}
		});
	},

	RemoveItem: (materialName) => {
	
		AppDispatcher.dispatch({
			actionType: MaterialCartConstants.REMOVE_ITEM,
			materialName: materialName
		});

		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_MATERIAL_LIST_SELECTED_FALSE,
			materialName: materialName,
			update: {selected: 0}
		});
	},

	SuccessfulCartCheckout: (data) => {
	
		AppDispatcher.dispatch({
			actionType: MaterialCartConstants.REMOVE_ALL,
		});

		AppDispatcher.dispatch({
			actionType: StompApiConstants.STOMP_API_MATERIAL_LIST_TOGGLE_FALSE_ALL,
		});

		AlertIOS.alert("Successful Checkout", "Your transaction has been completed");
	},

	AddCheckInItemWithMaxQuantity: (materialName, quantity, maxQuantity, transaction_date) => {

		AppDispatcher.dispatch({
			actionType: MaterialCartConstants.UPDATE_CHECKIN_QUANTITY,
			materialName: materialName,
			update: {
				name: materialName, 
				quantity: quantity, 
				maxQuantity: maxQuantity,
				transaction_date: transaction_date
			}
		});

		//needed to help performance of AddQuantity
		// this way entire cart can be accumulated before a change is rendered
		AppDispatcher.dispatch({
			actionType: MaterialCartConstants.REFRESH
		});
	},

	UpdateCheckInItemWithQuantity: (materialName, quantity) => {

		AppDispatcher.dispatch({
			actionType: MaterialCartConstants.UPDATE_CHECKIN_QUANTITY,
			materialName: materialName,
			update: {
				name: materialName, 
				quantity: quantity
			}
		});

		AppDispatcher.dispatch({
			actionType: MaterialCartConstants.REFRESH
		});
	},

	RemoveCheckInItem: (materialName) => {

		AppDispatcher.dispatch({
			actionType: MaterialCartConstants.REMOVE_CHECKIN_ITEM,
			materialName: materialName
		});
	},

	SuccessfulCheckIn: (data) => {

		AppDispatcher.dispatch({
			actionType: MaterialCartConstants.REMOVE_CHECKIN_ALL,
		});

		AlertIOS.alert("Successful CheckIn", "Your transaction has been completed");
	}
}