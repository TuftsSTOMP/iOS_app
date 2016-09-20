import MaterialCartConstants from '../constants/MaterialCartConstants';
import BaseStore from './BaseStore';
import _ from 'underscore';

class MaterialCartStore extends BaseStore {

	constructor() {
		console.log("material cart store created")
		super();
		this.subscribe(() => this._registerToActions.bind(this))
		this._cart = {};
	}

	_registerToActions(action) {
		console.log("material cart store ACTION: ", action.actionType)
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
			default:
				console.log("invalid action in material cart store", action.actionType)
				break;
		};
	}

	getCart() {
		return this._cart;
	}

	hasMaterial(materialName) {
		return !!this._cart[materialName];
	}

	getMaterial(materialName) {
		return this._cart[materialName];
	}

}

export default new MaterialCartStore();