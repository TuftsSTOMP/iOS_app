import React, {Component} from 'react';
import LoginStore from '../stores/LoginStore';
import StompApiStore from '../stores/StompApiStore';
import {AlertIOS, AsyncStorage} from 'react-native';
import LoginActions from '../actions/LoginActions';

export default (ComposedComponent) => {
	return class AuthenticatedComponent extends Component {

		constructor(props) {
	  		super(props)
	  		this.state = {
				user : this._getLoginState()
	  		}
	  		this.changeLoginListener = this._onLoginChange.bind(this);
		}

		componentWillMount() {
			if (!LoginStore.isLoggedIn()) {
		  		LoginActions.logoutUser()
	  		}

	  		LoginStore.addChangeListener(this.changeLoginListener);
		}
	
		_getLoginState() {
	  		return {
				userLoggedIn: LoginStore.isLoggedIn(),
				userType: LoginStore.getUser(),
				jwt: LoginStore.getJwt(),
				serverName: LoginStore.getServerName(),
	  		};
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