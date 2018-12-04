/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { Popup } from "devextreme-react/ui/popup";
import * as React from "react";
import { createWithStyleComponent } from "./with-style";
var WithStyle = createWithStyleComponent({});
var ReactPopup = /** @class */ (function (_super) {
    tslib_1.__extends(ReactPopup, _super);
    function ReactPopup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.popup = React.createRef();
        _this.toggleDisplayedFn = function () {
            return _this.popup.current.instance.toggle();
        };
        return _this;
    }
    ReactPopup.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, _b = _a.visible, visible = _b === void 0 ? true : _b;
        return (React.createElement(WithStyle, { className: this.props.className }, function (_a) {
            var main = _a.main;
            return (React.createElement(Popup, tslib_1.__assign({}, _this.props, { className: main, ref: _this.popup, defaultVisible: visible, container: null, contentRender: function () { return children(_this.toggleDisplayedFn); }, children: null })));
        }));
    };
    return ReactPopup;
}(React.Component));
export default ReactPopup;
