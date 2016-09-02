import {STOMP_API_SUCCESS, STOMP_API_ERROR} from '../constants/StompApiConstants';
import BaseStore from './BaseStore';

class StompApiStore extends BaseStore {

	constructor() {
		super();
		this.subscribe(() => this._registerToActions.bind(this))
		this._data = null;
		this._error = null;
	}

	_registerToActions(action) {
		switch(action.actionType) {
			case STOMP_API_SUCCESS:
				this._data = action.data;
				this.emitChange();
				break;
			case STOMP_API_ERROR:
				this._error = action.error;
				this.emitChange();
				break;
			default:
				break;
		};
	}

	get data() {
		return this._data;
	}

	get error() {
		return this._error;
	}

	hasData() {
		return !!this._data;
	}
}

export default new StompApiStore();