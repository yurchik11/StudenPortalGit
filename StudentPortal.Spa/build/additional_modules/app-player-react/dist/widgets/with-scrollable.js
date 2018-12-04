/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { ScrollView } from "devextreme-react/ui/scroll-view";
export var defaults = {
    bounceEnabled: true,
    scrollByContent: true
};
export function withScrollable(Component) {
    return (function (props) {
        var _a = props, scrollable = _a.scrollable, rest = tslib_1.__rest(_a, ["scrollable"]); // ts can't rest generic types: https://github.com/Microsoft/TypeScript/issues/10727
        return scrollable
            ? (React.createElement(ScrollView, tslib_1.__assign({}, defaults, scrollable, { onPullDown: scrollable.onPullDown && processOnPullDown(scrollable.onPullDown) }),
                React.createElement(Component, tslib_1.__assign({}, rest))))
            : React.createElement(Component, tslib_1.__assign({}, rest));
    });
}
function processOnPullDown(handler) {
    var _this = this;
    return function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, handler(e)];
                case 1:
                    _a.sent();
                    e.component.release(true);
                    return [2 /*return*/];
            }
        });
    }); };
}
