/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import { makePlaceholders } from "./utils";
var metadata = {
    "version": "18.1.4",
    "date": "7/2/2018",
    "themeId": "1",
    "hue": null,
    "items": [
        { "key": "@base-text-color", "value": "#ffffff" },
        { "key": "@base-bg", "value": "#59769E" },
        { "key": "@base-border-color", "value": "rgba(0, 0, 0, 0)" },
        { "key": "@toolbar-bg", "value": "#59769E" },
        { "key": "@overlay-content-bg", "value": "#59769E" },
        { "key": "@overlay-shader-bg", "value": "rgba(255, 255, 255, 0.8)" },
        { "key": "@list-border-color", "value": "rgba(255, 255, 255, 0.1)" },
        { "key": "@texteditor-bg", "value": "#ffffff" },
        { "key": "@textbox-search-icon-color", "value": "#333333" },
        { "key": "@texteditor-color", "value": "#333333" }
    ]
}, map = {
    "#59769E": "@secondaryColor",
    "#ffffff": "@onSecondaryColor",
    "#333333": "@onBackgroundColor",
};
export default makePlaceholders(metadata, map);
