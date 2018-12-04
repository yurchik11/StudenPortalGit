/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { ThemeScope } from "./theme-scope";
import { getScopedName } from "./info/components-default-style";
export var ComponentDefaultStyles = React.createContext({});
export function DefaultStyleProvider(props) {
    return (React.createElement(ThemeScope.Provider, { value: "root" },
        React.createElement(ComponentDefaultStyles.Provider, { value: props.defaults }, props.children)));
}
export function DefaultStyleConsumer(props) {
    return (React.createElement(ThemeScope.Consumer, null, function (scope) {
        if (scope === void 0) { scope = "root"; }
        return (React.createElement(ComponentDefaultStyles.Consumer, null, function (defaultStyles) {
            var widgetScopeName = getScopedName(props.widgetType, scope), widgetStyle = defaultStyles[widgetScopeName] || {};
            return props.children(widgetStyle);
        }));
    }));
}
export function withDefaultStyle(Component, type) {
    return function WithDefaultStyle(props) {
        var widgetType = type || props.type;
        return (React.createElement(DefaultStyleConsumer, { widgetType: widgetType }, function (defaultStyle) {
            return (React.createElement(Component, tslib_1.__assign({}, props, { style: tslib_1.__assign({}, defaultStyle, props.style) })));
        }));
    };
}
