/*
 *  StompApiConstants.js
 *
 *  Author: Sam Heilbron
 *  Last Updated: 10-04-2016
 *
 *  Constants for Stomp Api Actions
 */
export default {
  	STOMP_API_SUCCESS: 'STOMP_API_SUCCESS',
    STOMP_API_MATERIAL_LIST_SUCCESS: 'STOMP_API_MATERIAL_LIST_SUCCESS',
    STOMP_API_MATERIAL_LIST_TOGGLE_SELECTED: 'STOMP_API_MATERIAL_LIST_TOGGLE_SELECTED',
    STOMP_API_MATERIAL_DETAIL_SUCCESS: 'STOMP_API_MATERIAL_DETAIL_SUCCESS',
    STOMP_API_CHECKIN_LIST_REQUEST_SUCCESS: 'STOMP_API_CHECKIN_LIST_REQUEST_SUCCESS',
    STOMP_API_USER_DETAILS_SUCCESS: 'STOMP_API_USER_DETAILS_SUCCESS',
  	STOMP_API_ERROR: 'STOMP_API_ERROR',

  	CHECKOUT_RESERVE_URL: '/Stomp/checkout/reserve',
  	CHECKOUT_REMOVE_URL: '/Stomp/checkout/remove',

  	CHECKIN_URL: '/Stomp/checkIn',

  	TEAM_RESERVATION_LIST_URL: '/Stomp/team/reservationList',
  	TEAM_CHECKED_OUT_LIST_URL: '/Stomp/team/checkedoutList',
  	TEAM_RESERVATION_TOTAL_URL: '/Stomp/team/reservationTotal',
  	TEAM_CHECKED_OUT_TOTAL_URL: '/Stomp/team/checkedoutTotal',
			
  	MATERIAL_INFO_URL: '/Stomp/material/%material%/info',
  	MATERIAL_TRANSACTION_TOTAL_URL: '/Stomp/material/%material%/transactionTotal',
  	MATERIAL_GET_ALL_URL: '/Stomp/getFullMaterialList',

  	USER_PERMISSIONS_URL: '/Stomp/user/permissions',
  	USER_API_VERSION_URL: '/Stomp/user/version',
    USER_DETAILS_URL: '/Stomp/user/details',
    USER_UPDATE_URL: '/Stomp/updateUser'
}