/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { ShortcutsScope, bind, unbind } from "../../common/shortcuts";
export function withFocusOnShortcut(Widget) {
    return function (props) {
        var shortcut = props.shortcut, componentProps = tslib_1.__rest(props, ["shortcut"]);
        return shortcut
            ? (React.createElement(ShortcutsScope.Consumer, null, function (scope) { return (React.createElement(FocusOnShortcutBinder, { shortcut: shortcut, scope: scope, Component: Widget, componentProps: componentProps })); })) : React.createElement(Widget, tslib_1.__assign({}, componentProps));
    };
}
var FocusOnShortcutBinder = /** @class */ (function (_super) {
    tslib_1.__extends(FocusOnShortcutBinder, _super);
    function FocusOnShortcutBinder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        return _this;
    }
    FocusOnShortcutBinder.prototype.render = function () {
        var _a = this.props, Component = _a.Component, componentProps = _a.componentProps;
        return React.createElement(Component, tslib_1.__assign({}, componentProps, { ref: this.ref }));
    };
    FocusOnShortcutBinder.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, shortcut = _a.shortcut, scope = _a.scope;
        bind(shortcut, scope, function (e) {
            e.preventDefault();
            _this.ref.current.instance.focus();
        });
    };
    FocusOnShortcutBinder.prototype.componentWillUnmount = function () {
        var _a = this.props, shortcut = _a.shortcut, scope = _a.scope;
        unbind(shortcut, scope);
    };
    return FocusOnShortcutBinder;
}(React.Component));
