/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { Redirect } from "react-router-dom";
import { Path } from "../navigation/routing-parts";
import { getQueryVariables } from "../utils";
var Authorization = /** @class */ (function (_super) {
    tslib_1.__extends(Authorization, _super);
    function Authorization() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Authorization.prototype.render = function () {
        if (this.props.config) {
            var _a = this.props, routingParts = _a.routingParts, authenticated = _a.authenticated, loginView = _a.config.loginView, authorized = authenticated || this.areNotRequireAuthentication(routingParts);
            if (!authorized) {
                var loginUrl = this.generateLoginUrl(loginView, routingParts);
                return React.createElement(Redirect, { to: loginUrl, replace: true });
            }
            else if (authenticated && this.isLoginView(routingParts[0] && routingParts[0].config.id)) {
                var _b = getQueryVariables().returnUrl, returnUrl = _b === void 0 ? "/" : _b;
                return React.createElement(Redirect, { to: returnUrl, replace: true });
            }
        }
        return this.props.children;
    };
    Authorization.prototype.areNotRequireAuthentication = function (routingParts) {
        var _this = this;
        /**
         * TODO: potentially bugly place
         * Routing parts are empty when router could't redirect to default view, so we suppose that user authentification required
         */
        return routingParts.length && routingParts.every(function (routingPart) { return _this.isNotRequireAuthentication(routingPart.config.id); });
    };
    Authorization.prototype.isNotRequireAuthentication = function (viewId) {
        return this.isLoginView(viewId) || this.isAllowAnonimous(viewId);
    };
    Authorization.prototype.isLoginView = function (viewId) {
        return viewId === this.props.config.loginView;
    };
    Authorization.prototype.isAllowAnonimous = function (viewId) {
        var _a = this.props.config, allowAnonymous = _a.allowAnonymous, _b = _a.locations, locations = _b === void 0 ? [] : _b, location = locations.filter(function (_location) { return _location.view === viewId; })[0];
        return location ? location.allowAnonymous : allowAnonymous;
    };
    Authorization.prototype.generateLoginUrl = function (loginViewId, routingParts) {
        var returnUrl = routingParts.map(function (routingPart) { return Path.stringify(routingPart.config.id, routingPart.params); }).join("");
        return "/" + loginViewId + "?returnUrl=" + returnUrl;
    };
    return Authorization;
}(React.PureComponent));
export { Authorization };
