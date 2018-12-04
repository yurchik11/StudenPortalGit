/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import $ from "./jquery.stub";
export function isString(check) {
    return typeof check === "string" || check instanceof String;
}
export function isJQueryPromise(value) {
    if (value == null || typeof value.then !== "function") {
        return false;
    }
    var promiseThenSrc = String($.Deferred().then);
    var valueThenSrc = String(value.then);
    return promiseThenSrc === valueThenSrc;
}
export function isThenable(value) {
    return value && typeof value.then === "function";
}
export function toJQueryPromise(value) {
    if (value instanceof Promise) {
        var deferred = $.Deferred();
        value.then(deferred.resolve, deferred.reject);
        return deferred.promise();
    }
    return $.Deferred().resolve().then(function () { return value; });
}
