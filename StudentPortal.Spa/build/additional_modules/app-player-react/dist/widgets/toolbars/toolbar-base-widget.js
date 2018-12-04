/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { Template } from "devextreme-react/core/template";
import { Toolbar } from "devextreme-react/ui/toolbar";
import * as React from "react";
import AppPlayerComponent from "../app-player-component";
import { StandaloneMenuItemTemplate } from "../menu-item";
import { createWithStyleComponent } from "../with-style";
import { withTheme } from "../with-theme";
import { ThemeScope } from "../theme-scope";
var WithStyle = createWithStyleComponent({
    main: {
        boxShadow: "0 0 3px rgba(0, 0, 0, 0.25)",
        "& .dx-toolbar-item.dx-toolbar-label": {
            paddingRight: 10
        },
        "& .dx-toolbar-item.dx-toolbar-button": {
            paddingRight: 10
        },
        "& .dx-toolbar-item .divider-container": {
            paddingRight: 10,
            paddingLeft: 10
        }
    }
});
export function renderItem(item) {
    var options = item.options, showText = !item.options.icon || item.showText !== "inMenu";
    return React.createElement(AppPlayerComponent, tslib_1.__assign({}, options, { showText: showText, tabIndex: -1 }));
}
export function renderMenuItem(item) {
    return (React.createElement(StandaloneMenuItemTemplate, tslib_1.__assign({}, tslib_1.__assign({ icon: item.options.icon, text: item.options.text, showArrow: item.showArrow }, item.locateInMenuOptions, { onExecute: item.onItemClickInMenu }))));
}
var commonItemTemplates = [
    React.createElement(Template, { key: "item", name: "item", component: renderItem }),
    React.createElement(Template, { key: "menuItem", name: "menuItem", component: renderMenuItem })
];
var ReactToolbarBase = /** @class */ (function (_super) {
    tslib_1.__extends(ReactToolbarBase, _super);
    function ReactToolbarBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReactToolbarBase.renderToolbar = function (toolbarProps) {
        var children = toolbarProps.children ? commonItemTemplates.concat([
            toolbarProps.children
        ]) : commonItemTemplates;
        return (React.createElement(WithStyle, { className: toolbarProps.className }, function (_a) {
            var main = _a.main;
            return (React.createElement(ThemeScope.Provider, { value: "toolbar" },
                React.createElement(Toolbar, tslib_1.__assign({}, toolbarProps, { className: main }), children)));
        }));
    };
    ReactToolbarBase.prototype.render = function () {
        return ReactToolbarBase.renderToolbar(this.props);
    };
    return ReactToolbarBase;
}(React.Component));
export { ReactToolbarBase };
export var ReactToolbarBaseWithTheme = withTheme(ReactToolbarBase);
