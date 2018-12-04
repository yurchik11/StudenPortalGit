/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import { makePlaceholders, patchMetadata } from "./utils";
var metadata = {
    "version": "18.1.4",
    "date": "8/2/2018",
    "themeId": "1",
    "hue": null,
    "items": [
        { "key": "@base-text-color", "value": "#ffffff" },
        { "key": "@base-bg", "value": "#FF8D4D" },
        { "key": "@base-accent", "value": "#ffffff" },
        { "key": "@base-border-color", "value": "#ffffff" },
        { "key": "@button-normal-bg", "value": "#FF8D4D" },
        { "key": "@button-default-border-color", "value": "#ffffff" },
        { "key": "@button-default-bg", "value": "#ffffff" },
        { "key": "@button-default-color", "value": "#FF8D4D" },
        { "key": "@toolbar-bg", "value": "#FF8D4D" }
    ]
}, hacks = [
    { "key": "@base-inverted-text-color", "value": "#FF8D4D" } // TODO: T652451
], map = {
    "#FF8D4D": "@primaryColor",
    "#ffffff": "@onPrimaryColor"
};
export default makePlaceholders(patchMetadata(metadata, hacks), map);
