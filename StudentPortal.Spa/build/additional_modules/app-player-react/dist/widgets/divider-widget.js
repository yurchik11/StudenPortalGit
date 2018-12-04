/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { createWithStyleComponent } from "./with-style";
import * as React from "react";
var WithStyle = createWithStyleComponent({
    main: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "1px"
    }
});
var ReactDivider = /** @class */ (function (_super) {
    tslib_1.__extends(ReactDivider, _super);
    function ReactDivider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReactDivider.prototype.render = function () {
        var _this = this;
        return (React.createElement(WithStyle, { className: this.props.className }, function (_a) {
            var main = _a.main;
            return (React.createElement("div", { className: "divider-container" },
                React.createElement("div", { style: _this.props.style, className: "divider " + main })));
        }));
    };
    return ReactDivider;
}(React.Component));
export default ReactDivider;
