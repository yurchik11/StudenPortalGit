/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { transformISODates } from "../utils/date";
import { showError } from "../utils/errors";
import ODataStore from "./odata-store";
import RestStore from "./rest-store";
import ArrayStore from "./array-store";
import XappStore from "./designer-store";
import LocalStore from "devextreme/data/local_store";
import Guid from "devextreme/core/guid";
import createLinkedModel from "../model/linked-model";
import { initStoreCreators } from "./store-factory-creators";
var StoreFactory = /** @class */ (function () {
    function StoreFactory() {
    }
    StoreFactory.linkStoreOptions = function (dataStore, runContext) {
        var storeOptions = createLinkedModel(dataStore, runContext, { callerType: "data provider options", callerId: dataStore.id });
        storeOptions.errorHandler = function (error) {
            error.initiatorId = storeOptions.id;
            showError(error);
        };
        return storeOptions;
    };
    StoreFactory.init = function (configs) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, initStoreCreators(configs)];
                    case 1:
                        _a._resolvedCreators = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StoreFactory.createStore = function (dataStore, stores, runContext) {
        var store = null, storeOptions = this.linkStoreOptions(dataStore, runContext), customStore = this._resolvedCreators[storeOptions.type];
        if (customStore) {
            return customStore(storeOptions, stores, runContext);
        }
        else {
            store = StoreFactory.createPredefinedStore(storeOptions, stores, runContext, dataStore);
        }
        return store;
    };
    StoreFactory.makeKeyPropertyForArrayItems = function (key, array) {
        if (array === void 0) { array = []; }
        array.forEach(function (item) {
            if (item instanceof Object && !item[key]) {
                item[key] = new Guid().toString();
            }
        });
    };
    StoreFactory.createPredefinedStore = function (storeOptions, stores, runContext, dataStore) {
        var store;
        switch (storeOptions.type) {
            case "odata":
                store = new ODataStore(storeOptions, stores, runContext);
                break;
            case "arrayProperty":
                transformISODates(dataStore["array"]);
                store = new ArrayStore({ data: dataStore["array"] });
                break;
            case "array":
                var arrayStoreOptions = { key: dataStore.key, data: dataStore["array"] };
                if (arrayStoreOptions.key) {
                    this.makeKeyPropertyForArrayItems(arrayStoreOptions.key, arrayStoreOptions.data);
                }
                transformISODates(arrayStoreOptions.data);
                store = new ArrayStore(arrayStoreOptions);
                break;
            case "xapp":
                store = new XappStore(storeOptions, runContext.$global);
                break;
            case "rest":
                store = new RestStore(storeOptions, runContext.$global);
                break;
            case "local":
                var _a = storeOptions, localArray = _a.array, name_1 = _a.name, flushInterval = _a.flushInterval, immediate = _a.immediate;
                this.makeKeyPropertyForArrayItems(storeOptions.key, localArray);
                transformISODates(localArray);
                store = new LocalStore({
                    key: storeOptions.key,
                    name: name_1,
                    immediate: immediate,
                    flushInterval: flushInterval
                });
                if (store["_array"].length === 0) {
                    Array.prototype.push.apply(store["_array"], localArray);
                }
                break;
            default:
                console.error("Unknown store type '" + storeOptions.type + "'");
        }
        return store;
    };
    StoreFactory._resolvedCreators = {};
    return StoreFactory;
}());
export { StoreFactory };
