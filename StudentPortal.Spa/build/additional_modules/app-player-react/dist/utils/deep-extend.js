/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
var valueType = Object.prototype.toString;
function merge(result, defaults) {
    if (defaults !== undefined) {
        Object.keys(defaults).forEach(function (name) {
            var defaultVal = defaults[name];
            if (valueType.call(defaultVal) === "[object Object]" && valueType.call(result[name]) === "[object Object]") {
                if (result[name] === undefined) {
                    result[name] = tslib_1.__assign({}, defaultVal);
                }
                else {
                    merge(result[name], defaultVal);
                }
            }
            else {
                if (result[name] === undefined) {
                    result[name] = defaultVal;
                }
            }
        });
    }
}
export default function deepExtend(defaultConfig, config) {
    var extended = tslib_1.__assign({}, config);
    merge(extended, defaultConfig);
    return extended;
}
