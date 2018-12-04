/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import "../../css/layouts/desktop-layout.css";
import * as React from "react";
import { createSelector } from "reselect";
import { ReactStackPanel } from "../widgets/stack-panel-widget";
import ToolbarWithNavigation from "./widgets/toolbar-with-navigation";
import { DesktopLayoutViewModel } from "./desktop-layout-view-model";
import { compileNavigationHandlers, NavigationMenu } from "./widgets/navigation-menu";
import { Pane } from "./pane";
import { withPopup } from "./with-popup";
var PopupPane = withPopup(Pane);
var DesktopLayout = /** @class */ (function (_super) {
    tslib_1.__extends(DesktopLayout, _super);
    function DesktopLayout(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            navigationItemsSelector: createSelector(function (args) { return args.appConfig.navigation.items; }, function (args) { return args.runContext; }, function (items, runContext) { return compileNavigationHandlers(items, runContext); }),
            navigationItems: []
        };
        return _this;
    }
    DesktopLayout.getDerivedStateFromProps = function (nextProps, prevState) {
        return tslib_1.__assign({}, prevState, { navigationItems: prevState.navigationItemsSelector(nextProps) });
    };
    DesktopLayout.prototype.render = function () {
        var _this = this;
        var _a = this.props, appConfig = _a.appConfig, runContext = _a.runContext, displayedViewsInfo = _a.displayedViewsInfo;
        return (React.createElement(DesktopLayoutViewModel, { displayedViewsInfo: displayedViewsInfo, appConfig: appConfig, runContext: runContext }, function (layoutViewModel) {
            return (React.createElement(ReactStackPanel, { className: "desktop-layout-container", orientation: "horizontal" },
                React.createElement(NavigationMenu, { title: appConfig.title, items: _this.state.navigationItems, applicationInfo: appConfig.applicationInfo }),
                React.createElement(ReactStackPanel, { className: "desktop-layout-container" },
                    React.createElement(ToolbarWithNavigation, { pane: "main", themeScope: "appbar", className: "desktop-global-toolbar", items: layoutViewModel.globalToolbar.items }),
                    React.createElement("div", { className: "desktop-layout-container" },
                        React.createElement(Pane, { key: "main", classes: "main-pane", paneViewModel: layoutViewModel.mainPane }),
                        React.createElement(Pane, { key: "preview", classes: "preview-pane", paneViewModel: layoutViewModel.previewPane }),
                        React.createElement(PopupPane, { key: "simplePopup", type: "simplePopup", popupSettings: { visible: layoutViewModel.simplePopupPane.visible }, paneViewModel: layoutViewModel.simplePopupPane }),
                        React.createElement(PopupPane, { key: "popup", type: "popup", popupSettings: { visible: layoutViewModel.popupPane.visible }, paneViewModel: layoutViewModel.popupPane })))));
        }));
    };
    return DesktopLayout;
}(React.PureComponent));
export { DesktopLayout };
