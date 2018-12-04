/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
export function withSelectionOnItemHold(Widget) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(WithSelectionOnItemHold, _super);
        function WithSelectionOnItemHold() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = { selectionMode: "none" };
            _this.onItemHoldHandler = function () {
                _this.setState(function (prevState) {
                    return { selectionMode: prevState.selectionMode === "none" ? "multiple" : "none" };
                });
            };
            return _this;
        }
        WithSelectionOnItemHold.prototype.render = function () {
            return React.createElement(Widget, tslib_1.__assign({}, this.props, { selectionMode: this.state.selectionMode, onItemHold: this.onItemHoldHandler }));
        };
        return WithSelectionOnItemHold;
    }(React.Component));
}
