/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as ko from "knockout";
import { isObject } from "util";
import { FunctionCompiler } from "../logic/function-compiler";
export function continueFunc(func, continulation) {
    if (func) {
        return function (arg) {
            var result = func(arg);
            return continulation ? continulation(result) : result;
        };
    }
    else {
        return continulation;
    }
}
export function pipe() {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    return funcs
        .filter(function (f) { return !!f; })
        .reduce(function (prev, curr) {
        return function (arg) { return curr(prev(arg)); };
    });
}
export function compose() {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    return funcs
        .filter(function (func) { return !!func; })
        .reduceRight(function (prev, curr) {
        return function (arg) { return curr(prev(arg)); };
    });
}
export function clone(value) {
    var key, result;
    if (value instanceof Date) {
        return new Date(value.getTime());
    }
    else if (value && (value instanceof Object)) {
        result = Array.isArray(value) ? [] : {};
        for (key in value) {
            if (value.hasOwnProperty(key)) {
                result[key] = clone(value[key]);
            }
        }
        return result;
    }
    else {
        return value;
    }
}
export function getQueryVariables(locationSearch) {
    if (locationSearch === void 0) { locationSearch = window.location.search; }
    var query = locationSearch.substring(1), vars = query.split("&"), res = {};
    for (var i = 0; i < vars.length; i++) {
        var eqIndex = vars[i].indexOf("="), name = vars[i].slice(0, eqIndex), value = vars[i].slice(eqIndex + 1);
        res[name] = value;
    }
    return res;
}
export function getQueryVariable(variable, locationSearch) {
    if (locationSearch === void 0) { locationSearch = window.location.search; }
    var queryVariables = getQueryVariables(locationSearch);
    return variable in queryVariables ? queryVariables[variable] : null;
}
export function getModelValue(expr, runContext, callerInfo) {
    return compileExpression(expr, callerInfo)(runContext);
}
export function compileExpression(expr, callerInfo) {
    var _this = this;
    var isExpression = expr.charAt(0) === "=";
    if (isExpression) {
        var rawExpr = expr.substring(1), compiler_1 = new FunctionCompiler("return (" + rawExpr + ")");
        return function (runContext) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, compiler_1.run(runContext, callerInfo)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
    }
    else {
        var isNegative_1 = expr.charAt(0) === "!", rawExpr = bracketsToDots(isNegative_1 ? expr.substring(1) : expr), pointIndex = rawExpr.indexOf("."), modelName_1 = rawExpr.substring(0, pointIndex) || rawExpr, valuePath = pointIndex === -1 ? "" : rawExpr.substring(pointIndex + 1), getter_1 = compileGetter(valuePath, expr, callerInfo);
        return function (runContext) {
            if (runContext[modelName_1]) {
                return isNegative_1 ? !getter_1(runContext[modelName_1]) : getter_1(runContext[modelName_1]);
            }
            else {
                return expr;
            }
        };
    }
}
function bracketsToDots(expr) {
    return expr.replace(/\[/g, ".").replace(/\]/g, "");
}
export function isEmptyObject(obj) {
    return isObject(obj) && Object.keys(obj).length === 0;
}
export function compileGetter(expr, fullExpr, src) {
    if (!expr) {
        return function (obj) { return ko.unwrap(obj); };
    }
    expr = bracketsToDots(expr);
    var path = expr.split(".");
    return function (obj) {
        var current = ko.unwrap(obj);
        path.forEach(function (name, index) {
            if (!current) {
                return;
            }
            if (!isEmptyObject(current) && typeof current[name] === "undefined" && !current.hasOwnProperty(name)) {
                // NOTE BERESNEV: temporary comment these error notification for MVP V0;
                if (src) {
                    // console.error("Binding path \"%s\" used in %o is incorrect for %o", fullExpr || expr, src, obj);
                }
                else {
                    // console.error("Binding path \"%s\" is incorrect for %o", fullExpr || expr, obj);
                }
            }
            var next = index !== path.length - 1 ? ko.unwrap(current[name]) : current[name];
            current = next;
        });
        return ko.unwrap(current);
    };
}
export { compileSetter } from "devextreme/utils";
export function shorten(value, length, ending) {
    if (ending === void 0) { ending = "..."; }
    if (ending.length > length) {
        throw "Incorrect ending length";
    }
    else if (!value) {
        return value;
    }
    return value.length > length ? value.substr(0, length - ending.length) + ending : value;
}
export function replaceAll(str, token, newToken) {
    return str.split(token).join(newToken);
}
export function setOrPush(values, predicate, value) {
    var index = values.findIndex(predicate);
    if (index !== -1) {
        values[index] = value;
    }
    else {
        values.push(value);
    }
    return values;
}
