/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as isPlainObject from "is-plain-object";
import Guid from "devextreme/core/guid";
import dxODataStore from "devextreme/data/odata/store";
import { continueFunc, getModelValue, pipe } from "../utils";
import { propertyVisitor } from "../utils/property-visitor";
import { DataStoreDiag, proxyRequest, setHeaders } from "./utils";
function unwrapNestedLists(data) {
    var valueCallback = function (valueContext) { return valueContext.value; }, result = propertyVisitor(data, valueCallback, {
        getValueCallback: function (value, context) {
            return (isPlainObject(value) && value.results && Array.isArray(value.results)) ? value.results : propertyVisitor(value, valueCallback, context);
        }
    });
    return result;
}
function replaceKeysWithObjectLinks(store, object, stores) {
    var newObject = Object.keys(object).reduce(function (accumulator, key) {
        var value = object[key];
        if (key !== "__metadata" && !(value && typeof value === "object" && value.__deferred)) {
            accumulator[key] = value;
        }
        return accumulator;
    }, {});
    var navigationFields = (store.fields || []).filter(function (field) {
        return field.storeId && true;
    });
    navigationFields.forEach(function (field) {
        if (newObject[field.name]) {
            newObject[field.name] = {
                __metadata: {
                    uri: stores[field.storeId]["_byKeyUrl"](object[field.name])
                }
            };
        }
    });
    return newObject;
}
function isGUID(str) {
    if (typeof str !== "string") {
        return false;
    }
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}
function createGuids(data) {
    var valueCallback = function (valueContext) {
        var value = valueContext.value;
        if (isGUID(value)) {
            return new Guid(value);
        }
        else {
            return value;
        }
    };
    return propertyVisitor(data, valueCallback, { getValueCallback: function (value, context) { return propertyVisitor(value, valueCallback, context); } });
}
function prepareLoadOptions(loadOptions) {
    return loadOptions.filter ? tslib_1.__assign({}, loadOptions, { filter: createGuids(loadOptions.filter) }) : loadOptions;
}
function prepareKey(key, storeOptions) {
    return storeOptions.keyType === "Guid" ? new Guid(key) : key;
}
var ODataStore = /** @class */ (function (_super) {
    tslib_1.__extends(ODataStore, _super);
    function ODataStore(storeOptions, stores, runContext, diag) {
        if (runContext === void 0) { runContext = {}; }
        if (diag === void 0) { diag = new DataStoreDiag(); }
        var _this = _super.call(this, ODataStore.createODataStoreOptions(storeOptions, diag)) || this;
        _this.storeOptions = storeOptions;
        _this.stores = stores;
        // Note Beresnev: DevExtreme url overriding, for support calculatable url
        Object.defineProperty(_this, "_url", {
            get: function () {
                var url = String(storeOptions.debugUrl || storeOptions.url).replace(/\/+$/, ""), compiledUrl = ODataStore.compileUrl(url, runContext);
                // console.log([storeOptions.debugUrl, storeOptions.url, url, compiledUrl]);
                return compiledUrl;
            }
        });
        return _this;
    }
    ODataStore.compileUrl = function (url, runContext) {
        try {
            return getModelValue(url, runContext, { callerType: "odata url", callerId: "" });
        }
        catch (ignored) {
            return url;
        }
    };
    ODataStore.createODataStoreOptions = function (storeOptions, diag) {
        return {
            url: storeOptions.debugUrl || storeOptions.url,
            key: storeOptions.key,
            keyType: storeOptions.keyType,
            beforeSend: pipe(function (request) { return (setHeaders(storeOptions.headers, request), request); }, function (request) { return (proxyRequest(storeOptions.useProxy, request), request); }, function (request) { return (diag.setRequest(diag.currentTag, request), request); }),
            version: storeOptions.version,
            withCredentials: storeOptions.withCredentials !== undefined ? storeOptions.withCredentials : true
        };
    };
    ODataStore.prototype.load = function (loadOptions) {
        loadOptions.select = continueFunc(function (data) { return unwrapNestedLists(data); }, loadOptions.select || (function (data) { return data; }));
        return _super.prototype.load.call(this, prepareLoadOptions(loadOptions));
        // .catch(error => correctODataError(error)); // TODO: problem with devextreme deferred
    };
    ODataStore.prototype.byKey = function (key) {
        return _super.prototype.byKey.call(this, prepareKey(key, this.storeOptions)).then(function (data) { return unwrapNestedLists(data); });
    };
    ODataStore.prototype.insert = function (values) {
        return _super.prototype.insert.call(this, replaceKeysWithObjectLinks(this.storeOptions, values, this.stores));
    };
    ODataStore.prototype.update = function (key, values) {
        return _super.prototype.update.call(this, key, replaceKeysWithObjectLinks(this.storeOptions, values, this.stores));
    };
    ODataStore.prototype.remove = function (key) {
        return _super.prototype.remove.call(this, prepareKey(key, this.storeOptions));
    };
    ODataStore.prototype.totalCount = function (loadOptions) {
        return _super.prototype.totalCount.call(this, prepareLoadOptions(loadOptions));
    };
    return ODataStore;
}(dxODataStore));
export default ODataStore;
