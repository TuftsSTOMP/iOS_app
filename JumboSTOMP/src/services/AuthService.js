
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
                    AlertIOS.alert("Login Error", responseData.error)
                    return false;
                } else { //Successful login
        
                    this._onValueChange(LoginConstants.STOMP_JWT, responseData.stomp_jwt),
                    this._onValueChange(LoginConstants.STOMP_USER, responseData.stomp_user),
                    this._onValueChange(LoginConstants.STOMP_SERVER, responseData.stomp_serverName),
      
                    LoginActions.loginUser(responseData.stomp_jwt, responseData.stomp_user);
                    return true;
                }
            })
            .catch((error) => {
                AlertIOS.alert("Connection Error", error.message)
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