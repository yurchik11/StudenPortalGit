/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import { patchMetadata, makePlaceholders } from "./utils";
var metadata = {
    "version": "17.2.7",
    "date": "5/15/2018",
    "themeId": "1",
    "hue": null,
    "items": [
        { "key": "@base-text-color", "value": "#ffffff" },
        { "key": "@base-bg", "value": "#1C2B33" },
        { "key": "@base-selected-text-color", "value": "#FF8D4D" },
        { "key": "@base-accent", "value": "#1C2B33" },
        { "key": "@base-border-radius", "value": "0" },
        { "key": "@accordion-item-border-color", "value": "transparent" },
        { "key": "@accordion-item-focused-border-color", "value": "transparent" },
        { "key": "@accordion-title-color", "value": "#ffffff" },
        { "key": "@accordion-title-active-color", "value": "#FF8D4D" },
        { "key": "@accordion-icon-active-color", "value": "#FF9559" },
        { "key": "@button-default-border-color", "value": "transparent" },
        { "key": "@button-default-bg", "value": "#FF8D4D" },
        { "key": "@list-border-color", "value": "transparent" },
        { "key": "@treeview-item-selected-color", "value": "#FF8D4D" },
        { "key": "@treeview-focused-bg", "value": "#0a0f12" },
        { "key": "@list-item-selected-bg", "value": "#1C2B33" },
        { "key": "@treeview-item-selected-color", "value": "#FF8D4D" },
        { "key": "@list-item-hover-bg", "value": "rgba(255, 255, 255, 0.1)" },
        { "key": "@list-focused-bg", "value": "rgba(255, 255, 255, 0.1)" },
        { "key": "@list-item-active-bg", "value": "rgba(255, 255, 255, 0.15)" }
    ]
}, hacks = [
    { "key": "@base-inverted-text-color", "value": "#ffffff" },
    { "key": "@list-item-selected-color", "value": "#FF8D4D" },
    { "key": "@treeview-item-selected-bg", "value": "#1C2B33" }
], map = {
    "#FF8D4D": "@primaryColor",
    "#ffffff": "@onPrimaryColor"
};
export default makePlaceholders(patchMetadata(metadata, hacks), map);
