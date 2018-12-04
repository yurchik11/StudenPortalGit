/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { setOrPush } from "../utils";
import { RefreshStrategiesHelper } from "./refresh-strategies-helper";
var ViewsCacher = /** @class */ (function (_super) {
    tslib_1.__extends(ViewsCacher, _super);
    function ViewsCacher(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            items: [],
            refreshStrategies: {}
        };
        return _this;
    }
    ViewsCacher.getDerivedStateFromProps = function (nextProps, prevState) {
        var _a;
        var displayedViewInfo = nextProps.displayedViewInfo, stores = nextProps.stores, displayedViewsInfo = nextProps.displayedViewsInfo, items = prevState.items.map(function (item) { return (tslib_1.__assign({}, item, { hidden: true })); });
        var refreshStrategies = prevState.refreshStrategies;
        if (displayedViewInfo) {
            var viewId_1 = displayedViewInfo.routingPart.config.id, shownInfo_1 = displayedViewsInfo.filter(function (info) { return info.routingPart.config.id === viewId_1; })[0];
            if (shownInfo_1) {
                var $local = shownInfo_1.$local, _b = shownInfo_1.routingPart, params = _b.params, config = _b.config;
                refreshStrategies = tslib_1.__assign({}, prevState.refreshStrategies, (_a = {}, _a[viewId_1] = prevState.refreshStrategies[viewId_1] || RefreshStrategiesHelper.createRefreshStrategies($local, config, stores, params), _a));
            }
            else {
                return null;
            }
            setOrPush(items, function (item) { return item.viewInfo.routingPart.config.id === shownInfo_1.routingPart.config.id; }, { viewInfo: shownInfo_1, hidden: false });
        }
        return {
            items: items,
            refreshStrategies: refreshStrategies
        };
    };
    ViewsCacher.prototype.render = function () {
        var _this = this;
        var items = this.state.items;
        return items.map(function (item) { return _this.renderView(item.viewInfo, item.hidden); });
    };
    ViewsCacher.prototype.renderView = function (displayedViewInfo, hidden) {
        return (React.createElement("div", { key: displayedViewInfo.routingPart.config.id, style: { display: hidden ? "none" : "flex", height: "100%", width: "100%" } },
            React.createElement(ChildrenUpdater, { shouldUpdate: !hidden }, this.props.children(displayedViewInfo))));
    };
    ViewsCacher.prototype.componentDidMount = function () {
        this.updateCachedInfos();
    };
    ViewsCacher.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var isNavigateBack = nextProps.displayedViewsInfo.length < this.props.displayedViewsInfo.length, isShownViewChanged = this.getShownViewInfo(this.state.items) !== this.getShownViewInfo(nextState.items);
        return isNavigateBack || isShownViewChanged;
    };
    ViewsCacher.prototype.getShownViewInfo = function (items) {
        var shownViewItem = items.filter(function (item) { return !item.hidden; })[0];
        return shownViewItem && shownViewItem.viewInfo;
    };
    ViewsCacher.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;
        this.updateCachedInfos();
        this.state.items.forEach(function (item) {
            var refreshStrategies = _this.state.refreshStrategies[item.viewInfo.routingPart.config.id];
            RefreshStrategiesHelper.processRefreshStrategies(refreshStrategies, !item.hidden);
        });
    };
    ViewsCacher.prototype.componentWillUnmount = function () {
        var _this = this;
        this.clearCachedInfos();
        Object.keys(this.state.refreshStrategies)
            .forEach(function (id) { return RefreshStrategiesHelper.disposeRefreshStrategies(_this.state.refreshStrategies[id]); });
    };
    // #region cached infos
    ViewsCacher.prototype.updateCachedInfos = function () {
        var _a = this.props, $functions = _a.runContext.$functions, cachedViewsInfo = _a.cachedViewsInfo, renderedInfos = this.state.items.map(function (item) { return item.viewInfo; }), missingInfos = renderedInfos.filter(function (renderedInfo) { return !cachedViewsInfo[renderedInfo.routingPart.config.id]; });
        if (missingInfos.length) {
            cachedViewsInfo = tslib_1.__assign({}, cachedViewsInfo);
            missingInfos.forEach(function (missingInfo) {
                cachedViewsInfo[missingInfo.routingPart.config.id] = missingInfo;
            });
            $functions.updateAppState({ cachedViewsInfo: cachedViewsInfo });
        }
    };
    ViewsCacher.prototype.clearCachedInfos = function () {
        var $functions = this.props.runContext.$functions;
        $functions.updateAppState({ cachedViewsInfo: {} });
    };
    return ViewsCacher;
}(React.Component));
export { ViewsCacher };
var ChildrenUpdater = /** @class */ (function (_super) {
    tslib_1.__extends(ChildrenUpdater, _super);
    function ChildrenUpdater() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildrenUpdater.prototype.shouldComponentUpdate = function (nextProps) {
        return nextProps.shouldUpdate;
    };
    ChildrenUpdater.prototype.render = function () {
        return this.props.children;
    };
    return ChildrenUpdater;
}(React.Component));
