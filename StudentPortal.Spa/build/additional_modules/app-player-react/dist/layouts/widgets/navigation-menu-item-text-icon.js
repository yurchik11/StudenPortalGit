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
export var NavigationItemTextIcon = withDefaultStyle(function (_a) {
    var title = _a.title, style = _a.style;
    var content = title.substr(0, 2);
    return (React.createElement(WithStyle, { className: "text-icon" }, function (_a) {
        var main = _a.main;
        return (React.createElement("div", { className: main, style: style }, content));
    }));
}, "navigationItemTextIcon");
var WithStyle = createWithStyleComponent({
    main: {
        flexShrink: 0,
        width: "24px",
        height: "24px",
        marginRight: "9px",
        borderRadius: "50%",
        lineHeight: "19px",
        textAlign: "center",
        fontSize: "10px",
        fontWeight: "bold"
    }
});
registerDefaultStyles({
    type: "navigationItemTextIcon",
    scope: "navigation-collapsed",
    styles: {
        margin: "0 auto"
    }
});
