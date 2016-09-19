
import StompApiConstants from '../constants/StompApiConstants';
import StompApiActions from '../actions/StompApiActions';
import {AlertIOS, AsyncStorage} from 'react-native';


export default {

	submitPost(endpoint, postData, jwt, cbAction) {

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
                    cbAction(responseData.data);
                }
            })
            .catch((error) => {
                StompApiActions.ApiRequestError("Connection Error", error.message);
            })
            .done();
    },

    submitGet(endpoint, jwt, cbAction) {

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
                    cbAction(responseData.data);
                }
            })
            .catch((error) => {
                StompApiActions.ApiRequestError("Connection Error", error.message);
            })
            .done();
    },

    getUserPermission(serverName, jwt) {
        this.submitGet(serverName + StompApiConstants.USER_PERMISSIONS_URL, 
                        jwt, 
                        StompApiActions.ApiRequestSuccess);  
    },

    getFullMaterialList(serverName, jwt) {
        this.submitGet(serverName + StompApiConstants.MATERIAL_GET_ALL_URL, 
                        jwt, 
                        StompApiActions.ApiMaterialListRequestSuccess);  
    },

    getMaterialDetailPage(serverName, jwt, materialName) {
        var url = (StompApiConstants.MATERIAL_INFO_URL).replace(/%.*%/, materialName);
        console.log(url);

        this.submitGet(serverName + url, 
                        jwt, 
                        StompApiActions.ApiMaterialDetailRequestSuccess);
    }

}
