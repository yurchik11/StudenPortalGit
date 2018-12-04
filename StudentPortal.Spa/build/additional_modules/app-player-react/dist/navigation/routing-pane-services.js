/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
var cashedViews = null, cashedMapViews = {};
export function getViewById(views) {
    cashedMapViews = cashedViews === views ? cashedMapViews : views.reduce(function (acc, view) { acc[view.id] = view; return acc; }, {});
    cashedViews = views;
    return function (viewId) {
        return cashedMapViews[viewId];
    };
}
export function getRoutingPartsWithPane(routingParts, availablePanes) {
    if (availablePanes.length === 0) {
        throw new Error("availablePanes shouldn't be an empty array");
    }
    return routingParts.map(function (routingPart) {
        var viewConfig = routingPart.config, pane = availablePanes.indexOf(viewConfig.pane) === -1 ? availablePanes[0] : viewConfig.pane;
        return tslib_1.__assign({}, routingPart, { pane: pane });
    });
}
