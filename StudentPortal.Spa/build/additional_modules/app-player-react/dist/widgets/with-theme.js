/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
export function withTheme(Component) {
    return function WithTheme(props) {
        var _a = props, themeScope = _a.themeScope, className = _a.className, rest = tslib_1.__rest(_a, ["themeScope", "className"]), // ts can't rest generic types: https://github.com/Microsoft/TypeScript/issues/10727
        classes = [className, themeScope].filter(function (item) { return item; }).join(" ");
        return React.createElement(Component, tslib_1.__assign({}, rest, { className: classes }));
    };
}
