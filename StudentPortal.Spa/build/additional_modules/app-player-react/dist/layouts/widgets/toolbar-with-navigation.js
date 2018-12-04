/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { Template } from "devextreme-react/core/template";
import { ReactToolbar } from "../../widgets/toolbars/toolbar-widget";
import ReactDesktopNavigation from "./desktop-navigation";
import { withDefaultStyle } from "../../widgets/component-default-styles-provider";
var ToolbarWithDefault = withDefaultStyle(ReactToolbar);
var ToolbarWithNavigation = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarWithNavigation, _super);
    function ToolbarWithNavigation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolbarWithNavigation.prototype.render = function () {
        var _a = this.props, _b = _a.items, items = _b === void 0 ? [] : _b, pane = _a.pane, restProps = tslib_1.__rest(_a, ["items", "pane"]);
        return (React.createElement(ToolbarWithDefault, tslib_1.__assign({ type: "toolbar" }, restProps, { items: [{ template: "navigation-item", location: "before" }].concat(items) }),
            React.createElement(Template, { name: "navigation-item", component: function () { return (React.createElement(ReactDesktopNavigation, { pane: "main" })); } })));
    };
    return ToolbarWithNavigation;
}(React.PureComponent));
export default ToolbarWithNavigation;
