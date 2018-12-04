/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { getComponentInfo } from "./info/components-info";
import { DefaultStyleConsumer } from "./component-default-styles-provider";
import { Visible } from './visible-hoc';
export function ComponentRenderer(props) {
    var _a = props.visible, visible = _a === void 0 ? true : _a, style = props.style, rest = tslib_1.__rest(props, ["visible", "style"]), Widget = getComponentInfo(props.type).rendererType;
    return (React.createElement(Visible, { visible: visible }, function () { return (React.createElement(DefaultStyleConsumer, { widgetType: props.type }, function (defaultStyle) {
        return (React.createElement(Widget, tslib_1.__assign({}, rest, { style: tslib_1.__assign({}, defaultStyle, style) })));
    })); }));
}
