/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import { getViewById } from "./routing-pane-services";
export function getRoutingPartIdentifier(routingPart) {
    return routingPart.viewId + ":" + JSON.stringify(routingPart.params);
}
export function createRoutingPart(_a, views) {
    var viewId = _a.viewId, params = _a.params;
    var config = getViewById(views)(viewId);
    return {
        viewId: viewId,
        config: config,
        params: params,
        equals: function (routingPart) {
            return routingPart != null && getRoutingPartIdentifier(this) === getRoutingPartIdentifier(routingPart);
        }
    };
}
var Path = /** @class */ (function () {
    function Path() {
    }
    Path.parse = function (path) {
        var parts = path.split("/").filter(function (part) { return part !== ""; });
        return parts.map(function (part) {
            var result = part.split("=");
            if (result.length === 2) {
                return {
                    viewId: result[0],
                    params: JSON.parse(decodeURI(result[1]))
                };
            }
            else {
                return {
                    viewId: result[0]
                };
            }
        });
    };
    Path.stringify = function (viewId, params) {
        return "/" + viewId + (params ? "=" + encodeURI(JSON.stringify(params)) : "");
    };
    return Path;
}());
export { Path };
