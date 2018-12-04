/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { createWithStyleComponent } from "../../widgets/with-style";
import { Button } from "devextreme-react/ui/button";
import { getBreadcrumbs } from "../../navigation/breadcrumbs";
import { ReactLabel } from "../../widgets/label-widget";
import { ReactStackPanel } from "../../widgets/stack-panel-widget";
import { WithContexts } from "../../utils/with-contexts";
import { RunContext } from "../../views/run-context";
import { AppStateContext } from "../../app-state";
var WithStyle = createWithStyleComponent({
    main: {
        marginLeft: "-9px",
        marginTop: "-6px"
    },
    button: {
        marginRight: "10px"
    },
    top: {
        fontSize: "18px",
        padding: "0px",
    },
    title: {
        fontWeight: "bold",
        padding: "0px",
        fontSize: "26px"
    },
    bottom: {
        fontWeight: "bold",
        marginTop: "-6px",
        padding: "0px",
        fontSize: "26px"
    }
});
var ReactDesktopNavigation = /** @class */ (function (_super) {
    tslib_1.__extends(ReactDesktopNavigation, _super);
    function ReactDesktopNavigation(props) {
        var _this = _super.call(this, props) || this;
        _this.subscriptions = [];
        _this.state = {};
        return _this;
    }
    ReactDesktopNavigation.prototype.separateBreadcrumbs = function (breadcrumbs) {
        if (breadcrumbs === void 0) { breadcrumbs = []; }
        var titles = breadcrumbs.map(function (breadcrumb) { return breadcrumb.value; }), title = titles.pop(), path = titles.join(" / ");
        return {
            top: title && path,
            bottom: title || path,
        };
    };
    ReactDesktopNavigation.prototype.refreshSubscription = function (breadcrumbs) {
        var _this = this;
        if (breadcrumbs === void 0) { breadcrumbs = []; }
        this.subscriptions.forEach(function (subscription) {
            subscription.dispose();
        });
        this.subscriptions = [];
        breadcrumbs.forEach(function (_a, index) {
            var observable = _a.observable;
            if (observable) {
                _this.subscriptions.push(observable.subscribe(function (text) {
                    breadcrumbs = breadcrumbs.slice();
                    if (breadcrumbs[index].value !== text) {
                        breadcrumbs[index] = { value: text };
                        _this.setState(function () { return (tslib_1.__assign({}, _this.separateBreadcrumbs(breadcrumbs))); });
                    }
                }));
            }
        });
    };
    ReactDesktopNavigation.prototype.render = function () {
        var _this = this;
        return (React.createElement(WithContexts, { contexts: { runContext: RunContext, appState: AppStateContext } }, function (_a) {
            var _b = _a.runContext, runContext = _b === void 0 ? _this.props.runContext : _b, _c = _a.appState, appState = _c === void 0 ? _this.props.appState : _c;
            var displayedViewsInfo = appState.displayedViewsInfo, navigateBack = runContext.$functions.navigateBack, breadcrumbs = getBreadcrumbs(displayedViewsInfo, ["main", "preview"], runContext)[_this.props.pane] || [], separatedBreadcrumbs = _this.separateBreadcrumbs(breadcrumbs), _d = _this.state, _e = _d.top, top = _e === void 0 ? separatedBreadcrumbs.top : _e, _f = _d.bottom, bottom = _f === void 0 ? separatedBreadcrumbs.bottom : _f;
            _this.refreshSubscription(breadcrumbs);
            return (React.createElement(WithStyle, { className: _this.props.className }, function (_a) {
                var buttonClass = _a.button, topClass = _a.top, bottomClass = _a.bottom, titleClass = _a.title, main = _a.main;
                return breadcrumbs.length > 1
                    ? (React.createElement(ReactStackPanel, { orientation: "horizontal", verticalAlign: "middle", className: main },
                        React.createElement(Button, { stylingMode: "text", icon: "arrowleft", onClick: navigateBack, className: buttonClass }),
                        React.createElement(ReactStackPanel, { orientation: "vertical", verticalAlign: "middle" },
                            React.createElement(ReactLabel, { text: top, className: topClass }),
                            React.createElement(ReactLabel, { text: bottom, className: bottomClass }))))
                    : (React.createElement(ReactLabel, { text: bottom, className: titleClass }));
            }));
        }));
    };
    ReactDesktopNavigation.prototype.componentWillUnmount = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.dispose();
        });
        this.subscriptions = [];
    };
    return ReactDesktopNavigation;
}(React.PureComponent));
export default ReactDesktopNavigation;
