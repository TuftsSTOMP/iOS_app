
import StompApiConstants from '../constants/StompApiConstants';
import StompApiActions from '../actions/StompApiActions';
import {AlertIOS, AsyncStorage} from 'react-native';


class StompApiService {

    getUserPermission(jwt) {
        /*"http://stomp.api.local" + StompApiConstants.USER_PERMISSIONS_URL*/
        StompApiActions.submitGet("http://stomp.api.local/Stomp/user/permissions", jwt);
        
    }

}

export default new StompApiService()