/*
 *	LocationActions.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 01-12-2017
 *
 *	Helper methods for Location calculations
 *
 *	userPosition format:
		{
			accuracy,
			altitude,
			altitudeAccuracy,
			heading,
			latitude,
			longitude,
			speed
		}
 */
 
import LocationConstants from '../constants/LocationConstants.js';

export default {
	isWithinCEEORadius: (userPosition) => {
		if (getDistanceFromCEEO(userPosition, LocationConstants.EARTH_RADIUS_METER) < 50)
			return true;
		return false;
	}
}

function getDistanceFromCEEO(userPosition, earthRadius) {
	return haversineDistance(
				userPosition, 
				LocationConstants.CEEO, 
				earthRadius);
}

function haversineDistance(positionA, positionB, earthRadius) {
	var dLat = toRadians(positionB.latitude - positionA.latitude);
    var dLng = toRadians(positionB.longitude - positionA.longitude);
    var a = Math.sin(dLat/2) 
    		* Math.sin(dLat/2) 
    		+ Math.cos(toRadians(positionA.latitude)) 
    		* Math.cos(toRadians(positionB.latitude)) 
    		* Math.sin(dLng/2) * Math.sin(dLng/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadius * c;
}

function toRadians(x) {
   return x * Math.PI / 180;
}