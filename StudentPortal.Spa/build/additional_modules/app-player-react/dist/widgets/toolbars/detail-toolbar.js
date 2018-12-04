/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { createSelector } from "reselect";
import { createWithStyleComponent } from "../with-style";
import { ReactToolbarBaseWithTheme } from "./toolbar-base-widget";
var WithStyle = createWithStyleComponent({
    main: {
        width: "100%",
        display: "flex",
        "& .detail-item-toolbar-mobile": {
            width: "100%"
        },
        "& .detail-item-toolbar-mobile .dx-toolbar-before": {
            width: "100%"
        },
        "& .detail-item-toolbar-mobile .dx-toolbar-before .dx-toolbar-button:first-child": {
            width: 36
        }
    }
});
var ReactValueToolbar = /** @class */ (function (_super) {
    tslib_1.__extends(ReactValueToolbar, _super);
    function ReactValueToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemsSelector = createSelector(function (args) { return args.visible; }, function (args) { return args.item; }, function (args) { return args.backButton; }, function (visible, item, backButton) { return (visible && item
            ? [backButton, tslib_1.__assign({}, item, { locateInMenu: "never", location: "before" })]
            : [backButton]); });
        _this.styleSelector = createSelector(function (args) { return args.style; }, function (args) { return args.visible; }, function (style, visible) {
            if (style === void 0) { style = {}; }
            if (visible === void 0) { visible = true; }
            return _this.separateStyles(!visible ? tslib_1.__assign({}, style, { display: "none" }) : tslib_1.__assign({}, style, { display: "flex" }));
        });
        return _this;
    }
    ReactValueToolbar.prototype.separateStyles = function (style) {
        var padding = style.padding, paddingTop = style.paddingTop, paddingBottom = style.paddingBottom, paddingLeft = style.paddingLeft, paddingRight = style.paddingRight, rest = tslib_1.__rest(style, ["padding", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight"]);
        return rest;
    };
    ReactValueToolbar.prototype.render = function () {
        var _this = this;
        var _a = this.props, visible = _a.visible, className = _a.className, style = this.styleSelector(this.props), items = this.itemsSelector(this.props);
        return (React.createElement(WithStyle, { className: className }, function (_a) {
            var main = _a.main;
            return (React.createElement("div", { style: style, className: main },
                React.createElement(ReactToolbarBaseWithTheme, { style: _this.props.style, visible: visible, items: items, themeScope: "detail-item-toolbar-mobile" })));
        }));
    };
    return ReactValueToolbar;
}(React.PureComponent));
export { ReactValueToolbar };
