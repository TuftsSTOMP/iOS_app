import {Actions} from 'react-native-router-flux';
import {AlertIOS} from 'react-native';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import MaterialCartConstants from '../constants/MaterialCartConstants';
import MaterialCartStore from '../stores/MaterialCartStore';

export default {
	AddItem: (materialName, quantity) => {
	
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
	},

	SuccessfulCartCheckout: (data) => {
	
		AppDispatcher.dispatch({
			actionType: MaterialCartConstants.REMOVE_ALL,
		});

		AlertIOS.alert("Successful Checkout", "Your transaction has been completed");
	}
}