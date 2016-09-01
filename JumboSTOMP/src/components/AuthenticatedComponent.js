
import React from 'react';
import LoginStore from '../stores/LoginStore';
import {AlertIOS} from 'react-native';
import LoginActions from '../actions/LoginActions';

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      if (!this.state.userLoggedIn) {
          LoginActions.logoutUser()
      }
    }

    constructor() {
      super()
      this.state = this._getLoginState();
    }

    _getLoginState() {
      return {
        userLoggedIn: LoginStore.isLoggedIn(),
        user: LoginStore.user,
        jwt: LoginStore.jwt
      };
    }

    componentDidMount() {
      this.changeListener = this._onChange.bind(this);
      LoginStore.addChangeListener(this.changeListener);
    }

    _onChange() {
      this.setState(this._getLoginState());
    }

    componentWillUnmount() {
      LoginStore.removeChangeListener(this.changeListener);
    }


    render() {
      return (
          <ComposedComponent
            {...this.props}
            user={this.state.user}
            jwt={this.state.jwt}
            userLoggedIn={this.state.userLoggedIn} />
      );
    }
  }
};