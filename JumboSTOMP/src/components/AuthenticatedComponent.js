import React, {Component} from 'react';
import LoginStore from '../stores/LoginStore';
import StompApiStore from '../stores/StompApiStore';
import {AlertIOS, AsyncStorage} from 'react-native';
import LoginActions from '../actions/LoginActions';

export default (ComposedComponent) => {
	return class AuthenticatedComponent extends Component {

		constructor() {
	  		super()
	  		this.state = {
				user : this._getLoginState()
	  		}
		}

		componentWillMount() {
	  		if (!this.state.user.userLoggedIn) {
		  		LoginActions.logoutUser()
	  		}
		}

		_getLoginState() {
	  		return {
				userLoggedIn: LoginStore.isLoggedIn(),
				userType: LoginStore.user,
				jwt: LoginStore.jwt,
				serverName: LoginStore.serverName,
	  		};
		}

		//First load
		componentDidMount() {}

		//All loads
		componentWillMount() {
	 		this.changeLoginListener = this._onLoginChange.bind(this);
	 	 	LoginStore.addChangeListener(this.changeLoginListener);
		}

		_onLoginChange() {
	 		this.setState({user : this._getLoginState()});
		}


		componentWillUnmount() {
	  		LoginStore.removeChangeListener(this.changeLoginListener);
		}

		render() {
	  		return (
		  		<ComposedComponent
					{...this.props}
					serverName={this.state.user.serverName}
					user={this.state.user.userType}
					jwt={this.state.user.jwt}
					userLoggedIn={this.state.user.userLoggedIn} />
	  		);
		}
  	}
};