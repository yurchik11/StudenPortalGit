/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as isPlainObject from "is-plain-object";
export function propertyVisitor(target, valueCallback, initialContext) {
    if (typeof target === "string") {
        return target;
    }
    var context = initialContext || { getValueCallback: function (value, cntx) { return propertyVisitor(value, valueCallback, cntx); } }, isArray = Array.isArray(target), result = isArray ? [] : {};
    context.path = context.path || "";
    Object.keys(target).forEach(function (name) {
        var value = target[name];
        context.name = name;
        context.value = value;
        context.original = target;
        context.isArray = isArray;
        context.owner = result;
        if (Array.isArray(value) || isPlainObject(value)) {
            var oldPath = context.path;
            context.path = context.path ? context.path + (context.isArray ? "[" + context.name + "]" : "." + context.name) : context.name;
            result[name] = context.getValueCallback(value, context);
            context.path = oldPath;
        }
        else {
            var newVal = valueCallback(context);
            if (newVal !== undefined) {
                result[name] = newVal;
            }
        }
    });
    return result;
}
