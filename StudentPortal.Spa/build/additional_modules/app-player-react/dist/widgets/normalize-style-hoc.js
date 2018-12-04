/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
export function normalizeStyle(style) {
    if (style === void 0) { style = {}; }
    var result = tslib_1.__assign({}, style);
    Object.keys(style).forEach(function (name) {
        var value = style[name];
        var index = name.indexOf("-"), firstLetterUpper = function (str) {
            if (!str) {
                return "";
            }
            return str.charAt(0).toUpperCase() + str.slice(1);
        };
        if (index !== -1) {
            var prefix = name.substring(0, index), postfix = firstLetterUpper(name.substring(index + 1));
            delete result[name];
            result["" + prefix + postfix] = value;
        }
        else {
            result[name] = value;
        }
    });
    return result;
}
var NormalizeStyle = /** @class */ (function (_super) {
    tslib_1.__extends(NormalizeStyle, _super);
    function NormalizeStyle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { style: {} };
        return _this;
    }
    NormalizeStyle.getDerivedStateFromProps = function (props, state) {
        return props.style !== state.propsStyle
            ? { propsStyle: props.style, style: normalizeStyle(props.style) }
            : null;
    };
    NormalizeStyle.prototype.render = function () {
        var _a = this.props, children = _a.children, other = tslib_1.__rest(_a, ["children"]), style = this.state.style;
        return children(tslib_1.__assign({}, other, { style: style }));
    };
    return NormalizeStyle;
}(React.Component));
export { NormalizeStyle };
