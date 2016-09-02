
import StompApiConstants from '../constants/StompApiConstants';
import StompApiActions from '../actions/StompApiActions';
import {AlertIOS, AsyncStorage} from 'react-native';


class StompApiService {

	submitPost(endpoint, postData, jwt) {

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Authorization', jwt);

        return fetch(endpoint, {
                method: "POST",
                mode:'cors',
                headers: myHeaders,
                body: postData
            })
            .then((response) => {return response.json()})
            .then((responseData) => {
                if(responseData.error) {  //Api returned an error  
                    StompApiActions.ApiRequestError("Api Error", responseData.data);
                    return false;
                } else { //Successful api call
                    StompApiActions.ApiRequestSuccess(responseData.data);
                    return true;
                }
            })
            .catch((error) => {
                AlertIOS.alert("Connection Error", error.message)
                StompApiActions.ApiRequestError("Connection Error", responseData.data);
                return false;
            })
            .done();
    }

    submitGet(endpoint, jwt) {

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Authorization', jwt);

        return fetch(endpoint, {
                method: "GET",
                mode:'cors',
                headers: myHeaders
            })
            .then((response) => {return response.json()})
            .then((responseData) => {
                if(responseData.error) {  //Api returned an error
                    AlertIOS.alert("Api Error", responseData.error)
                    return false;
                } else { //Successful api call
                    //AlertIOS.alert("Success", responseData.data)
                    StompApiActions.ApiRequestSuccess(responseData.data);
                    return true;
                }
            })
            .catch((error) => {
                AlertIOS.alert("Connection Error", error.message)
                return false;
            })
            .done();
    }

    getUserPermission(jwt) {
        /*"http://stomp.api.local" + StompApiConstants.USER_PERMISSIONS_URL*/
        submitGet("http://stomp.api.local/Stomp/user/permissions", jwt);
        
    }

}

export default new StompApiService()