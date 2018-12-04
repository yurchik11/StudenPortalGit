/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as React from "react";
import { createWithStyleComponent } from "../../widgets/with-style";
import { withDefaultStyle } from "../../widgets/component-default-styles-provider";
import { registerDefaultStyles } from "../../widgets/info/components-default-style";
export var NavigationMenuContainer = withDefaultStyle(function (_a) {
    var children = _a.children, style = _a.style;
    return (React.createElement(WithStyle, null, function (_a) {
        var main = _a.main;
        return (React.createElement("div", { className: "navigation-menu dx-theme-generic-typography " + main, style: style }, children));
    }));
}, "navigationMenuContainer");
var WithStyle = createWithStyleComponent({
    main: {
        display: "flex",
        height: "100%",
        flexDirection: "column",
        flexShrink: 0
    }
});
registerDefaultStyles({
    type: "navigationMenuContainer",
    scope: ["navigation", "mobile-navigation"],
    styles: {
        width: "270px"
    }
});
registerDefaultStyles({
    type: "navigationMenuContainer",
    scope: "navigation-collapsed",
    inherit: {
        type: "navigationMenuContainer",
        scope: "navigation"
    },
    styles: {
        width: "70px"
    }
});
