
import StompApiConstants from '../constants/StompApiConstants';
import StompApiActions from '../actions/StompApiActions';
import {AlertIOS, AsyncStorage} from 'react-native';


class StompApiService {

	submitPost(endpoint, postData, jwt) {

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Authorization', jwt);

        fetch(endpoint, {
                method: "POST",
                mode:'cors',
                headers: myHeaders,
                body: postData
            })
            .then((response) => {return response.json()})
            .then((responseData) => {
                if(responseData.error) {  //Api returned an error  
                    StompApiActions.ApiRequestError("Api Error", responseData.error);
                    
                } else { //Successful api call
                    StompApiActions.ApiRequestSuccess(responseData.data);
                }
            })
            .catch((error) => {
                StompApiActions.ApiRequestError("Connection Error", error.message);
            })
            .done();
    }

    submitGet(endpoint, jwt) {

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Authorization', jwt);

        fetch(endpoint, {
                method: "GET",
                mode:'cors',
                headers: myHeaders
            })
            .then((response) => {return response.json()})
            .then((responseData) => {
                if(responseData.error) {  //Api returned an error  
                    StompApiActions.ApiRequestError("Api Error", responseData.error);
                    
                } else { //Successful api call
                    StompApiActions.ApiRequestSuccess(responseData.data);
                }
            })
            .catch((error) => {
                StompApiActions.ApiRequestError("Connection Error", error.message);
            })
            .done();
    }

    getUserPermission(jwt) {
        /*"http://stomp.api.local" + StompApiConstants.USER_PERMISSIONS_URL*/
        submitGet("http://stomp.api.local/Stomp/user/permissions", jwt);
        
    }

}

export default new StompApiService()