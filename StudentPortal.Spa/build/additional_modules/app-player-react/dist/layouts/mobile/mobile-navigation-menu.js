/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { Navbar } from "../widgets/navbar";
import { findActiveItem } from "../widgets/navigation-menu";
import { WithContexts } from "../../utils/with-contexts";
import { ToggleNavigationMenuContext } from "./mobile-layout";
import { NavigationMenuContainer } from "../widgets/navigation-menu-container";
import { NavigationMenuToolbar } from "../widgets/navigation-menu-toolbar";
import { ThemeScope } from "../../widgets/theme-scope";
var MobileNavigationMenu = /** @class */ (function (_super) {
    tslib_1.__extends(MobileNavigationMenu, _super);
    function MobileNavigationMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MobileNavigationMenu.prototype.render = function () {
        var _a = this.props, title = _a.title, items = _a.items, currentItem = findActiveItem(items);
        return (React.createElement(ThemeScope.Provider, { value: "mobile-navigation" },
            React.createElement(WithContexts, { contexts: { toggleNavigationMenu: ToggleNavigationMenuContext } }, function (_a) {
                var toggleNavigationMenu = _a.toggleNavigationMenu;
                return (React.createElement(NavigationMenuContainer, null,
                    React.createElement(React.Fragment, null,
                        React.createElement(NavigationMenuToolbar, { collapsed: false, title: title, toggleNavigationMenu: toggleNavigationMenu }),
                        React.createElement(Navbar, { items: items, selectedItem: currentItem }))));
            })));
    };
    return MobileNavigationMenu;
}(React.PureComponent));
export { MobileNavigationMenu };
