/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import { makePlaceholders } from "./utils";
var metadata = {
    "version": "18.1.3",
    "date": "6/22/2018",
    "themeId": "1",
    "hue": null,
    "items": [
        { "key": "@base-accent", "value": "#FF8D4D" },
        { "key": "@base-text-color", "value": "#333333" },
        { "key": "@base-border-radius", "value": "5px" },
        { "key": "@toolbar-bg", "value": "#FAFAFA" },
        { "key": "@datagrid-columnchooser-font-weight", "value": "bold" }
    ]
}, map = {
    "#FF8D4D": "@primaryColor",
    "#333333": "@onBackgroundColor"
};
export default makePlaceholders(metadata, map);
