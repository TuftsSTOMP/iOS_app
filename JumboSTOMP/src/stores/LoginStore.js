/*
 *	LoginStore.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 10-04-2016
 *
 *	Store to manage Login information
 */
import LoginConstants from '../constants/LoginConstants';
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
	  		case LoginConstants.LOGIN_USER:
				this._jwt = action.jwt;
				this._user = action.user;
				this._serverName = action.serverName;
				this.emitChange();
				break;
	  		case LoginConstants.LOGOUT_USER:
				this._user = null;
				this._jwt = null;
				this._serverName = null;
				this.emitChange();
				break;
	  		default:
				break;
		};
  	}

  	getUser() {
		return this._user;
  	}

  	getJwt() {
		return this._jwt;
  	}

  	getServerName() {
		return this._serverName;
  	}

  	isLoggedIn() {
		return !!this._jwt;
  	}
}

export default new LoginStore();