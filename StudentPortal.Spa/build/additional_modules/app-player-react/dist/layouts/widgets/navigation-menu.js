/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import * as traverse from "traverse";
import { Navbar } from "./navbar";
import { NavbarListSection } from "./navbar-list-section";
import { FunctionCompiler } from "../../logic/function-compiler";
import { WithApplicationInfo } from "./withApplicationInfo";
import { NavigationMenuContainer } from "./navigation-menu-container";
import { NavigationMenuToolbar } from "./navigation-menu-toolbar";
import { ThemeScope } from "../../widgets/theme-scope";
export function compileNavigationHandlers(items, runContext, postOnExecuteHandler) {
    return traverse(items).map(function (item) {
        if (!item) {
            return item;
        }
        else if (item.viewId) {
            return tslib_1.__assign({}, item, { onExecute: function () {
                    var result = runContext.$functions.navigateToView(item.viewId);
                    if (postOnExecuteHandler) {
                        postOnExecuteHandler();
                    }
                    return result;
                } });
        }
        else if (FunctionCompiler.isCodeHandler(item.onExecute)) {
            var handler_1 = new FunctionCompiler(item.onExecute);
            return tslib_1.__assign({}, item, { onExecute: function () {
                    var result = handler_1.run(runContext);
                    if (postOnExecuteHandler) {
                        postOnExecuteHandler();
                    }
                    return result;
                } });
        }
    });
}
export function findActiveItem(items) {
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        if (item.isActive) {
            return item;
        }
        else if (item.items) {
            var child = findActiveItem(item.items);
            if (child) {
                return child;
            }
        }
    }
    return undefined;
}
var NavigationMenu = /** @class */ (function (_super) {
    tslib_1.__extends(NavigationMenu, _super);
    function NavigationMenu(props) {
        var _this = _super.call(this, props) || this;
        _this.collapse = function () {
            var _a = _this.state, compact = _a.compact, collapsed = _a.collapsed;
            if (compact && !collapsed) {
                _this.setState(function (prevState) { return (tslib_1.__assign({}, prevState, { collapsed: true })); });
            }
        };
        _this.expand = function (section) {
            var _a = _this.state, compact = _a.compact, collapsed = _a.collapsed;
            if (compact && collapsed) {
                // TODO: implement collapsing in compact mode
                // this.setState({ ...this.state, collapsed: false, currentSectionId: section.id });
                _this.setState(function () { return ({ compact: false, collapsed: false, currentItem: section }); });
            }
        };
        _this.toggleCompact = function () {
            var compact = _this.state.compact;
            _this.setState(function (prevState) { return (tslib_1.__assign({}, prevState, { compact: !compact, collapsed: compact ? false : true })); });
        };
        _this.state = {
            compact: _this.props.compact,
            collapsed: _this.props.compact
        };
        return _this;
    }
    NavigationMenu.getDerivedStateFromProps = function (props, state) {
        var _a = state.prevProps, prevProps = _a === void 0 ? {} : _a;
        return prevProps.items !== props.items
            ? { currentItem: findActiveItem(props.items), prevProps: props }
            : { currentItem: state.currentItem, prevProps: props };
    };
    NavigationMenu.prototype.render = function () {
        var _a = this.props, title = _a.title, items = _a.items, applicationInfo = _a.applicationInfo, _b = this.state, compact = _b.compact, collapsed = _b.collapsed, currentItem = _b.currentItem;
        return (React.createElement(ThemeScope.Provider, { value: "navigation" + (compact ? "-collapsed" : "") },
            React.createElement(NavigationMenuContainer, null,
                React.createElement(React.Fragment, null,
                    React.createElement(NavigationMenuToolbar, { collapsed: collapsed, title: title, toggleNavigationMenu: this.toggleCompact }),
                    collapsed
                        ? React.createElement(NavbarListSection, { selectedItems: items.filter(function (item) { return item === currentItem; }), items: items, onExpand: this.expand })
                        : (React.createElement(WithApplicationInfo, { applicationInfo: applicationInfo },
                            React.createElement(Navbar, { items: items, selectedItem: currentItem })))))));
    };
    return NavigationMenu;
}(React.PureComponent));
export { NavigationMenu };
