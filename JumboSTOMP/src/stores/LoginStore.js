import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants';
import BaseStore from './BaseStore';

class LoginStore extends BaseStore {

 	constructor() {
		super();
		this.subscribe(() => this._registerToActions.bind(this))
		this._user = null;
		this._jwt = null;
		this._serverName = null;
  	}

  	_registerToActions(action) {
		switch(action.actionType) {
	  		case LOGIN_USER:
				this._jwt = action.jwt;
				this._user = action.user;
				this._serverName = action.serverName;
				this.emitChange();
				break;
	  		case LOGOUT_USER:
				this._user = null;
				this._jwt = null;
				this._serverName = null;
				this.emitChange();
				break;
	  		default:
				break;
		};
  	}

  	get user() {
		return this._user;
  	}

  	get jwt() {
		return this._jwt;
  	}

  	get serverName() {
		return this._serverName;
  	}

  	isLoggedIn() {
		return !!this._jwt;
  	}

  	getJwt() {
  		return this._jwt;
  	}
}

export default new LoginStore();