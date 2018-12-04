/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
export function withSelectionDependentToolbar(Component) {
    return function WithSelectionDependentToolbar(props) {
        var _a = props, _b = _a.selectedItems, selectedItems = _b === void 0 ? [] : _b, _c = _a.selectionIndependent, selectionIndependent = _c === void 0 ? [] : _c, _d = _a.selectionDependent, selectionDependent = _d === void 0 ? [] : _d, rest = tslib_1.__rest(_a, ["selectedItems", "selectionIndependent", "selectionDependent"]);
        return (React.createElement(React.Fragment, null,
            React.createElement(Component, tslib_1.__assign({}, rest, { items: selectionIndependent, visible: !selectedItems.length, themeScope: "toolbar" })),
            React.createElement(Component, tslib_1.__assign({}, rest, { items: selectionDependent, visible: !!selectedItems.length, themeScope: "selection-toolbar" }))));
    };
}
