/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as React from "react";
var hotkeys = require("hotkeys-js").default; // import works incorrect
// import hotkeys from "hotkeys-js";
export var ShortcutsScope = React.createContext(undefined);
if (hotkeys) {
    hotkeys.filter = function () { return true; };
}
var scopes = [];
export function pushScope(value) {
    scopes.push(value);
    setCurrentScope(value);
}
export function popScope() {
    scopes.pop();
    setCurrentScope(scopes[scopes.length - 1]);
}
export function getRootScope() {
    return scopes[0];
}
export function setRootScope(value) {
    scopes[0] = value;
    setCurrentScope(scopes[scopes.length - 1]);
}
function setCurrentScope(value) {
    if (hotkeys) {
        hotkeys.setScope(value);
    }
}
export function bind(key, scope, handler) {
    if (hotkeys && validateKeys(key)) {
        hotkeys(key, scope, handler);
    }
}
export function unbind(key, scope) {
    if (hotkeys) {
        hotkeys.unbind(key, scope);
    }
}
var requiredModifiers = ["alt", "option", "ctrl", "control", "cmd", "command"]; // NOTE: https://github.com/jaywcjlove/hotkeys#supported-keys
function validateKeys(str) {
    if (!str) {
        return false;
    }
    var combinations = str.split(",");
    if (combinations.length < 1) {
        return false;
    }
    return combinations.reduce(function (allPreviousValid, combination) {
        var currentValid = true;
        var keys = combination.split("+");
        if (!keys.some(function (key) { return requiredModifiers.indexOf(key) !== -1; })) {
            console.warn("shortcut combination \"" + combination + "\" is not valid. It must contains at least one modifier from list:", requiredModifiers);
            currentValid = false;
        }
        else if (keys.length < 2) {
            console.warn("shortcut combination \"" + combination + "\" is not valid. It must contains at least two keys");
            currentValid = false;
        }
        return allPreviousValid && currentValid;
    }, true);
}
