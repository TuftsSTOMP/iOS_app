/*
 *  AuthService.js
 *
 *  Author: Sam Heilbron
 *  Last Updated: 10-04-2016
 *
 *  Class to handle Stomp Api service (all calls to API)
 */

'use strict';

import StompApiConstants from '../constants/StompApiConstants';
import StompApiActions from '../actions/StompApiActions';
import MaterialCartActions from '../actions/MaterialCartActions';

export default {
    /*
     *  Generic Post
     *  Parameters: endpoint, post data, jwt, successful callback action
     */
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

    /*
     *  Generic Get
     *  Parameters: endpoint, jwt, successful callback action
     */
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

    /***
     *** SPECIFIC CALLS TO API
     ***/
    getUserDetails(serverName, jwt) {
        this.submitGet(serverName + StompApiConstants.USER_DETAILS_URL, 
                        jwt, 
                        StompApiActions.ApiUserDetailsRequestSuccess);  
    },

    getFullMaterialList(serverName, jwt) {
        this.submitGet(serverName + StompApiConstants.MATERIAL_GET_ALL_URL, 
                        jwt, 
                        StompApiActions.ApiMaterialListRequestSuccess);  
    },

    getMaterialDetailPage(serverName, jwt, materialName) {
        var url = (StompApiConstants.MATERIAL_INFO_URL).replace(/%.*%/, materialName);
        this.submitGet(serverName + url, 
                        jwt, 
                        StompApiActions.ApiMaterialDetailRequestSuccess);
    },

    checkoutMaterial_remove(serverName, jwt, postData) {
        this.submitPost(serverName + StompApiConstants.CHECKOUT_REMOVE_URL,
                        postData,
                        jwt,
                        MaterialCartActions.SuccessfulCartCheckout);
    },

    checkinMaterial(serverName, jwt, postData) {
        this.submitPost(serverName + StompApiConstants.CHECKIN_URL,
                        postData,
                        jwt,
                        MaterialCartActions.SuccessfulCheckIn);
    },

    getMyCheckedOutTotal(serverName, jwt) {
        this.submitGet(serverName + StompApiConstants.TEAM_CHECKED_OUT_TOTAL_URL,
                        jwt,
                        StompApiActions.ApiCheckinListRequestSuccess);
    },

    updateUser(serverName, jwt, postData) {
        this.submitPost(serverName + StompApiConstants.USER_UPDATE_URL,
                        postData,
                        jwt,
                        StompApiActions.ApiUserUpdateSuccess);
    },

    guestRemoveMaterial(serverName, jwt, postData) {
        this.submitPost(serverName + StompApiConstants.GUEST_REMOVE_MATERIAL_URL,
                        postData,
                        jwt,
                        MaterialCartActions.SuccessfulCartCheckout);
    },

    guestReturnMaterial(serverName, jwt, postData) {
        this.submitPost(serverName + StompApiConstants.GUEST_RETURN_MATERIAL_URL,
                        postData,
                        jwt,
                        MaterialCartActions.SuccessfulCheckIn);
    },

}
