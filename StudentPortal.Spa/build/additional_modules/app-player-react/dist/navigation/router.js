/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import createHistory from "history/createBrowserHistory";
import * as React from "react";
import { Route, Router } from "react-router-dom";
import { showError } from "../utils/errors";
import { RunContext } from "../views/run-context";
import { createRouterApi } from "./router-api";
import { createRoutingPart, Path } from "./routing-parts";
var AppPlayerRouter = /** @class */ (function (_super) {
    tslib_1.__extends(AppPlayerRouter, _super);
    function AppPlayerRouter(props) {
        var _this = _super.call(this, props) || this;
        var _a = _this.props, appConfig = _a.appConfig, _b = _a.history, history = _b === void 0 ? createHistory() : _b, parametersProcessor = _a.parametersProcessor, runContext = _a.runContext, routerApi = createRouterApi(history, appConfig, parametersProcessor);
        _this.state = {
            history: history,
            runContext: tslib_1.__assign({}, runContext, { $functions: tslib_1.__assign({}, runContext.$functions, routerApi) })
        };
        return _this;
    }
    AppPlayerRouter.prototype.render = function () {
        var _a = this.props, appConfig = _a.appConfig, children = _a.children, _b = this.state, history = _b.history, runContext = _b.runContext;
        return (React.createElement(RunContext.Provider, { value: runContext },
            React.createElement(Router, { history: history },
                React.createElement(Route, { exact: true, path: "/(.*)" }, function (_a) {
                    var match = _a.match;
                    var routingParts = Path.parse(match.url).map(function (p) { return (createRoutingPart(p, appConfig.views)); });
                    return React.createElement(Redirector, { children: children, routingParts: routingParts, runContext: runContext });
                }))));
    };
    return AppPlayerRouter;
}(React.PureComponent));
export { AppPlayerRouter };
var Redirector = /** @class */ (function (_super) {
    tslib_1.__extends(Redirector, _super);
    function Redirector(props) {
        var _this = _super.call(this, props) || this;
        _this.validate(props, false);
        return _this;
    }
    Redirector.prototype.shouldComponentUpdate = function (nextProps) {
        this.validate(nextProps, true);
        return this.valid;
    };
    Redirector.prototype.render = function () {
        var _a = this.props, children = _a.children, routingParts = _a.routingParts;
        return this.valid ? children(routingParts) : null;
    };
    Redirector.prototype.componentDidMount = function () {
        this.validate(this.props, true);
    };
    Redirector.prototype.validate = function (props, mounted) {
        this.valid = true;
        var routingParts = props.routingParts, runContext = props.runContext;
        var areRoutingPartsEmpty = !routingParts.length;
        if (areRoutingPartsEmpty) {
            if (mounted) {
                runContext.$functions.navigateToDefaultView(runContext);
            }
            this.valid = false;
        }
        var unknownRoutingPart = routingParts.find(function (routingPart) { return !routingPart.config; });
        if (unknownRoutingPart) {
            if (mounted) {
                showError("Error 404: View " + unknownRoutingPart.viewId + " not found");
                runContext.$functions.navigateToDefaultView(runContext);
            }
            this.valid = false;
        }
    };
    return Redirector;
}(React.Component));
export { Redirector };
