/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import dxArrayStore from "devextreme/data/array_store";
import dxDataSource from "devextreme/data/data_source";
import * as isPlainObject from "is-plain-object";
import * as ko from "knockout";
import createLinkedModel from "../model/linked-model";
import Model from "../model/model";
import { compileExpression, continueFunc, shorten } from "../utils";
import { showError } from "../utils/errors";
import { StoreFactory } from "./store-factory";
import { computedFilter } from "./utils";
var DataSource = /** @class */ (function () {
    function DataSource() {
    }
    DataSource.createLinkedConfig = function (config, runContext) {
        var dataSourceContext = tslib_1.__assign({}, runContext, { callerType: "datasource initializer", callerId: config.id }), result = createLinkedModel(config, dataSourceContext, {
            callerType: "link datasource model",
            callerId: config.id
        });
        return result;
    };
    DataSource.createDataSource = function (config, runContext, stores, services) {
        var _this = this;
        var calculatedFieldContext = tslib_1.__assign({}, runContext), callerInfo = {
            callerType: "datasource calculated fields",
            callerId: config.id
        }, linkedConfig = this.createLinkedConfig(config, runContext), storeDescriptor = Object.getOwnPropertyDescriptor(linkedConfig, "store"), reloadWhenSettingChanged = [];
        if (!storeDescriptor) {
            showError("Widget data source does not have a store. Please specify the store in the designer.");
        }
        // TODO: Vitik OData navigation property scenario.
        if (typeof linkedConfig.store === "string") {
            var store = stores[config.store];
            delete linkedConfig.store;
            linkedConfig.store = store;
        }
        else if (Array.isArray(linkedConfig.store)) {
            // tslint:disable-next-line:whitespace
            var dataStoreConfig = { id: "temp", type: "arrayProperty", array: linkedConfig.store };
            delete linkedConfig.store;
            linkedConfig.store = StoreFactory.createStore(dataStoreConfig, stores, runContext);
        }
        else if (typeof linkedConfig.store === "object") {
            var dataStoreConfig = config.store; // use original config because createStore create own linked config
            reloadWhenSettingChanged.push(function () {
                linkedConfig._observables.forEach(function (_a) {
                    var propPath = _a.propPath, value = _a.value, subscribe = _a.subscribe;
                    if (propPath.indexOf("store") === 0) {
                        subscribe(function () {
                            setTimeout(function () {
                                dataSource.reload();
                            });
                        });
                    }
                });
            });
            linkedConfig.store = StoreFactory.createStore(dataStoreConfig, stores, runContext);
        }
        if (linkedConfig.useClientFilter) {
            // tslint:disable-next-line:whitespace
            var expr = linkedConfig.filter, compiledExpr_1 = compileExpression(expr, callerInfo), filterFunc = function ($data) { return compiledExpr_1(tslib_1.__assign({}, runContext, { $data: $data })); };
            linkedConfig.filter = computedFilter(filterFunc, function () { return dataSource.load(); });
            var originalStoreLoad_1 = linkedConfig.store.load.bind(linkedConfig.store);
            var cacheStore_1;
            linkedConfig.store = Object.create(linkedConfig.store);
            linkedConfig.store.load = function (loadOptions) {
                var result;
                if (!cacheStore_1 || !loadOptions.skip) {
                    result = originalStoreLoad_1({}).then(function (data) {
                        if (Array.isArray(data)) {
                            //
                            dataSource["_cacheStore"] = cacheStore_1 = new dxArrayStore({ data: data });
                            return cacheStore_1.load(loadOptions);
                        }
                        else {
                            return data;
                        }
                    });
                }
                else {
                    result = cacheStore_1.load(loadOptions);
                }
                return result;
            };
        }
        var map;
        if (config.observables && config.observables.length) {
            map = continueFunc(map, function (item) {
                return _this.initDataObservables(item, config.observables);
            });
        }
        if (config.calculatedFields && config.calculatedFields.length) {
            map = continueFunc(map, function (item) {
                Model.createModel({ model: config.calculatedFields }, services, tslib_1.__assign({ $item: item }, calculatedFieldContext), callerInfo.callerId, item);
                delete item["dispose"];
                return tslib_1.__assign({}, item, { __originalItem: item });
            });
            if (linkedConfig.store && typeof linkedConfig.store.on === "function") {
                linkedConfig.store.on("updating", function (key, values) {
                    config.calculatedFields.forEach(function (field) {
                        delete values[field.name];
                    });
                });
                linkedConfig.store.on("updated", function (key, values) {
                    Model.createModel({ model: config.calculatedFields }, services, tslib_1.__assign({ $item: values }, calculatedFieldContext), callerInfo.callerId, values);
                    delete values.dispose;
                });
            }
        }
        else {
            if (map) {
                map = continueFunc(map, function (item) { return (tslib_1.__assign({}, item, { __originalItem: item })); });
            }
        }
        // tslint:disable-next-line:whitespace
        linkedConfig.select = map;
        /*
                    let postProcess: (data: any[]) => any[];
                    if(linkedConfig.group) {
                        const group = <string>linkedConfig.group;
                        delete linkedConfig.group;
        
                        postProcess = Utils.continueFunc(postProcess, data => {
                            return data.map((item) => {
                                return item[group];
                            }).filter((item, index, array) => {
                                return array.indexOf(item) === index;
                            }).map((key) => {
                                let items = data.filter((item) => {
                                    return item[group] === key;
                                });
                                return { key, items };
                            }).sort((a, b) => {
                                if(a.key > b.key) {
                                    return 1;
                                }
                                if(a.key < b.key) {
                                    return -1;
                                }
                                return 0;
                            });
                        });
                    }
                    linkedConfig.postProcess = postProcess;
        */
        var dataSource = new dxDataSource(linkedConfig);
        if (storeDescriptor && storeDescriptor.get && dataSource.store() instanceof dxArrayStore) {
            var array = ko.computed(storeDescriptor.get), subscr = array.subscribe(function (newArray) {
                var store = dataSource.store();
                if (!store) {
                    subscr.dispose();
                    array = null;
                }
                else {
                    store["_array"] = newArray;
                    dataSource.reload();
                }
            });
        }
        dataSource.on("customizeLoadResult", function (result) {
            if (result.data && !Array.isArray(result.data)) {
                var stringData = JSON.stringify(result.data), dataPreview = shorten(stringData, 20), message = "The " + config.id + " data source returned \"" + dataPreview + "\", whereas an array was expected. Data binding may be performed incorrectly.";
                showError(message);
            }
        });
        // DataSource won't subscribe to observables. Do this for him.
        var refreshedPropNames = ["filter", "sort"].concat((config.store && config.store.customLoadOptions) || []), refreshedObservables = linkedConfig._observables.filter(function (_a) {
            var propName = _a.propName;
            return refreshedPropNames.indexOf(propName) !== -1;
        });
        reloadWhenSettingChanged.push(function () {
            refreshedObservables.forEach(function (_a) {
                var value = _a.value, propName = _a.propName, subscribe = _a.subscribe;
                (typeof (dataSource[propName]) === "function") ? dataSource[propName](value) : dataSource.loadOptions()[propName] = value;
                subscribe(function (val) {
                    (typeof (dataSource[propName]) === "function") ? dataSource[propName](val) : dataSource.loadOptions()[propName] = val;
                    dataSource.load();
                });
            });
        });
        var originalLoad = dataSource.load.bind(dataSource);
        dataSource.load = function () {
            reloadWhenSettingChanged.forEach(function (m) { return m(); });
            dataSource.load = originalLoad;
            return originalLoad();
        };
        // Beresnev: remove after implementing in Xaf creating store in DataSource instead overridig url
        if (linkedConfig.loadOptions) {
            dataSource.on("customizeStoreLoadOptions", function (loadOptions) {
                console.warn("Deprecated option. Use store overriding instead overriding url in loadOptions.");
                loadOptions.storeLoadOptions.urlOverride = linkedConfig["loadOptions"].url;
            });
        }
        dataSource["_calculatedFields"] = config.calculatedFields;
        dataSource["_refreshOnViewShown"] = config.refreshOnViewShown;
        dataSource["_monitor"] = config.monitor;
        return dataSource;
    };
    DataSource.initDataObservables = function (srcData, observableSelectors) {
        if (!isPlainObject(srcData)) {
            return srcData;
        }
        var data = {};
        var descriptors = {};
        Object.keys(srcData).forEach(function (propertyName) {
            var value = srcData[propertyName];
            var descriptor = Model.getDescriptor({ initialValue: value, name: propertyName, observableSelectors: observableSelectors });
            descriptors[propertyName] = descriptor;
        });
        Object.defineProperties(data, descriptors);
        return data;
    };
    return DataSource;
}());
export default DataSource;
