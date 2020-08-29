var x = new Date();
const currentTimeZoneOffsetInHours = x.getTimezoneOffset() / 60;

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var myOffset = currentTimeZoneOffsetInHours * -1;
var unixTimestamp = Date.now();
var utc = unixTimestamp + (currentTimeZoneOffsetInHours * 60 * 60) * 1000;
var myTime = utc + (myOffset * 60 * 60) * 1000;

function getHumanDateFormat(unix) {
	var dateObject = new Date(unix);
	var utchumanDateFormat = dateObject.toLocaleString();

	return utchumanDateFormat.replace(',', "");
}

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

function getHumanDateFormatWithOffset(unix, offset){
	var myOffset = offset * -1;
	var dateObject = new Date(unix + (myOffset * 60 * 60) * 1000);
	var utchumanDateFormat = dateObject.toLocaleString();

	return utchumanDateFormat.replace(',', "");
}

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

exports.myOffset = myOffset;
exports.unixTimestamp = unixTimestamp;
exports.myTime = myTime;
exports.utc = utc;

setInterval(time_update, 1000);