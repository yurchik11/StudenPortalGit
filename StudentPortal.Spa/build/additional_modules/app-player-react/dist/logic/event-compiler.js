/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as traverse from "traverse";
import { isFunction } from "util";
import { FunctionCompiler } from "./function-compiler";
var simple = function (runContext) { return function (func, callerInfo) { return function (event, value) {
    return func.run(tslib_1.__assign({}, runContext, { $event: event, $value: value }), callerInfo);
}; }; }, eventDependent = function (runContext) { return function (func, callerInfo) { return function (event, value) {
    return func.run(tslib_1.__assign({}, runContext(event), { $event: event, $value: value }), callerInfo);
}; }; };
export function extractWidgetEventHandlers(config) {
    var extracted = {};
    Object.keys(config)
        .filter(function (key) { return FunctionCompiler.isCodeHandler(config[key]); })
        .forEach(function (key) { extracted[key] = config[key]; });
    return extracted;
}
export function createRunContextWithItem(runContext, data) {
    return tslib_1.__assign({}, runContext, { $item: (data && data.__originalItem) || (data) });
}
export default function compileEventHandlers(config, runContext) {
    var eventHandler = !isFunction(runContext) ? simple(runContext) : eventDependent(runContext);
    return traverse.map(config, function (node) {
        if (FunctionCompiler.isCodeHandler(node)) {
            var callerInfo = createCallerInfo(this.parent.node, this.key);
            return eventHandler(new FunctionCompiler(node), callerInfo);
        }
        return node;
    });
}
function createCallerInfo(component, event) {
    return {
        callerId: component.id || component.type && "Unnamed " + component.type || "Unknown component",
        callerType: event + " event handler"
    };
}
