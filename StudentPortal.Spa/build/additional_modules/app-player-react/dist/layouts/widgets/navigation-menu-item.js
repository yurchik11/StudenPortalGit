/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as React from "react";
import { withDefaultStyle } from "../../widgets/component-default-styles-provider";
import { ReactLabel } from "../../widgets/label-widget";
import { registerDefaultStyles } from "../../widgets/info/components-default-style";
export var NavbarItem = withDefaultStyle(function (config) {
    return React.createElement(ReactLabel, { text: config.title, style: config.style, className: config.className, onClick: config.onExecute });
}, "navbarItem");
registerDefaultStyles({
    type: "navbarItem",
    scope: ["navigation", "mobile-navigation"],
    styles: {
        wordBreak: "break-word",
        fontSize: "14px",
        color: "inherit"
    }
});
registerDefaultStyles({
    type: "navbarItem",
    scope: "navigation-collapsed",
    styles: {
        display: "none"
    }
});
