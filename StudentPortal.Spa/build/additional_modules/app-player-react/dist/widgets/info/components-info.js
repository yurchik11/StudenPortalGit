/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
// tslint:disable-next-line:quotemark
import * as React from 'react';
import { withLoadable } from "../with-loadable";
import { compose } from "../../utils";
export var componentsInfo = {};
export function getComponentInfo(type) {
    var result = findComponentInfo(type);
    if (!result) {
        throw new Error("Widget with type \"" + type + "\" not found");
    }
    return result;
}
export function findComponentInfo(type) {
    return componentsInfo[type];
}
export function registerInheritWidget(widgetOptions) {
    var inherit = widgetOptions.inherit, displayingContext = widgetOptions.displayingContext, customizeWidget = widgetOptions.customizeWidget, rest = tslib_1.__rest(widgetOptions, ["inherit", "displayingContext", "customizeWidget"]), parentInfo = getComponentInfo(inherit), parentCustomizeWidget = parentInfo.customizeWidget;
    return registerWidget(tslib_1.__assign({}, rest, { loader: parentInfo.loader, displayingContext: displayingContext || parentInfo.displayingContext, customizeWidget: compose(customizeWidget, parentCustomizeWidget) }));
}
export function registerWidget(widgetOptions) {
    var name = widgetOptions.name, loader = widgetOptions.loader, displayingContext = widgetOptions.displayingContext, customizeWidget = widgetOptions.customizeWidget;
    var result = {
        rendererType: withLoadable(loader, customizeWidget),
        loader: loader,
        displayingContext: displayingContext,
        customizeWidget: customizeWidget
    };
    componentsInfo[name] = result;
    return result;
}
export function customizeProps(customizer) {
    return function (Widget) { return function (props) {
        return React.createElement(Widget, tslib_1.__assign({}, props, customizer(props)));
    }; };
}
