/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
var DataSourceRefreshStrategy = /** @class */ (function () {
    function DataSourceRefreshStrategy(dataSource) {
        this.dataSource = dataSource;
        this.enabled = true;
    }
    DataSourceRefreshStrategy.create = function (dataSource) {
        switch (dataSource["_refreshOnViewShown"]) {
            case "never":
                return null;
            case "always":
                return new DataSourceRefreshStrategy(dataSource);
            case "whenChanges":
            default:
                return new WhenChangesSourceRefreshStrategy(dataSource);
        }
    };
    DataSourceRefreshStrategy.prototype.refresh = function () {
        if (this.enabled) {
            this.dataSource.pageIndex(0);
            this.dataSource.load();
        }
    };
    DataSourceRefreshStrategy.prototype.dispose = function () { };
    return DataSourceRefreshStrategy;
}());
export { DataSourceRefreshStrategy };
var WhenChangesSourceRefreshStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(WhenChangesSourceRefreshStrategy, _super);
    function WhenChangesSourceRefreshStrategy(dataSource) {
        var _this = _super.call(this, dataSource) || this;
        _this.dataSource = dataSource;
        _this.callback = function () {
            _this.modified = true;
            _this.refresh();
        };
        _this.store = _this.dataSource.store();
        _this.store.on("modified", _this.callback);
        return _this;
    }
    WhenChangesSourceRefreshStrategy.prototype.refresh = function () {
        if (this.enabled && this.modified) {
            this.modified = false;
            _super.prototype.refresh.call(this);
        }
    };
    WhenChangesSourceRefreshStrategy.prototype.dispose = function () {
        this.store.off("modified", this.callback);
    };
    return WhenChangesSourceRefreshStrategy;
}(DataSourceRefreshStrategy));
var MonitorRefreshStrategy = /** @class */ (function () {
    function MonitorRefreshStrategy(dataSource, stores) {
        var _this = this;
        this.dataSource = dataSource;
        this.stores = stores;
        this.enabled = true;
        this.modified = false;
        this.refreshFunc = function () {
            _this.modified = true;
            _this.refresh();
        };
        this.stores.forEach(function (store) {
            store.on("modified", _this.refreshFunc);
        });
    }
    MonitorRefreshStrategy.prototype.refresh = function () {
        if (this.enabled) {
            this.dataSource.load();
            this.modified = false;
        }
    };
    MonitorRefreshStrategy.prototype.dispose = function () {
        var _this = this;
        this.stores.forEach(function (store) {
            store.off("modified", _this.refreshFunc);
        });
    };
    return MonitorRefreshStrategy;
}());
export { MonitorRefreshStrategy };
var ParameterRefreshStrategy = /** @class */ (function () {
    function ParameterRefreshStrategy(config, model, store, key) {
        this.config = config;
        this.model = model;
        this.store = store;
        this.key = key;
        this.enabled = true;
    }
    ParameterRefreshStrategy.create = function (config, model, store, key) {
        switch (config.refreshOnViewShown) {
            case "never":
                return null;
            case "always":
                return new ParameterRefreshStrategy(config, model, store, key);
            case "whenChanges":
            default:
                return new WhenChangesParameterRefreshStrategy(config, model, store, key);
        }
    };
    ParameterRefreshStrategy.prototype.refresh = function () {
        var _this = this;
        if (this.enabled && this.key) {
            this.store.byKey(this.key).then(function (data) {
                _this.model[_this.config.name] = data;
            });
        }
    };
    ParameterRefreshStrategy.prototype.dispose = function () { };
    return ParameterRefreshStrategy;
}());
export { ParameterRefreshStrategy };
var WhenChangesParameterRefreshStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(WhenChangesParameterRefreshStrategy, _super);
    function WhenChangesParameterRefreshStrategy(config, model, store, key) {
        var _this = _super.call(this, config, model, store, key) || this;
        _this.modified = false;
        _this.updatedHandler = function (key, values) {
            // NOTE: use double-equality for guid keys
            // tslint:disable-next-line:triple-equals
            if (key == _this.key) {
                _this.modified = true;
                _this.refresh();
            }
        };
        _this.store.on("updated", _this.updatedHandler);
        return _this;
    }
    WhenChangesParameterRefreshStrategy.prototype.refresh = function () {
        if (this.enabled && this.modified) {
            this.modified = false;
            _super.prototype.refresh.call(this);
        }
    };
    WhenChangesParameterRefreshStrategy.prototype.dispose = function () {
        this.store.off("updated", this.updatedHandler);
    };
    return WhenChangesParameterRefreshStrategy;
}(ParameterRefreshStrategy));
