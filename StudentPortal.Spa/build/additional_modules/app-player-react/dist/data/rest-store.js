/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import CustomStore from "devextreme/data/custom_store";
import { DataStoreDiag, setHeaders, proxyRequest, ajax } from "./utils";
import { getModelValue } from "../utils";
import { FunctionCompiler } from "../logic/function-compiler";
import * as traverse from "traverse";
var RestStore = /** @class */ (function (_super) {
    tslib_1.__extends(RestStore, _super);
    function RestStore(storeOptions, globalModel, diag) {
        if (diag === void 0) { diag = new DataStoreDiag(); }
        var _this = this;
        function createProcessResult(operationName) {
            var logic = storeOptions[operationName] && storeOptions[operationName].processResult, processResultCompiler = logic && new FunctionCompiler(logic);
            return processResultCompiler
                ? function (runContext) { return processResultCompiler.run(runContext, { callerId: operationName + ".processResult", callerType: "RestStore" }); }
                : function (runContext) { return runContext.$data; };
        }
        var processLoadResult = createProcessResult("load"), processByKeyResult = createProcessResult("byKey"), customStoreOptions = {
            key: storeOptions.key,
            load: function (loadOptions) {
                var runContext = { $global: globalModel, $options: loadOptions };
                return _this.getHandler({ storeOptions: storeOptions, operationName: "load", headers: storeOptions.headers, runContext: runContext, defaultMethod: "get", defaultGetAjaxData: null })
                    .then(function (data) { return processLoadResult(tslib_1.__assign({}, runContext, { $data: data })); })
                    .then(function (data) {
                    if ((data && data.map) && loadOptions.select) {
                        return data.map(function (item) { return loadOptions.select(item) || item; });
                    }
                    else {
                        return data;
                    }
                });
            },
            byKey: function (key) {
                var runContext = { $global: globalModel, $key: key };
                return _this.getHandler({ storeOptions: storeOptions, operationName: "byKey", headers: storeOptions.headers, runContext: runContext, defaultMethod: "get", defaultGetAjaxData: null })
                    .then(function (data) { return processByKeyResult(tslib_1.__assign({}, runContext, { $data: data })); });
            },
            insert: function (values) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var data;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getHandler({ runContext: { $global: globalModel, $data: values }, storeOptions: storeOptions, operationName: "insert", headers: storeOptions.headers, defaultMethod: "post", defaultGetAjaxData: function () { return values; } })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, this.keyOf(data)];
                    }
                });
            }); },
            update: function (key, values) {
                return _this.getHandler({
                    runContext: { $global: globalModel, $key: key, $data: values },
                    storeOptions: storeOptions, operationName: "update", headers: storeOptions.headers, defaultMethod: "patch", defaultGetAjaxData: function () { return values; }
                });
            },
            remove: function (key) {
                return _this.getHandler({ runContext: { $global: globalModel, $key: key }, storeOptions: storeOptions, operationName: "remove", dataType: "text", headers: storeOptions.headers, defaultMethod: "delete", defaultGetAjaxData: null });
            },
            totalCount: function (loadOptions) {
                return _this.getHandler({ runContext: { $global: globalModel, $options: loadOptions }, storeOptions: storeOptions, operationName: "totalCount", headers: storeOptions.headers, defaultMethod: "get", defaultGetAjaxData: null });
            }
        };
        _this = _super.call(this, tslib_1.__assign({}, storeOptions, customStoreOptions)) || this;
        _this._customLoadOptionsNames = storeOptions.customLoadOptions;
        _this._handlers = {};
        _this.diag = diag;
        return _this;
    }
    RestStore.prototype._customLoadOptions = function () {
        return this._customLoadOptionsNames || [];
    };
    RestStore._sendRequest = function (requestOptions, useProxy, diag) {
        var request = tslib_1.__assign({}, requestOptions, { headers: {}, dataType: requestOptions.dataType || "json", type: requestOptions.method ? requestOptions.method.toUpperCase() : "GET", contentType: "application/json; charset=utf-8" });
        setHeaders(requestOptions.headers, request);
        proxyRequest(useProxy, request);
        diag.setRequest(diag.currentTag, request);
        return ajax(request);
    };
    RestStore.prototype._eval = function (expr, runContext) {
        return expr ? getModelValue(expr, runContext, { callerType: "rest store url", callerId: "" }) : void 0;
    };
    RestStore.prototype._transformData = function (data, method) {
        if (data) {
            switch (method) {
                case "get":
                    traverse.forEach(data, function (val) {
                        if (val && !this.isRoot) {
                            if (val instanceof Date) {
                                data[this.key] = (val).toISOString();
                            }
                            else {
                                data[this.key] = "" + val;
                            }
                        }
                        else {
                            delete data[this.key];
                        }
                    });
                    break;
                case "post":
                case "patch":
                    data = JSON.stringify(data);
                    break;
                default:
                    break;
            }
        }
        return data;
    };
    RestStore.prototype.getHandler = function (options) {
        var _this = this;
        var operationName = options.operationName, defaultMethod = options.defaultMethod, defaultGetAjaxData = options.defaultGetAjaxData, currentRunContext = options.runContext, operation = options.storeOptions[operationName];
        if (!operation) {
            return Promise.reject("The data provider '" + options.storeOptions.id + "' operation '" + operationName + "' doesn't specified");
        }
        if (!this._handlers[options.operationName]) {
            var bizLogic_1 = operation.getAjaxData;
            var getAjaxData_1;
            if (bizLogic_1) {
                getAjaxData_1 = function (ajaxRunContext) { return new FunctionCompiler(bizLogic_1).run(ajaxRunContext, { callerId: options.storeOptions.id, callerType: "restStore." + operationName }); };
            }
            else {
                getAjaxData_1 = defaultGetAjaxData ? defaultGetAjaxData : function () { return null; };
            }
            this._handlers[operationName] = function (runContext) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var url, ajaxData, method, transformetAjaxData;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = this._getUrl(operation, runContext);
                            if (!operation || !url) {
                                return [2 /*return*/, Promise.reject("The data provider '" + options.storeOptions.id + "' operation '" + operationName + "' doesn't specified ulr")];
                            }
                            return [4 /*yield*/, getAjaxData_1(runContext)];
                        case 1:
                            ajaxData = _a.sent();
                            method = operation.method || defaultMethod, transformetAjaxData = this._transformData(this._eval(JSON.stringify(ajaxData), runContext), method);
                            return [2 /*return*/, RestStore._sendRequest({
                                    url: url,
                                    method: method,
                                    data: transformetAjaxData,
                                    dataType: options.dataType || options.storeOptions.dataType,
                                    headers: options.headers
                                }, options.storeOptions.useProxy, this.diag)];
                    }
                });
            }); };
        }
        return this._handlers[operationName](currentRunContext);
    };
    RestStore.prototype._getUrl = function (options, runContext) {
        try {
            var url = options.debugUrl || options.url;
            return url.startsWith("=") ? this._eval(url, runContext) : url;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    };
    return RestStore;
}(CustomStore));
export default RestStore;
