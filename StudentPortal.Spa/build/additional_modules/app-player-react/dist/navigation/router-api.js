/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { TypeInfoRepository, TYPES } from "../logic/types";
import { Path } from "./routing-parts";
import createLinkedModel from "../model/linked-model";
export function createRouterApi(history, appConfig, parametersProcessor) {
    return {
        navigateToView: function (viewId, params) {
            var navigation = appConfig.navigation, views = appConfig.views, view = views.filter(function (item) { return item.id === viewId; })[0];
            if (!view) {
                throw "View \"" + viewId + "\" has not found. Can not navigate to target view.";
            }
            var navigationParams = params && parametersProcessor.toNavigationValues(view, params);
            if (hasNavigationItem(navigation.items, viewId)) {
                var path = Path.stringify(viewId, navigationParams);
                history.replace(path);
            }
            else {
                var routingParts = Path.parse(history.location.pathname), isStepBack_1 = false, path_1 = "";
                routingParts.forEach(function (routingPart) {
                    isStepBack_1 = isStepBack_1 || routingPart.viewId === viewId; // TODO: Need compare parameters 
                    if (!isStepBack_1) {
                        path_1 += Path.stringify(routingPart.viewId, routingPart.params);
                    }
                });
                path_1 += Path.stringify(viewId, navigationParams);
                history.push(path_1);
            }
        },
        navigateToDefaultView: function (runContext) {
            executeDefaultNavigation(appConfig.navigation, runContext);
        },
        navigateBack: function () {
            history.goBack();
        }
    };
}
function hasNavigationItem(items, viewId) {
    if (items === void 0) { items = []; }
    return items.some(function (item) { return (item.id === viewId || hasNavigationItem(item.items, viewId)); });
}
function executeDefaultNavigation(navigation, runContext) {
    if (navigation && navigation.defaultItemId) {
        var defaultNavigationItem = findNavigationItem(navigation.items, navigation.defaultItemId);
        if (defaultNavigationItem) {
            if (defaultNavigationItem.onExecute && typeof defaultNavigationItem.onExecute.$code === "function") {
                defaultNavigationItem.onExecute.$code(runContext);
            }
            else {
                throw "Default navigation item " + navigation.defaultItemId + " doesn't have correct onExecute.";
            }
        }
        else {
            throw "Default navigation item " + navigation.defaultItemId + " has not found.";
        }
    }
    else {
        throw "Default navigation item has not set. Can not execute default navigation action.";
    }
}
function findNavigationItem(items, itemId) {
    if (items === void 0) { items = []; }
    var result = undefined;
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        if (item.id === itemId) {
            result = item;
        }
        else if (item.items) {
            result = findNavigationItem(item.items, itemId);
        }
        if (result) {
            break;
        }
    }
    return result;
}
var ParametersProcessor = /** @class */ (function () {
    function ParametersProcessor(typeInfoRepository, stores, sharedObjects) {
        if (typeInfoRepository === void 0) { typeInfoRepository = new TypeInfoRepository(); }
        if (stores === void 0) { stores = {}; }
        if (sharedObjects === void 0) { sharedObjects = {}; }
        this.typeInfoRepository = typeInfoRepository;
        this.stores = stores;
        this.sharedObjects = sharedObjects;
    }
    ParametersProcessor.prototype.toModelValues = function (viewConfig, routeValues, runContext, paramNames) {
        if (routeValues === void 0) { routeValues = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var viewId, _a, params, filteredParams, modelValues;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                viewId = viewConfig.id, _a = viewConfig.params, params = _a === void 0 ? [] : _a, filteredParams = paramNames ? params.filter(function (p) { return paramNames.indexOf(p.name) !== -1; }) : params, modelValues = filteredParams.map(function (parameter) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var paramName;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                paramName = parameter.routeParamName || parameter.name;
                                return [4 /*yield*/, this.toModelValue(viewId, parameter, routeValues[paramName], runContext)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
                return [2 /*return*/, params.reduce(function (accumulator, config, index) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var _a, _b;
                        return tslib_1.__generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _a = accumulator;
                                    _b = config.name;
                                    return [4 /*yield*/, modelValues[index]];
                                case 1:
                                    _a[_b] = _c.sent();
                                    return [2 /*return*/, accumulator];
                            }
                        });
                    }); }, {})];
            });
        });
    };
    ParametersProcessor.prototype.toModelValue = function (viewId, config, routeValue, runContext) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var typeInfo, store, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = createLinkedModel(config, runContext, { callerId: config.name, callerType: "parameter" });
                        if (config.shared) {
                            if (this.sharedObjects[viewId]) {
                                return [2 /*return*/, this.sharedObjects[viewId][config.name]];
                            }
                        }
                        typeInfo = this.typeInfoRepository.get(config.type);
                        if (!(typeInfo && typeInfo.kind === TYPES.STORE_TYPE)) return [3 /*break*/, 2];
                        store = this.stores[typeInfo.name];
                        return [4 /*yield*/, store.byKey(routeValue, config.extraParams)];
                    case 1:
                        data = _a.sent();
                        if (config.customProcess) {
                            return [2 /*return*/, config.customProcess(tslib_1.__assign({}, runContext, { $data: data }))];
                        }
                        else {
                            return [2 /*return*/, data];
                        }
                        _a.label = 2;
                    case 2:
                        if (routeValue === undefined) {
                            throw "Parameter is missing: " + config.name;
                        }
                        return [2 /*return*/, routeValue];
                }
            });
        });
    };
    ParametersProcessor.prototype.toNavigationValues = function (viewConfig, modelValues) {
        var _this = this;
        if (modelValues === void 0) { modelValues = {}; }
        var viewId = viewConfig.id, _a = viewConfig.params, params = _a === void 0 ? [] : _a;
        return params.reduce(function (accumulator, config) {
            var paramName = config.routeParamName || config.name, modelValue = modelValues[paramName] || config.defaultValue, pathParameter = _this.toNavigationValue(viewId, config, modelValue);
            accumulator[paramName] = pathParameter;
            return accumulator;
        }, {});
    };
    ParametersProcessor.prototype.toNavigationValue = function (viewId, config, modelValue) {
        if (modelValue === undefined) {
            throw "Parameter is missing: " + config.name;
        }
        if (config.shared) {
            if (!this.sharedObjects[viewId]) {
                this.sharedObjects[viewId] = {};
            }
            this.sharedObjects[viewId][config.name] = modelValue;
            return ParametersProcessor.SHARED_OBJECT_KEY;
        }
        var typeInfo = this.typeInfoRepository.get(config.type);
        if (typeInfo && typeInfo.kind === TYPES.STORE_TYPE) {
            var store = this.stores[typeInfo.name];
            return store.keyOf(modelValue) || modelValue;
        }
        return modelValue;
    };
    ParametersProcessor.SHARED_OBJECT_KEY = "shared-object";
    return ParametersProcessor;
}());
export { ParametersProcessor };
