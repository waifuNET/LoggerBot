var x = new Date();
const currentTimeZoneOffsetInHours = x.getTimezoneOffset() / 60;

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var myOffset = currentTimeZoneOffsetInHours * -1;
var unixTimestamp = Date.now();
var utc = unixTimestamp + (currentTimeZoneOffsetInHours * 60 * 60) * 1000;
var myTime = utc + (myOffset * 60 * 60) * 1000;

/**
 * Converts unix time to human-readable time.
 */
function getHumanDateFormat(unix) {
	var dateObject = new Date(unix);
	var utchumanDateFormat = dateObject.toLocaleString();

	return utchumanDateFormat.replace(',', "");
}

/**
 * Converts unix time to human-readable time (date only).
 * Offset is an integer. Adjusts the time from unix to your time.
 * See (https://en.wikipedia.org/wiki/List_of_UTC_time_offsets).
 */
function getHumanOnlyDateFormat(unix, _offset = "0"){
	var offset = parseInt(_offset, 10);
	var myOffset = offset * -1;
	var dateObject = new Date(unix + (myOffset * 60 * 60) * 1000);

	var dd = String(dateObject.getDate()).padStart(2, '0');
	var mm = String(dateObject.getMonth() + 1).padStart(2, '0');
	var yyyy = dateObject.getFullYear();

	date = yyyy + '-' + mm + '-' + dd;
	return date;
}

/**
 * Convert unix time to human readable time with offset.
 * Offset is an integer. Adjusts the time from unix to your time.
 * See (https://en.wikipedia.org/wiki/List_of_UTC_time_offsets).
 */
function getHumanDateFormatWithOffset(unix, offset){
	var myOffset = offset * -1;
	var dateObject = new Date(unix + (myOffset * 60 * 60) * 1000);
	var utchumanDateFormat = dateObject.toLocaleString();

	return utchumanDateFormat.replace(',', "");
}

/**
 * Refreshes data.
 */
function time_update(){
	myOffset = currentTimeZoneOffsetInHours * -1;
	unixTimestamp = Date.now();
	utc = unixTimestamp + (currentTimeZoneOffsetInHours * 60 * 60) * 1000;
	myTime = utc + (myOffset * 60 * 60) * 1000;

	exports.myOffset = myOffset;
	exports.unixTimestamp = unixTimestamp;
	exports.myTime = myTime;
	exports.utc = utc;
}

exports.getHumanDateFormat = getHumanDateFormat;
exports.getHumanOnlyDateFormat = getHumanOnlyDateFormat;
exports.getHumanDateFormatWithOffset = getHumanDateFormatWithOffset;
exports.time_update = time_update;

exports.myOffset = myOffset;
exports.unixTimestamp = unixTimestamp;
exports.myTime = myTime;
exports.utc = utc;
