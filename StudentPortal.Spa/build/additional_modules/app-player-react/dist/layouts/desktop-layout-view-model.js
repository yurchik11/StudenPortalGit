/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import compileEventHandlers from "../logic/event-compiler";
import { createSelector } from "reselect";
var globalToolbarItemsSelector = createSelector([function (_a) {
        var commands = _a.commands;
        return (commands);
    }, function (_a) {
        var runContext = _a.runContext;
        return (runContext);
    }], function (commands, runContext) { return (compileEventHandlers(commands, runContext)); });
var DesktopLayoutViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(DesktopLayoutViewModel, _super);
    function DesktopLayoutViewModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DesktopLayoutViewModel.prototype.render = function () {
        var _a = this.props, children = _a.children, appConfig = _a.appConfig, runContext = _a.runContext, displayedViewsInfo = _a.displayedViewsInfo;
        return children(this.createDesktopLayoutViewModel(displayedViewsInfo, appConfig, runContext));
    };
    DesktopLayoutViewModel.prototype.createDesktopLayoutViewModel = function (displayedViewsInfo, appConfig, runContext) {
        var mainView = this.getViewForPane(displayedViewsInfo, "main"), previewView = this.getViewForPane(displayedViewsInfo, "preview"), simplePopupView = this.getViewForPane(displayedViewsInfo, "simplePopup"), popupView = this.getViewForPane(displayedViewsInfo, "popup");
        return {
            rendered: false,
            globalToolbar: {
                items: globalToolbarItemsSelector({ commands: appConfig.commands, runContext: runContext })
            },
            mainPane: {
                visible: true,
                name: "main",
                displayedViewInfo: mainView
            },
            previewPane: {
                visible: !!previewView,
                name: "preview",
                displayedViewInfo: previewView
            },
            simplePopupPane: {
                visible: !!simplePopupView,
                name: "simplePopup",
                displayedViewInfo: simplePopupView
            },
            popupPane: {
                visible: !!popupView,
                name: "popup",
                displayedViewInfo: popupView
            }
        };
    };
    DesktopLayoutViewModel.prototype.getViewForPane = function (displayedViewsInfo, pane) {
        var mainInfo = this.getTopPane(displayedViewsInfo, "main"), paneInfo = this.getTopPane(displayedViewsInfo, pane);
        if ("main" === pane) {
            return mainInfo.displayedViewInfo;
        }
        else {
            if (mainInfo.index < paneInfo.index) {
                return paneInfo.displayedViewInfo;
            }
            return null;
        }
    };
    DesktopLayoutViewModel.prototype.getPaneValue = function (routingPart, indexInRoutingParts) {
        var _a = routingPart.config.pane, pane = _a === void 0 ? "main" : _a, isPopupPane = ["popup", "simplePopup"].indexOf(pane) !== -1;
        return indexInRoutingParts === 0 && !isPopupPane ? "main" : pane;
    };
    DesktopLayoutViewModel.prototype.getTopPane = function (displayedViewsInfo, pane) {
        var _this = this;
        var paneParts = displayedViewsInfo.filter(function (_a, indexInRoutingParts) {
            var routingPart = _a.routingPart;
            return _this.getPaneValue(routingPart, indexInRoutingParts) === pane;
        }), displayedViewInfo = paneParts[paneParts.length - 1], index = displayedViewsInfo.indexOf(displayedViewInfo);
        return { displayedViewInfo: displayedViewInfo, index: index };
    };
    return DesktopLayoutViewModel;
}(React.Component));
export { DesktopLayoutViewModel };
