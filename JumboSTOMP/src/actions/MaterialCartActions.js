import {Actions} from 'react-native-router-flux';
import {AlertIOS} from 'react-native';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import MaterialCartConstants from '../constants/MaterialCartConstants';
import StompApiConstants from '../constants/StompApiConstants';
import MaterialCartStore from '../stores/MaterialCartStore';

export default {
	AddItem: (materialName, quantity, maxQuantity) => {
	
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
	}
}