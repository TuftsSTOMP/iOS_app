/*
 *	StompApiStore.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 10-04-2016
 *
 *	Store to manage info returned by Stomp Api
 */
import StompApiConstants from '../constants/StompApiConstants';
import BaseStore from './BaseStore';
import _ from 'underscore';

class StompApiStore extends BaseStore {
	constructor() {
		super();

		this.subscribe(() => this._registerToActions.bind(this))
		this._data = null;
		this._materialList = null;
		this._checkInList = null;
		this._materialDetail = null;
		this._userDetails = null;
		this._error = null;
	}

	_registerToActions(action) {
		switch(action.actionType) {
			case StompApiConstants.STOMP_API_SUCCESS:
				this._data = action.data;
				this.emitChange();
				break;
			case StompApiConstants.STOMP_API_USER_DETAILS_SUCCESS:
				this._userDetails = action.data;
				this.emitChange();
				break;
			case StompApiConstants.STOMP_API_MATERIAL_LIST_SUCCESS:
				this._materialList = action.data;
				this.emitChange();
				break;
			case StompApiConstants.STOMP_API_MATERIAL_LIST_SELECTED_TRUE:
				this._materialList[action.materialName] = _.extend({}, this._materialList[action.materialName], action.update);
				this.emitChange();
				break;
			case StompApiConstants.STOMP_API_MATERIAL_LIST_SELECTED_FALSE:
				this._materialList[action.materialName] = _.extend({}, this._materialList[action.materialName], action.update);
				this.emitChange();
				break;
			case StompApiConstants.STOMP_API_MATERIAL_LIST_TOGGLE_FALSE_ALL:
				this._materialList = this._materialList.map(function(e) {
					e.selected = 0;
				});
				this.emitChange();
				break;
			case StompApiConstants.STOMP_API_MATERIAL_DETAIL_SUCCESS:
				this._materialDetail = action.data;
				this.emitChange();
				break;
			case StompApiConstants.STOMP_API_CHECKIN_LIST_REQUEST_SUCCESS:
				this._checkInList = action.data;
				this.emitChange();
				break;
			case StompApiConstants.STOMP_API_ERROR:
				this._error = action.error;
				this.emitChange();
				break;
			default:
				break;
		};
	}

	getData() {
		return this._data;
	}

	getMaterialList() {
		return this._materialList;
	}

	getCheckinList() {
		return this._checkInList;
	}

	isCheckinListEmpty() {
		return (this._checkInList == null || JSON.parse(this._checkInList).length == 0);
	}

	getMaterialDetail() {
		return this._materialDetail;
	}

	getUserDetails() {
		return this._userDetails;
	}

	//still working on
	getUserFirstName() {
		console.log(this._userDetails)
		return ""
		//return this._userDetails.f_name;
	}

	getError() {
		return this._error;
	}

	hasData() {
		return !!this._data;
	}
}

export default new StompApiStore();