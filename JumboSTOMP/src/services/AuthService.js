import LoginConstants from '../constants/LoginConstants';
import LoginActions from '../actions/LoginActions';
import {AlertIOS, AsyncStorage} from 'react-native';

class AuthService {

	async _onValueChange(item, selectedValue) {
		try {
			await AsyncStorage.setItem(item, selectedValue);
		} catch (error) {}
	}

	async _removeLocalStorage(item) {
		try {
			await AsyncStorage.removeItem(item);
		} catch (error) {}
	}

	async _getLocalStorage(item) {
		try {
			return AsyncStorage.getItem(item);
		} catch (error) {
			return "error";
			AlertIOS.alert("Local Storage error", error)
		}
	}


	login(values, postSubmit) {
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Accept', 'application/json');

		var postData = new FormData();
		postData.append( "username", values.username );
		postData.append( "password", values.password );

		return fetch(LoginConstants.LOGIN_URL, {
				method: "POST",
				mode:'cors',
				headers: myHeaders,
				body: postData
			})
			.then((response) => {return response.json()})
			.then((responseData) => {
				if(responseData.error) {  //Api returned an error
					LoginActions.loginError("LoginError", responseData.error)

					//AlertIOS.alert("Login Error", responseData.error)
					return false;
				} else { //Successful login
		
					//Use later for automattically loggin in user if token is available
					
					//this._onValueChange(LoginConstants.STOMP_JWT, responseData.stomp_jwt),
					//this._onValueChange(LoginConstants.STOMP_USER, responseData.stomp_user),
					//this._onValueChange(LoginConstants.STOMP_SERVER, responseData.stomp_serverName),
					
	  				console.log("user logged in")
					LoginActions.loginUser(responseData);
					return true;
				}
			})
			.catch((error) => {
				LoginActions.loginError("Connection Error", error.message)
				//AlertIOS.alert("Connection Error", error.message)
				return false;
			})
			.done(() => {
				postSubmit();

			});
	}

	logout() {
		LoginActions.logoutUser();
	}
}

export default new AuthService()