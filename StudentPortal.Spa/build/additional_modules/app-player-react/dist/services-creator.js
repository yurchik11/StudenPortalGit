/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { LoadPanel } from "devextreme-react/ui/load-panel";
import * as React from "react";
import * as Loadable from "react-loadable";
import { createStoreApi, createStores } from "./data/create-stores";
import { TypeInfoRepository } from "./logic/types";
import Model from "./model/model";
import { ModelStorage } from "./model/model-storage";
import { ParametersProcessor } from "./navigation/router-api";
import { Services } from "./services";
import { RunContext } from "./views/run-context";
import { continueFunc } from "./utils";
import * as shortcuts from "./common/shortcuts";
var ServicesCreator = /** @class */ (function (_super) {
    tslib_1.__extends(ServicesCreator, _super);
    function ServicesCreator(props) {
        var _this = _super.call(this, props) || this;
        _this.busy = function () {
            shortcuts.pushScope("busy");
            _this.setState(function (state) { return (tslib_1.__assign({}, state, { loadingCount: state.loadingCount + 1 })); });
        };
        _this.available = function () {
            shortcuts.popScope();
            _this.setState(function (state) { return (tslib_1.__assign({}, state, { loadingCount: state.loadingCount - 1 })); });
        };
        var appConfig = _this.props.appConfig;
        var servicesAwaiter = _this._createServices(appConfig);
        _this.component = Loadable({
            loader: function () {
                return servicesAwaiter.then(function (args) {
                    return args;
                });
            },
            loading: function () { return React.createElement("p", null, "Loading..."); },
            render: function (_a) {
                var services = _a.services, runContext = _a.runContext;
                var authenticated = services.modelStorage.get(_this.props.appConfig.id, "authenticated");
                return (React.createElement(Services.Provider, { value: services },
                    React.createElement(RunContext.Provider, { value: runContext }, _this.props.children({ authenticated: authenticated, services: services }))));
            }
        });
        _this.state = { loadingCount: 0 };
        return _this;
    }
    ServicesCreator.prototype._createServices = function (appConfig) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modelStorage, typeInfoRepository, runContext, $global, stores, parametersProcessor;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        modelStorage = new ModelStorage(appConfig.id), typeInfoRepository = new TypeInfoRepository(appConfig.dataStores), runContext = {}, $global = Model.createGlobalModel(appConfig, { modelStorage: modelStorage, typeInfoRepository: typeInfoRepository }, runContext);
                        return [4 /*yield*/, createStores(appConfig.dataStores, runContext)];
                    case 1:
                        stores = _a.sent(), parametersProcessor = new ParametersProcessor(typeInfoRepository, stores);
                        runContext.$global = $global;
                        $global.stores = stores;
                        runContext.$functions = tslib_1.__assign({}, this.createAuthApi(modelStorage), createStoreApi(stores), { busy: this.busy, available: this.available, updateAppConfig: this.props.updateAppConfig, updateAppState: this.props.updateAppState });
                        return [2 /*return*/, { services: { modelStorage: modelStorage, stores: stores, typeInfoRepository: typeInfoRepository, parametersProcessor: parametersProcessor }, runContext: runContext }];
                }
            });
        });
    };
    ServicesCreator.prototype.createAuthApi = function (modelStorage) {
        var _this = this;
        var setAuthenticated = function (value) {
            modelStorage.put(_this.props.appConfig.id, "authenticated", value);
            _this.setState(tslib_1.__assign({}, _this.state));
        };
        var unauthorizedErrorHandler = function (error) {
            if (error.message === "Unauthorized") {
                setAuthenticated(false);
            }
            return error;
        };
        var handlers = require("devextreme/data/errors");
        handlers.errorHandler = continueFunc(handlers.errorHandler, unauthorizedErrorHandler);
        return {
            login: function () {
                setAuthenticated(true);
            },
            logout: function () {
                setAuthenticated(false);
            }
        };
    };
    ServicesCreator.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return nextState.loadingCount === 0 || this.state.loadingCount === 0;
    };
    ServicesCreator.prototype.render = function () {
        var Component = this.component, loadingCount = this.state.loadingCount;
        return (React.createElement(React.Fragment, null,
            loadingCount ? React.createElement(LoadPanel, { visible: true }) : null,
            React.createElement(Component, null)));
    };
    return ServicesCreator;
}(React.Component));
export { ServicesCreator };
