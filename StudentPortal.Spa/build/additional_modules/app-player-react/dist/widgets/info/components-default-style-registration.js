/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import { registerDefaultStyles } from "./components-default-style";
export var defaultWidgetIdents = {
    extraLarge: "30px",
    veryLarge: "20px",
    large: "16px",
    middle: "12px",
    small: "8px",
    verySmall: "4px",
    empty: "0px"
};
// Label
registerDefaultStyles({
    type: "label",
    styles: {
        width: "100%",
        fontSize: "16px",
        paddingLeft: defaultWidgetIdents.large,
        paddingTop: defaultWidgetIdents.middle
    }
});
registerDefaultStyles({
    type: "label",
    scope: "form",
    styles: {
        width: "100%",
    }
});
registerDefaultStyles({
    type: "label",
    scope: "toolbar",
    inherit: { type: "label", scope: "form" }
});
// Link 
registerDefaultStyles({
    type: "link",
    inherit: { type: "label" }
});
registerDefaultStyles({
    type: "link",
    scope: "form",
    inherit: {
        type: "label",
        scope: "form"
    }
});
registerDefaultStyles({
    type: "link",
    scope: "toolbar",
    inherit: {
        type: "label",
        scope: "toolbar"
    }
});
// Button 
registerDefaultStyles({
    type: "button",
    styles: {
        marginLeft: defaultWidgetIdents.large,
        marginRight: defaultWidgetIdents.large,
        marginTop: defaultWidgetIdents.small,
        marginBottom: defaultWidgetIdents.small,
        minWidth: "64px",
        height: "36px",
        fontSize: "16px"
    }
});
// Input 
registerDefaultStyles({
    type: "input",
    styles: {
        width: "100%",
        marginLeft: defaultWidgetIdents.large,
        marginRight: defaultWidgetIdents.large,
        marginTop: defaultWidgetIdents.small,
        marginBottom: defaultWidgetIdents.small
    }
});
["datebox", "selectBox", "lookup", "textarea", "passbox", "colorpicker", "numberbox"].forEach(function (type) {
    registerDefaultStyles({
        type: type,
        inherit: {
            type: "input"
        }
    });
});
registerDefaultStyles({
    type: "datebox",
    scope: "form",
    styles: {
        width: "100%"
    }
});
// Radio
registerDefaultStyles({
    type: "switch",
    styles: {
        marginTop: defaultWidgetIdents.middle,
        marginBottom: defaultWidgetIdents.middle,
        marginRight: defaultWidgetIdents.large,
        marginLeft: defaultWidgetIdents.large
    }
});
// Switch
registerDefaultStyles({
    type: "switch",
    styles: {
        width: "100%",
        paddingTop: defaultWidgetIdents.large,
        paddingBottom: defaultWidgetIdents.large,
        paddingLeft: defaultWidgetIdents.large
    }
});
// Checkbox
registerDefaultStyles({
    type: "checkbox",
    inherit: {
        type: "switch"
    }
});
// Form
registerDefaultStyles({
    type: "form",
    styles: {
        width: "100%",
        paddingTop: defaultWidgetIdents.veryLarge,
        paddingBottom: defaultWidgetIdents.veryLarge,
        paddingLeft: defaultWidgetIdents.extraLarge,
        paddingRight: defaultWidgetIdents.extraLarge
    }
});
// Fileimage
registerDefaultStyles({
    type: "fileImage",
    styles: {
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "normal",
        marginTop: defaultWidgetIdents.middle,
        marginBottom: defaultWidgetIdents.middle
    }
});
registerDefaultStyles({
    type: "fileImage",
    scope: "form",
    inherit: {
        type: "fileImage"
    },
    styles: {
        marginTop: 0,
        marginBottom: 0
    }
});
registerDefaultStyles({
    type: "fileImage",
    scope: "toolbar",
    inherit: {
        type: "fileImage",
        scope: "form"
    }
});
// Image
registerDefaultStyles({
    type: "image",
    styles: {
        width: "64px",
        height: "64px",
        marginTop: defaultWidgetIdents.large,
        marginBottom: defaultWidgetIdents.large,
        marginLeft: defaultWidgetIdents.large,
        marginRight: defaultWidgetIdents.large
    }
});
// List
registerDefaultStyles({
    type: "list",
    styles: {
        width: "100%",
        height: "100%"
    }
});
registerDefaultStyles({
    type: "list",
    scope: "form",
    inherit: {
        type: "list"
    }
});
registerDefaultStyles({
    type: "list",
    scope: "toolbar",
    inherit: {
        type: "list",
        scope: "form"
    }
});
// Grid
registerDefaultStyles({
    type: "grid",
    inherit: {
        type: "list"
    }
});
registerDefaultStyles({
    type: "grid",
    scope: "form",
    inherit: {
        type: "list",
        scope: "form"
    }
});
registerDefaultStyles({
    type: "grid",
    scope: "toolbar",
    inherit: {
        type: "list",
        scope: "toolbar"
    }
});
// Toolbar
registerDefaultStyles({
    type: "toolbar",
    styles: {
        paddingTop: defaultWidgetIdents.middle,
        paddingBottom: defaultWidgetIdents.middle,
        paddingRight: defaultWidgetIdents.extraLarge,
        paddingLeft: defaultWidgetIdents.extraLarge
    }
});
registerDefaultStyles({
    type: "toolbar",
    scope: "form",
    inherit: {
        type: "toolbar",
    }
});
// Appbar
registerDefaultStyles({
    type: "appbar",
    inherit: {
        type: "toolbar"
    }
});
registerDefaultStyles({
    type: "appbar",
    scope: "form",
    inherit: {
        type: "toolbar",
        scope: "form"
    }
});
// Commands
registerDefaultStyles({
    type: "command.string",
    scope: "toolbar",
    styles: {
        width: "100%"
    }
});
["command.integer", "command.list"].forEach(function (type) {
    registerDefaultStyles({
        type: type,
        scope: "toolbar",
        inherit: {
            type: "command.string",
            scope: "toolbar"
        }
    });
});
