/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import { makePlaceholders } from "./utils";
var metadata = {
    "version": "18.1.5",
    "date": "8/21/2018",
    "themeId": "1",
    "hue": null,
    "items": [
        { "key": "@base-bg", "value": "#F2F2F2" },
        { "key": "@texteditor-bg", "value": "#FFFFFF" },
        { "key": "@base-accent", "value": "#FF8D4D" },
        { "key": "@base-border-color", "value": "#DDDDDD" },
        { "key": "@button-normal-bg", "value": "#F2F2F2" },
        { "key": "@toolbar-bg", "value": "#F2F2F2" },
        { "key": "@button-default-border-color", "value": "transparent" },
        { "key": "@button-default-bg", "value": "#FF8D4D" },
        { "key": "@button-default-color", "value": "#ffffff" }
    ]
}, map = {
    "#FF8D4D": "@primaryColor",
    "#ffffff": "@onPrimaryColor"
};
export default makePlaceholders(metadata, map);
