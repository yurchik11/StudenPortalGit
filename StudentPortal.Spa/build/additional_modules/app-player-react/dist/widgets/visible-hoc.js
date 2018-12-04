/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
var Visible = /** @class */ (function (_super) {
    tslib_1.__extends(Visible, _super);
    function Visible() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Visible.prototype.render = function () {
        var _a = this.props, _b = _a.visible, visible = _b === void 0 ? true : _b, children = _a.children, other = tslib_1.__rest(_a, ["visible", "children"]);
        return visible ? children(other) : null;
    };
    return Visible;
}(React.Component));
export { Visible };
