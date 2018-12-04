/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { StoreFactory } from "./store-factory";
export function createStoreApi(stores) {
    return {
        load: function (storeId, options) {
            return stores[storeId].load(options);
        },
        byKey: function (storeId, key) {
            return stores[storeId].byKey(key);
        },
        keyOf: function (storeId, object) {
            return stores[storeId].keyOf(object);
        },
        save: function (storeId, object) {
            var store = stores[storeId], key = store.keyOf(object);
            return key === undefined ? store.insert(object) : store.update(key, object);
        },
        remove: function (storeId, objectOrKey) {
            return stores[storeId].remove(objectOrKey);
        },
    };
}
export function createStores(configs, runContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, StoreFactory.init(configs)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, (configs || []).reduce(function (stores, config) {
                            stores[config.id] = StoreFactory.createStore(config, stores, runContext);
                            return stores;
                        }, {})];
            }
        });
    });
}
