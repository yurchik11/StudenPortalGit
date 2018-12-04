/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import * as isPlainObject from "is-plain-object";
export function diff(Component, componentName) {
    if (componentName === void 0) { componentName = getComponentName(Component); }
    if (!isComponentClass(Component)) {
        Component = toComponentClass(Component);
    }
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /*shouldComponentUpdate(nextProps: P, nextState: S, nextContext) {
            let result = true;
            if(super.shouldComponentUpdate) {
                result = super.shouldComponentUpdate(nextProps, nextState, nextContext);
            }
            if(result) {
                console.group(componentName, "will update");
                logDiff(this.props, nextProps, "props");
                logDiff(this.state, nextState, "state");
                console.groupEnd();
            }
            return result;
        }
        render() {
            logCollapsed(componentName + " render", this.props, this.state);
            return super.render();
        }*/
        class_1.prototype.componentDidUpdate = function (prevProps, prevState) {
            console.group(componentName, "updated");
            logCollapsed("props & state", this.props, this.state);
            logDiff(prevProps, this.props, "props");
            logDiff(prevState, this.state, "state");
            console.groupEnd();
            if (_super.prototype.componentDidUpdate) {
                _super.prototype.componentDidUpdate.call(this, prevProps, prevState);
            }
        };
        return class_1;
    }(Component));
}
function getComponentName(Component) {
    switch (Component.name) {
        case "":
            return "Stateless Component";
        case "Component":
            return "Anonymous Component";
        case "PureComponent":
            return "Anonymous PureComponent";
        default:
            return Component.name;
    }
}
function isComponentClass(Component) {
    return Component.prototype instanceof React.Component || Component.prototype instanceof React.PureComponent;
}
export function toComponentClass(Component) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(ComponentWrapper, _super);
        function ComponentWrapper() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ComponentWrapper.prototype.render = function () {
            return React.createElement(Component, tslib_1.__assign({}, this.props));
        };
        return ComponentWrapper;
    }(React.Component));
}
export function toPureComponentClass(Component) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(PureComponentWrapper, _super);
        function PureComponentWrapper() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PureComponentWrapper.prototype.render = function () {
            return React.createElement(Component, tslib_1.__assign({}, this.props));
        };
        return PureComponentWrapper;
    }(React.PureComponent));
}
function logDiff(obj1, obj2, path) {
    if (path === void 0) { path = "arguments"; }
    if (obj1 !== obj2) {
        if (isPlainObject(obj1) && isPlainObject(obj2) || Array.isArray(obj1) && Array.isArray(obj2)) {
            var keys1_1 = Object.keys(obj1), keys2 = Object.keys(obj2), allKeys = keys1_1.concat(keys2.filter(function (key2) { return keys1_1.indexOf(key2) === -1; }));
            var areSame = allKeys.reduce(function (result, key) {
                if (obj1[key] === obj2[key]) {
                    return result;
                }
                else {
                    logDiff(obj1[key], obj2[key], path + "." + key);
                    return false;
                }
            }, true);
            if (areSame) {
                logCollapsed(path + " are deep equal", obj1, obj2);
            }
        }
        else {
            logCollapsed(path + " are different", obj1, obj2);
        }
    }
    else {
        logCollapsed(path + " are strict equal", obj1, obj2);
    }
}
function logCollapsed(groupTitle) {
    var messages = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        messages[_i - 1] = arguments[_i];
    }
    console.groupCollapsed(groupTitle);
    messages.forEach(function (message) { return console.log(message); });
    console.groupEnd();
}
window["diff"] = logDiff;
// TODO: use this function in diff to determine when to use PureComponent
function shallowEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }
    else if (obj1 && typeof obj1 === "object" && obj2 && typeof obj2 === "object") {
        var keys1_2 = Object.keys(obj1), keys2 = Object.keys(obj2), allKeys = keys1_2.concat(keys2.filter(function (key2) { return keys1_2.indexOf(key2) === -1; }));
        return allKeys.every(function (key) { return obj1[key] === obj2[key]; });
    }
    else {
        return false;
    }
}
window["shallowEqual"] = shallowEqual;
