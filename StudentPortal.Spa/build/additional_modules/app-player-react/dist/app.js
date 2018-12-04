/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import "../css/app.css";
import "./widgets/info/components-default-style-registration";
import * as React from "react";
import { AppConfigUpdater } from "./app-config-updater";
import { AppStateContext } from "./app-state";
import { AppConfigAndThemeLoader } from "./appConfigAndThemeLoader";
import { Authorization } from "./common/authorization";
import { Device } from "./layouts/device";
import { Layouts } from "./layouts/layouts";
import { AppPlayerRouter } from "./navigation/router";
import { Services } from "./services";
import { ServicesCreator } from "./services-creator";
import { WithContexts } from "./utils/with-contexts";
import { DisplayedViewsInfoProducer } from "./views/displayed-views-info-producer";
import { RunContext } from "./views/run-context";
import { DefaultStyleProvider } from "./widgets/component-default-styles-provider";
import { componentDefaultStyles } from "./widgets/info/components-default-style";
import * as A from "devextreme/core/config";
A.default({
    editorStylingMode: "filled"
});
var initialAppState = {
    displayedViewsInfo: [],
    cachedViewsInfo: {}
};
var App = /** @class */ (function (_super) {
    tslib_1.__extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = initialAppState;
        return _this;
    }
    App.prototype.render = function () {
        var _this = this;
        return (React.createElement(DefaultStyleProvider, { defaults: componentDefaultStyles },
            React.createElement(Device, null, function (device) {
                var appConfigFromProps = _this.props.appConfig || _this.props.appConfigSource(device);
                return (React.createElement(AppConfigAndThemeLoader, { appConfigSource: appConfigFromProps }, function (initialAppConfig) { return (React.createElement(AppConfigUpdater, { appConfig: initialAppConfig, appState: _this.state }, function (updateAppConfig, appConfig, updateAppState, appState) {
                    // console.log("renderer", appState);
                    return (React.createElement(AppStateContext.Provider, { value: appState },
                        React.createElement(ServicesCreator, { appConfig: appConfig, updateAppConfig: updateAppConfig, updateAppState: updateAppState }, function (_a) {
                            var authenticated = _a.authenticated;
                            return (React.createElement(WithContexts, { contexts: { runContext: RunContext, services: Services } }, function (_a) {
                                var runContext = _a.runContext, _b = _a.services, modelStorage = _b.modelStorage, parametersProcessor = _b.parametersProcessor, stores = _b.stores, typeInfoRepository = _b.typeInfoRepository;
                                return (React.createElement(AppPlayerRouter, { runContext: runContext, appConfig: appConfig, modelStorage: modelStorage, parametersProcessor: parametersProcessor, stores: stores, typeInfoRepository: typeInfoRepository }, function (routingParts) { return (React.createElement(Authorization, { config: appConfig.authorization, routingParts: routingParts, authenticated: authenticated },
                                    React.createElement(WithContexts, { contexts: { globalRunContext: RunContext, appState: AppStateContext, } }, function (_a) {
                                        var globalRunContext = _a.globalRunContext, _b = _a.appState, cachedViewsInfo = _b.cachedViewsInfo, displayedViewsInfo = _b.displayedViewsInfo;
                                        return (React.createElement(DisplayedViewsInfoProducer, { routingParts: routingParts, runContext: globalRunContext, cachedViewsInfo: cachedViewsInfo, displayedViewsInfo: displayedViewsInfo, modelStorage: modelStorage, typeInfoRepository: typeInfoRepository, parametersProcessor: parametersProcessor, stores: stores, appConfig: appConfig },
                                            React.createElement(Layouts, { appConfig: appConfig })));
                                    }))); }));
                            }));
                        })));
                })); }));
            })));
    };
    return App;
}(React.Component));
export { App };
