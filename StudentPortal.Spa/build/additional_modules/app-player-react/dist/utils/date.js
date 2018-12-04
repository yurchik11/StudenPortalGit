/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
var ISO8601_DATE_REGEX = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(?:([+-])([0-9]{2}):?([0-9]{2}))?/;
var RFC2822_DATE_REGEX = /\d{2}\s\w{3}\s\d{4}\s\d{2}:\d{2}:\d{2}\s.*$/;
export function transformISODates(obj) {
    if (!obj) {
        return;
    }
    Object.keys(obj).forEach(function (key) {
        var value = obj[key];
        if (value !== null && typeof value === "object") {
            transformISODates(value);
        }
        else if (typeof value === "string") {
            if (ISO8601_DATE_REGEX.test(value) || RFC2822_DATE_REGEX.test(value)) {
                obj[key] = parseDate(obj[key]);
            }
        }
    });
}
export function parseDate(date) {
    if (ISO8601_DATE_REGEX.test(date)) {
        return parseISO8601(date);
    }
    else if (RFC2822_DATE_REGEX.test(date)) {
        return new Date(Date.parse(date));
    }
    return undefined;
}
// If no timezone specified, transforms date in local time zone. This meets ECMAScript 6 specs and produce the same result as parseRfc2822Date
function parseISO8601(isoString) {
    var m = ISO8601_DATE_REGEX.exec(isoString);
    var resultDate;
    if (m) {
        // utcdate is milliseconds since the epoch
        if ((m[9] && m[10]) || isoString.endsWith("Z")) {
            var utcdate = Date.UTC(parseInt(m[1], 10), parseInt(m[2], 10) - 1, // months are zero-offset (!)
            parseInt(m[3], 10), parseInt(m[4], 10), parseInt(m[5], 10), // hh:mm
            (m[6] && parseInt(m[6], 10) || 0), // optional seconds
            (m[7] && parseFloat(m[7]) * 1000) || 0); // optional fraction
            if (m[9] && m[10]) {
                var offsetMinutes = parseInt(m[9], 10) * 60 + parseInt(m[10], 10);
                utcdate += (m[8] === "+" ? -1 : +1) * offsetMinutes * 60000;
            }
            resultDate = new Date(utcdate);
        }
        else {
            resultDate = new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1, // months are zero-offset (!)
            parseInt(m[3], 10), parseInt(m[4], 10), parseInt(m[5], 10), // hh:mm
            (m[6] && parseInt(m[6], 10) || 0), // optional seconds
            (m[7] && parseFloat(m[7]) * 1000) || 0);
        }
    }
    return resultDate;
}
