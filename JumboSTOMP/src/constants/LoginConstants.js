/*
 *	LoginConstants.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 01-12-2017
 *
 *	Constants for Login
 */
var BASE_URL_LOCAL = 'http://stomp.api.local';
var BASE_URL = 'http://stompinv.uit.tufts.edu';
var OTHER_URL = 'stomp-prod-01.uit.tufts.edu';

export default {
 	BASE_URL: BASE_URL,
  	LOGIN_URL: BASE_URL + '/Login',
  	LOGIN_USER: 'LOGIN_USER',
  	LOGOUT_USER: 'LOGOUT_USER',
  	STOMP_JWT: 'STOMP_JWT',
  	STOMP_USER: 'STOMP_USER',
  	STOMP_SERVER: 'STOMP_SERVER'
}