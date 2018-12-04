/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
var storeFactoryCreators = {};
export function initStoreCreators(configs) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var resolvedCreators, storeTypes, awaiters;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resolvedCreators = {}, storeTypes = Object.keys(configs.reduce(function (acc, store) {
                        acc[store.type] = 1;
                        return acc;
                    }, {})), awaiters = Object.keys(storeFactoryCreators)
                        .filter(function (key) { return storeTypes.indexOf(key) !== -1; })
                        .map(function (key) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var r;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Promise.resolve(storeFactoryCreators[key]())];
                                case 1:
                                    r = _a.sent();
                                    resolvedCreators[key] = r;
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(awaiters)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, resolvedCreators];
            }
        });
    });
}
export function registerStore(type, creator) {
    storeFactoryCreators[type] = creator;
}
