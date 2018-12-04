/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import createLinkedModel from "../model/linked-model";
import { getRoutingPartsWithPane } from "./routing-pane-services";
export function getBreadcrumbs(displayedViewsInfo, availablePanes, runContext) {
    if (runContext === void 0) { runContext = {}; }
    var routingPartWithPane = getRoutingPartsWithPane(displayedViewsInfo.map(function (v) { return v.routingPart; }), availablePanes), breadcrumbs = {};
    routingPartWithPane.forEach(function (routingPart) {
        var paneBreadcrumbs = breadcrumbs[routingPart.pane] || (breadcrumbs[routingPart.pane] = []), viewAttacment = displayedViewsInfo.filter(function (va) { return va.routingPart.config.id === routingPart.config.id; })[0], titleModel = createLinkedModel({ title: viewAttacment.routingPart.config.title }, tslib_1.__assign({}, runContext, { $local: viewAttacment.$local }), { callerId: viewAttacment.routingPart.config.id, callerType: "Breadcrumbs" }), observable = titleModel._observables[0];
        var bc = { value: titleModel.title };
        if (observable) {
            bc = tslib_1.__assign({}, bc, { observable: observable });
        }
        paneBreadcrumbs.push(bc);
    });
    return breadcrumbs;
}
