/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { ReactIcon } from "./icon-widget";
import { createWithStyleComponent } from "./with-style";
var WithStyle = createWithStyleComponent({
    icon: {
        display: "inline-block",
        margin: "5px 10px 5px 5px"
    }
});
export function MenuItemTemplate(item) {
    return (React.createElement(WithStyle, null, function (classes) { return (React.createElement(React.Fragment, null,
        item.icon
            ?
                React.createElement(ReactIcon, { src: item.icon, className: classes.icon })
            :
                null,
        React.createElement("span", { className: "dx-menu-item-text" }, item.text),
        item.showArrow
            ?
                React.createElement("span", { className: "dx-menu-item-popout-container" },
                    React.createElement("div", { className: "dx-menu-item-popout" }))
            :
                null)); }));
}
export function StandaloneMenuItemTemplate(item) {
    return (React.createElement("div", { className: "dx-menu-base", onClick: function (e) { item.onExecute(e); } },
        React.createElement("div", { className: "dx-menu-item" },
            React.createElement("div", { className: "dx-menu-item-content" },
                React.createElement("div", { className: "dx-context-menu" },
                    React.createElement(MenuItemTemplate, tslib_1.__assign({}, item)))))));
}
