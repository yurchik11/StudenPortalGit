/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
var flexDictionary = {
    vertical: "column",
    horizontal: "row",
    top: "flex-start",
    middle: "center",
    center: "center",
    bottom: "flex-end",
    left: "flex-start",
    right: "flex-end",
    orientation: "flex-direction"
};
function getMainSizePropertyName(orientation) {
    if (orientation === void 0) { orientation = "vertical"; }
    return orientation === "vertical" ? "height" : "width";
}
function parseMargin(style) {
    var div = document.createElement("div");
    if (style.margin) {
        div.style.margin = style.margin;
        return div.style;
    }
    return style;
}
function imitateMarginsInBlockBehavior(style, propertyName, margin1, margin2) {
    var _a;
    if ((margin1 || margin2) && style[propertyName] && !style[propertyName].endsWith("px")) {
        return tslib_1.__assign({}, style, (_a = {}, _a[propertyName] = "calc(" + style[propertyName] + " - " + (margin1 || "0px") + " - " + (margin2 || "0px") + ")", _a));
    }
    return tslib_1.__assign({}, style);
}
function needToPreventShrink(style, orientation) {
    var mainSizePropertyName = getMainSizePropertyName(orientation), mainSizePpropertyValue = style[mainSizePropertyName] || "";
    return mainSizePpropertyValue.toString().indexOf("%") === -1;
}
function recalculateStyles(style, orientation) {
    if (style === void 0) { style = {}; }
    var _a = parseMargin(style), marginBottom = _a.marginBottom, marginLeft = _a.marginLeft, marginRight = _a.marginRight, marginTop = _a.marginTop, _b = orientation === "vertical"
        ? { property: "width", margin1: marginLeft, margin2: marginRight }
        : { property: "height", margin1: marginTop, margin2: marginBottom }, property = _b.property, margin1 = _b.margin1, margin2 = _b.margin2;
    return imitateMarginsInBlockBehavior(style, property, margin1, margin2);
}
export function getFlexStyle(style, orientation) {
    if (style === void 0) { style = {}; }
    if (orientation === void 0) { orientation = "vertical"; }
    var flexDirection = style.flexDirection || "column", flexStyle = { display: "flex", flexDirection: flexDirection };
    if (needToPreventShrink(style, orientation)) {
        flexStyle = tslib_1.__assign({}, flexStyle, { flexShrink: 0 });
    }
    return tslib_1.__assign({}, flexStyle, recalculateStyles(style, orientation));
}
export function convertToFlexProperty(orientation) {
    if (orientation === "vertical") {
        var flexDictionaryExtneded = tslib_1.__assign({}, flexDictionary, { verticalAlign: "justifyContent", horizontalAlign: "alignItems" });
    }
    else {
        flexDictionaryExtneded = tslib_1.__assign({}, flexDictionary, { verticalAlign: "alignItems", horizontalAlign: "justifyContent" });
    }
    return function (settings) {
        var _a;
        var converted = {};
        // tslint:disable-next-line:forin
        for (var key in settings) {
            converted = tslib_1.__assign({}, converted, (_a = {}, _a[flexDictionaryExtneded[key]] = flexDictionaryExtneded[settings[key]], _a));
        }
        return converted;
    };
}
export function extractFlex(styles) {
    var flexDirection = styles.flexDirection, justifyContent = styles.justifyContent, alignItems = styles.alignItems, flexWrap = styles.flexWrap, flexFlow = styles.flexFlow, alignContent = styles.alignContent, flexBasis = styles.flexBasis, flexGrow = styles.flexGrow, flexShrink = styles.flexShrink, flex = styles.flex, alignSelf = styles.alignSelf, order = styles.order, otherStyles = tslib_1.__rest(styles, ["flexDirection", "justifyContent", "alignItems", "flexWrap", "flexFlow", "alignContent", "flexBasis", "flexGrow", "flexShrink", "flex", "alignSelf", "order"]), flexStyles = {
        flexDirection: flexDirection, justifyContent: justifyContent, alignItems: alignItems, flexWrap: flexWrap, flexFlow: flexFlow,
        alignContent: alignContent, flexBasis: flexBasis, flexGrow: flexGrow, flexShrink: flexShrink, flex: flex, alignSelf: alignSelf, order: order
    };
    Object.keys(flexStyles).forEach(function (key) { return flexStyles[key] === undefined && delete flexStyles[key]; });
    return {
        flexStyles: flexStyles,
        otherStyles: otherStyles
    };
}
