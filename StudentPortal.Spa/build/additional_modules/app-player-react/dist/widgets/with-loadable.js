/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import * as Loadable from "react-loadable";
import * as traverse from "traverse";
import { Loading } from "../common/loading";
import { findComponentInfo } from "./info/components-info";
// Temp, remove after removing default exports from widgets; 
function resolve(obj) {
    return obj && obj.__esModule ? obj.default : obj;
}
function preloadNestedComponents(config) {
    var cloned = traverse.clone(config), promises = traverse.reduce(cloned, function (acc) {
        if (this.node && this.notRoot) {
            if (this.node.type) {
                var componentInfo = findComponentInfo(this.node.type);
                if (componentInfo) {
                    acc.push(componentInfo.loader());
                }
            }
        }
        return acc;
    }, []);
    return Promise.all(promises);
}
export function withLoadable(loader, customizeWidget) {
    var LoadedWidget;
    return function WithLoadable(props) {
        var Widget = LoadedWidget ||
            Loadable({
                loader: function () { return preloadNestedComponents(props).then(loader); },
                loading: function () { return React.createElement(Loading, null); },
                render: function (widget, widgetProps) {
                    if (!LoadedWidget) {
                        LoadedWidget = customizeWidget ? customizeWidget(resolve(widget)) : widget;
                    }
                    return React.createElement(LoadedWidget, tslib_1.__assign({}, widgetProps));
                }
            });
        return React.createElement(Widget, tslib_1.__assign({}, props));
    };
}
