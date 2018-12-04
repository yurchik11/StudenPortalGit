/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { AppStateContext } from "../../app-state";
import { ToggleNavigationMenuContext } from "../../layouts/mobile/mobile-layout";
import { getBreadcrumbs } from "../../navigation/breadcrumbs";
import { WithContexts } from "../../utils/with-contexts";
import { RunContext } from "../../views/run-context";
import { ReactToolbar } from "./toolbar-widget";
var ReactAppbar = /** @class */ (function (_super) {
    tslib_1.__extends(ReactAppbar, _super);
    function ReactAppbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReactAppbar.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.items, items = _b === void 0 ? [] : _b, restProps = tslib_1.__rest(_a, ["items"]);
        return (React.createElement(WithContexts, { contexts: { appState: AppStateContext, runContext: RunContext, toggleNavigationMenu: ToggleNavigationMenuContext } }, function (_a) {
            var appState = _a.appState, runContext = _a.runContext, toggleNavigationMenu = _a.toggleNavigationMenu;
            var toolbarItems = _this.generateToolbarItems(items, appState.displayedViewsInfo, runContext, toggleNavigationMenu);
            return React.createElement(ReactToolbar, tslib_1.__assign({}, restProps, { items: toolbarItems }));
        }));
    };
    ReactAppbar.prototype.generateToolbarItems = function (viewItems, displayedViewsInfo, runContext, toggleNavigationMenu) {
        var result = viewItems;
        var breadcrumbs = getBreadcrumbs(displayedViewsInfo, ["main"], runContext)["main"];
        if (!viewItems.find(function (item) { return item.id === "title"; })) {
            result = [this.generateTitleItem(breadcrumbs)].concat(result);
        }
        if (!viewItems.find(function (item) { return item.id === "menu"; })) {
            result = [this.generateMenuItem(breadcrumbs, runContext, toggleNavigationMenu)].concat(result);
        }
        return result;
    };
    ReactAppbar.prototype.generateMenuItem = function (breadcrumbs, runContext, toggleNavigationMenu) {
        var isTopLevel = breadcrumbs && breadcrumbs.length === 1;
        return isTopLevel
            ? {
                id: "menu",
                type: "command.button",
                location: "before",
                onExecute: function () { return toggleNavigationMenu(true); },
                icon: "menu"
            }
            : {
                id: "menu",
                type: "command.button",
                location: "before",
                onExecute: function () { return runContext.$functions.navigateBack(); },
                icon: "back"
            };
    };
    ReactAppbar.prototype.generateTitleItem = function (breadcrumbs) {
        var title = breadcrumbs && breadcrumbs[breadcrumbs.length - 1].value;
        return {
            id: "title",
            type: "label",
            location: "before",
            text: title
        };
    };
    return ReactAppbar;
}(React.Component));
export { ReactAppbar };
