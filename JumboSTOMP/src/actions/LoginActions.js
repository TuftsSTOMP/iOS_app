import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants.js';

import {Actions} from 'react-native-router-flux'

export default {
  loginUser: (jwt, userType) => {
    
    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      jwt: jwt,
      user: userType
    });

    Actions.HomeTabbar()

  },
  logoutUser: () => {

    AppDispatcher.dispatch({
      actionType: LOGOUT_USER
    });

     Actions.Login()
  }
  
}