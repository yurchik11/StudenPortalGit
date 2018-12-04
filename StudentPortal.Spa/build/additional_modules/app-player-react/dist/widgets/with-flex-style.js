/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { getFlexStyle } from "./flex-helper";
import { DefaultStyleConsumer } from "./component-default-styles-provider";
// TODO Beresnev: rerendering optimisation;
export function withFlexStyle(Component) {
    return function (props) {
        return (React.createElement(DefaultStyleConsumer, { widgetType: props.widgetProps.type }, function (defaultStyle) {
            return (React.createElement(Component, tslib_1.__assign({}, props.widgetProps, { style: getFlexStyle(tslib_1.__assign({}, defaultStyle, props.widgetProps.style), props.orientation) })));
        }));
    };
}
