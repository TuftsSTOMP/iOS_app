var BASE_URL = 'http://stomp.api.local';
export default {
  CHECKOUT_RESERVE_URL: '/Stomp/checkout/reserve',
  CHECKOUT_REMOVE_URL: '/Stomp/checkout/remove',

  CHECKIN_URL: '/Stomp/checkIn',

  TEAM_RESERVATION_LIST_URL: '/Stomp/team/reservationList',
  TEAM_CHECKED_OUT_LIST_URL: '/Stomp/team/checkedoutList',
  TEAM_RESERVATION_TOTAL_URL: '/Stomp/team/reservationTotal',
  TEAM_CHECKED_OUT_TOTAL_URL: '/Stomp/team/checkedoutTotal',
			
  MATERIAL_INFO_URL: '/Stomp/material/%material%/info',
  MATERIAL_TRANSACTION_TOTAL_URL: '/Stomp/material/%material%/transactionTotal',
  MATERIAL_GET_ALL_URL: '/Stomp/getAllMaterials',

  USER_PERMISSIONS_URL: '/Stomp/user/permissions',
  USER_API_VERSION_URL: '/Stomp/user/version'
}