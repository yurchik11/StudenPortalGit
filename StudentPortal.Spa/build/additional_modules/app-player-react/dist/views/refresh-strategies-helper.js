/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import { DataSourceRefreshStrategy, MonitorRefreshStrategy, ParameterRefreshStrategy, } from "../model/refresh-strategies";
var RefreshStrategiesHelper = /** @class */ (function () {
    function RefreshStrategiesHelper() {
    }
    RefreshStrategiesHelper.createRefreshStrategies = function (model, viewConfig, stores, navigationParameters) {
        if (navigationParameters === void 0) { navigationParameters = {}; }
        var refreshStrategies = [];
        (viewConfig.dataSources || []).forEach(function (dataSourceConfig) {
            var dataSource = model[dataSourceConfig.id], refreshStrategy = DataSourceRefreshStrategy.create(dataSource);
            if (refreshStrategy) {
                refreshStrategies.push(refreshStrategy);
            }
            if (dataSource["_monitor"]) {
                var storeIds = dataSource["_monitor"].stores;
                if (storeIds && storeIds.length) {
                    var monitorStores = storeIds.map(function (storeId) { return stores[storeId]; });
                    refreshStrategies.push(new MonitorRefreshStrategy(dataSource, monitorStores));
                }
            }
        });
        (viewConfig.params || []).forEach(function (paramConfig) {
            var store = stores[paramConfig.type], key = navigationParameters[paramConfig.name];
            if (store && key) {
                var refreshStrategy = ParameterRefreshStrategy.create(paramConfig, model, store, key);
                if (refreshStrategy) {
                    refreshStrategies.push(refreshStrategy);
                }
            }
        });
        return refreshStrategies;
    };
    RefreshStrategiesHelper.processRefreshStrategies = function (refreshStrategies, enabled) {
        refreshStrategies.forEach(function (refreshStrategy) {
            refreshStrategy.enabled = enabled;
            refreshStrategy.refresh();
        });
    };
    RefreshStrategiesHelper.disposeRefreshStrategies = function (refreshStrategies) {
        refreshStrategies.forEach(function (refreshStrategy) {
            refreshStrategy.dispose();
        });
    };
    return RefreshStrategiesHelper;
}());
export { RefreshStrategiesHelper };
