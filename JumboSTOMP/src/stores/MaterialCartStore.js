import MaterialCartConstants from '../constants/MaterialCartConstants';
import BaseStore from './BaseStore';
import _ from 'underscore';

class MaterialCartStore extends BaseStore {

	constructor() {
		console.log("material cart store created")
		super();
		this.subscribe(() => this._registerToActions.bind(this))
		this._cart = {};
		this._CheckInCart = {};
	}

	_registerToActions(action) {
		switch(action.actionType) {
			case MaterialCartConstants.ADD_ITEM:
  				this._cart[action.materialName] = _.extend({}, this._cart[action.materialName], action.update);
				this.emitChange();
				break;
			case MaterialCartConstants.REMOVE_ITEM:
				delete this._cart[action.materialName];
				this.emitChange();
				break;
			case MaterialCartConstants.REMOVE_ALL:
				this._cart = {};
				this.emitChange();
				break;
			case MaterialCartConstants.UPDATE_CHECKIN_QUANTITY:
				this._CheckInCart[action.materialName] = _.extend({}, this._cart[action.materialName], action.update);
				break; //need to call REFRESH in MaterialCartACtions method
			case MaterialCartConstants.REMOVE_CHECKIN_ITEM:
				delete this._CheckInCart[action.materialName];
				this.emitChange();
				break;
			case MaterialCartConstants.REMOVE_CHECKIN_ALL:
				this._CheckInCart = {};
				this.emitChange();
				break;
			case MaterialCartConstants.REFRESH:
				this.emitChange();
				break;
			default:
				break;
		};
	}

	//CHECK OUT CART
	getCart() {
		return this._cart;
	}

	hasMaterial(materialName) {
		return !!this._cart[materialName];
	}

	getMaterial(materialName) {
		return this._cart[materialName];
	}

	//CHECK IN CART
	getCheckInCart() {
		return this._CheckInCart;
	}

	checkInHasMaterial(materialName) {
		return !!this._CheckInCart[materialName];
	}

	checkInGetMaterial(materialName) {
		return this._CheckInCart[materialName];
	}

}

export default new MaterialCartStore();