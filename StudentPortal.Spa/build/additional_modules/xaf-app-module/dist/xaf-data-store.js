/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import CustomStore from "devextreme/data/custom_store";
import { createStore as aspCreateStore } from "devextreme-aspnet-data-nojquery";
import JQuery from "app-player-react/dist/utils/jquery.stub";
var customLoadOptionsNames = ["viewId", "currentObject", "propertyName", "viewState", "getViewState"];
var XafDataStore = /** @class */ (function (_super) {
    tslib_1.__extends(XafDataStore, _super);
    function XafDataStore(options) {
        var _this = this;
        var patchedOptions = tslib_1.__assign({}, options, { 
            // list-view load
            load: function (loadOptions) {
                if (loadOptions.searchValue) {
                    loadOptions.filter = [loadOptions.searchExpr, loadOptions.searchOperation, loadOptions.searchValue];
                }
                var _a = loadOptions, viewId = _a.viewId, currentObject = _a.currentObject, propertyName = _a.propertyName, getViewState = _a.getViewState, viewState = _a.viewState, aspNetLoadOptions = tslib_1.__rest(_a, ["viewId", "currentObject", "propertyName", "getViewState", "viewState"]), _b = (getViewState ? getViewState() : viewState) || { criteria: undefined, objectsState: undefined }, criteria = _b.criteria, objectsState = _b.objectsState, key = currentObject && (_this.keyOf(currentObject) || "New"), loadUrl = "" + options.url + [viewId, key, propertyName].reduce(function (a, s) { return a += (s !== undefined ? "/" + s : ""); }, ""), postData = { criteria: criteria, objectsState: objectsState, currentObject: currentObject, loadOptions: aspNetLoadOptions };
                var aspNetOptions = _this.getAspNetOption(options, loadUrl, postData);
                var _underlineStore = aspCreateStore(aspNetOptions);
                return _underlineStore.load(aspNetLoadOptions);
            }, 
            // get current lookup value
            byKey: function (key, extra) {
                var _a = extra, currentObject = _a.currentObject, propertyName = _a.propertyName;
                // search lookup value.
                if (currentObject && propertyName) {
                    if (currentObject[propertyName] && currentObject[propertyName].Oid !== key) {
                        throw new Error("Not implemented on server side");
                    }
                    return currentObject[propertyName];
                }
                else {
                    if (!currentObject) {
                        return null;
                    }
                    throw new Error("Not supported");
                }
            } });
        _this = _super.call(this, patchedOptions) || this;
        return _this;
    }
    XafDataStore.prototype._customLoadOptions = function () {
        return customLoadOptionsNames;
    };
    XafDataStore.prototype.getAspNetOption = function (options, loadUrl, postData) {
        return tslib_1.__assign({}, options, { loadUrl: loadUrl, loadMethod: "POST", onBeforeSend: function (_, ajaxSetting) {
                ajaxSetting.xhrFields = {
                    withCredentials: true
                };
                ajaxSetting.headers = {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                };
                ajaxSetting.cache = true;
                ajaxSetting.data = JSON.stringify(postData);
            } });
    };
    return XafDataStore;
}(CustomStore));
export { XafDataStore };
var serverCache = {};
var XafModelActionStore = /** @class */ (function (_super) {
    tslib_1.__extends(XafModelActionStore, _super);
    function XafModelActionStore(options) {
        var _this = this;
        var patchedOptions = tslib_1.__assign({}, options, { 
            // NOTE used for data/actions
            load: function (loadOptions) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a, viewId, viewState, selectedObjects, propertyName, actionId, actionParameter, aspNetLoadOptions, _b, criteria, objectsState, currentObject, key, loadUrl, postData, responce;
                var _this = this;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (loadOptions.searchValue) {
                                loadOptions.filter = [loadOptions.searchExpr, loadOptions.searchOperation, loadOptions.searchValue];
                            }
                            _a = loadOptions, viewId = _a.viewId, viewState = _a.viewState, selectedObjects = _a.selectedObjects, propertyName = _a.propertyName, actionId = _a.actionId, actionParameter = _a.actionParameter, aspNetLoadOptions = tslib_1.__rest(_a, ["viewId", "viewState", "selectedObjects", "propertyName", "actionId", "actionParameter"]), _b = viewState || {}, criteria = _b.criteria, objectsState = _b.objectsState, currentObject = _b.currentObject, key = this.key() && currentObject && (this.keyOf(currentObject) || "New"), loadUrl = "" + options.url + [viewId, key, propertyName].reduce(function (a, s) { return a += (s ? "/" + s : ""); }, ""), postData = { viewState: viewState, criteria: criteria, currentObject: currentObject, objectsState: objectsState, selectedObjects: (selectedObjects || []).map(function (x) { return _this.keyOf(x) || x; }), loadOptions: aspNetLoadOptions, actionId: actionId, actionParameter: actionParameter };
                            return [4 /*yield*/, this._execRequest(loadUrl, postData)];
                        case 1:
                            responce = _c.sent();
                            if (responce.newViewState && responce.newViewState.currentObject) {
                                serverCache[JSON.stringify({ key: this.keyOf(responce.newViewState.currentObject) || null, viewId: responce.newViewState.viewId })] = responce.newViewState;
                            }
                            return [2 /*return*/, this.processResponse(responce)];
                    }
                });
            }); }, 
            // NOTE bykey used for data/model endpoint
            byKey: function (key, extra) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var viewId, currentObject, viewState, aspNetLoadOptions, _a, criteria, objectsState, 
                // currentObject needed if propertyName specicied for find object in property collection. Otherwise we load data by key
                postData, cacheKey, cachedValue, url, response;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!extra || !extra.viewId) {
                                throw new Error("viewId property for store extra parameter doesn't specified");
                            }
                            viewId = extra.viewId, currentObject = extra.currentObject, viewState = extra.viewState, aspNetLoadOptions = tslib_1.__rest(extra, ["viewId", "currentObject", "viewState"]), _a = viewState || {}, criteria = _a.criteria, objectsState = _a.objectsState, postData = { currentObject: currentObject, criteria: criteria, objectsState: objectsState, loadOptions: aspNetLoadOptions }, cacheKey = JSON.stringify({ key: key, viewId: viewId }), cachedValue = serverCache[cacheKey], url = options.url + "/" + viewId + "/" + key;
                            if (!cachedValue) return [3 /*break*/, 1];
                            delete serverCache[cacheKey];
                            response = { viewState: cachedValue };
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, this._execRequest(url, postData)];
                        case 2:
                            response = _b.sent();
                            _b.label = 3;
                        case 3: return [2 /*return*/, this.processResponse(response)];
                    }
                });
            }); } });
        _this = _super.call(this, patchedOptions) || this;
        return _this;
    }
    XafModelActionStore.prototype._customLoadOptions = function () {
        return customLoadOptionsNames;
    };
    XafModelActionStore.prototype.processResponse = function (response) {
        var viewState = response.viewState, restResponce = tslib_1.__rest(response, ["viewState"]);
        viewState = !!viewState ? viewState : { currentObject: undefined, objectsState: undefined, criteria: undefined };
        return tslib_1.__assign({}, restResponce, { currentObject: viewState.currentObject, viewState: viewState });
    };
    XafModelActionStore.prototype._execRequest = function (url, postData) {
        return JQuery.ajax({
            xhrFields: {
                withCredentials: true
            },
            dataType: "json",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            url: url,
            data: JSON.stringify(postData)
        });
    };
    return XafModelActionStore;
}(CustomStore));
export { XafModelActionStore };
export function createDataStore(options) {
    return new XafDataStore(options);
}
export function createModelActionStore(options) {
    return new XafModelActionStore(options);
}
