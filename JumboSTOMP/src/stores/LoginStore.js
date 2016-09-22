import LoginConstants from '../constants/LoginConstants';
import BaseStore from './BaseStore';

class LoginStore extends BaseStore {

 	constructor() {
 		console.log("login store created")
		super();
		this.subscribe(() => this._registerToActions.bind(this))
		this._user = null;
		this._jwt = null;
		this._serverName = null;
  	}

  	_registerToActions(action) {
		switch(action.actionType) {
	  		case LoginConstants.LOGIN_USER:
	  			console.log("login store LOGIN USER: ", action)
				this._jwt = action.jwt;
				this._user = action.user;
				this._serverName = action.serverName;
				this.emitChange();
				break;
	  		case LoginConstants.LOGOUT_USER:
	  			console.log("login store LOGOUT USER: ", action)
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