/*
 *	MaterialCartStore.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 10-04-2016
 *
 *	Store to manage Material Cart information
 */
import MaterialCartConstants from '../constants/MaterialCartConstants';
import BaseStore from './BaseStore';
import _ from 'underscore';

class MaterialCartStore extends BaseStore {
	constructor() {
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
				for (var i = 0; i < action.update.length; i++) {
					var obj = action.update[i];
					this._CheckInCart[obj.name] = _.extend({}, this._CheckInCart[obj.name], obj);
				}
				this.emitChange();
				break;
			case MaterialCartConstants.REMOVE_CHECKIN_ITEM:
				delete this._CheckInCart[action.materialName];
				this.emitChange();
				break;
			case MaterialCartConstants.REMOVE_CHECKIN_ALL:
				this._CheckInCart = {};
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

	isCheckInCartEmpty() {
		return this._CheckInCart != {};
	}
}

export default new MaterialCartStore();