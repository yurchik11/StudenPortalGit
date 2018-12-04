/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { ShortcutsScope, bind, unbind } from "../../common/shortcuts";
export function withShortcut(Widget) {
    return function (props) {
        var shortcut = props.shortcut, onExecute = props.onExecute;
        return shortcut
            ? (React.createElement(ShortcutsScope.Consumer, null, function (scope) { return (React.createElement(ShortcutBinder, { shortcut: shortcut, scope: scope, onExecute: onExecute },
                React.createElement(Widget, tslib_1.__assign({}, props)))); })) : React.createElement(Widget, tslib_1.__assign({}, props));
    };
}
;
var ShortcutBinder = /** @class */ (function (_super) {
    tslib_1.__extends(ShortcutBinder, _super);
    function ShortcutBinder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShortcutBinder.prototype.render = function () {
        return this.props.children;
    };
    ShortcutBinder.prototype.componentDidMount = function () {
        var _a = this.props, shortcut = _a.shortcut, scope = _a.scope, onExecute = _a.onExecute;
        bind(shortcut, scope, function (e) {
            e.preventDefault();
            onExecute(e);
        });
    };
    ShortcutBinder.prototype.componentWillUnmount = function () {
        var _a = this.props, shortcut = _a.shortcut, scope = _a.scope;
        unbind(shortcut, scope);
    };
    return ShortcutBinder;
}(React.Component));
