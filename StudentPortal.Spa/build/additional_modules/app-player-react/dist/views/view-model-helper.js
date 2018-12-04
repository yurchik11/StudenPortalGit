/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import Model from "../model/model";
import { showError } from "../utils/errors";
var ViewModelHelper = /** @class */ (function () {
    function ViewModelHelper() {
    }
    ViewModelHelper.createModel = function (viewConfig, services, runContext, stores) {
        var model = Model.createLocalModel(viewConfig, services, runContext);
        Model.initializeDataSources(model, tslib_1.__assign({}, runContext, { $local: model }), services, stores, viewConfig.dataSources);
        return model;
    };
    // TODO: load Parameters should be in ViewModelCreator because we need maintain all views model, not only for showing view. 
    // See case with breadcrubms for "editing in the collection" in the New Xaf Layouts Maket
    ViewModelHelper.loadParameters = function (viewInfo, globalRunContext, parameterProcessor, paramNames) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, config, params, $local, localRunContext, values_1, reason_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = viewInfo.routingPart, config = _a.config, params = _a.params, $local = viewInfo.$local, localRunContext = tslib_1.__assign({}, globalRunContext, { $local: $local });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, parameterProcessor.toModelValues(config, params, localRunContext, paramNames)];
                    case 2:
                        values_1 = _b.sent();
                        Object.keys(values_1).forEach(function (name) {
                            localRunContext.$local[name] = values_1[name];
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        reason_1 = _b.sent();
                        showError(reason_1);
                        localRunContext.$functions.navigateToDefaultView(localRunContext);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ViewModelHelper.clearModel = function (displayedViewInfo, services, runContext) {
        var $local = displayedViewInfo.$local, config = displayedViewInfo.routingPart.config, emptyModel = Model.createLocalModel(config, services, runContext);
        (config.model || [])
            .filter(function (propertyConfig) { return !propertyConfig.getter; })
            .forEach(function (propertyConfig) {
            var propertyName = propertyConfig.name;
            $local[propertyName] = emptyModel[propertyName];
        });
    };
    return ViewModelHelper;
}());
export { ViewModelHelper };
