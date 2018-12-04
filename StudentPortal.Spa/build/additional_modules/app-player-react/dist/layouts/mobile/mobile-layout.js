/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { Drawer } from "devextreme-react/ui/drawer";
import * as React from "react";
import { compileNavigationHandlers } from "../widgets/navigation-menu";
import { Pane } from "../pane";
import { MobileLayoutViewModel } from "./mobile-layout-view-model";
import { MobileNavigationMenu } from "./mobile-navigation-menu";
import { RunContext } from "../../views/run-context";
import { WithApplicationInfo } from "../widgets/withApplicationInfo";
export var ToggleNavigationMenuContext = React.createContext(null);
var MobileLayout = /** @class */ (function (_super) {
    tslib_1.__extends(MobileLayout, _super);
    function MobileLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.drawer = React.createRef();
        _this.toggleNavigationMenu = function (menuVisible) {
            var drawer = _this.drawer.current;
            if (drawer) {
                if (menuVisible) {
                    drawer.instance.show();
                }
                else {
                    drawer.instance.hide();
                }
            }
        };
        return _this;
    }
    MobileLayout.prototype.render = function () {
        var _this = this;
        var _a = this.props, appConfig = _a.appConfig, runContext = _a.runContext, navigationItems = compileNavigationHandlers(appConfig.navigation.items, runContext, function () { return _this.toggleNavigationMenu(false); });
        return (React.createElement(RunContext.Provider, { value: runContext },
            React.createElement(ToggleNavigationMenuContext.Provider, { value: this.toggleNavigationMenu },
                React.createElement(MobileLayoutViewModel, { appConfig: appConfig }, function (_a) {
                    var mainPane = _a.mainPane;
                    return (React.createElement(Drawer, { openedStateMode: "overlap", shading: true, closeOnOutsideClick: true, render: function () { return (React.createElement(WithApplicationInfo, { applicationInfo: appConfig.applicationInfo },
                            React.createElement(MobileNavigationMenu, { items: navigationItems, title: appConfig.title }))); }, ref: _this.drawer },
                        React.createElement(Pane, { key: "main", style: { height: "100%" }, paneViewModel: mainPane })));
                }))));
    };
    return MobileLayout;
}(React.PureComponent));
export { MobileLayout };
