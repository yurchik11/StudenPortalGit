/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { LoadPanel } from "devextreme-react/ui/load-panel";
import * as React from "react";
import { AppStateContext } from "../app-state";
import { Services } from "../services";
import { WithContexts } from "../utils/with-contexts";
import { RunContext } from "../views/run-context";
import { View } from "../views/view";
import { ViewsCacher } from "../views/views-cacher";
var Pane = /** @class */ (function (_super) {
    tslib_1.__extends(Pane, _super);
    function Pane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pane.prototype.render = function () {
        var _a = this.props, _b = _a.paneViewModel, visible = _b.visible, displayedViewInfo = _b.displayedViewInfo, style = _a.style;
        return (React.createElement("div", { className: this.props.classes, style: tslib_1.__assign({}, style, { display: visible ? "flex" : "none", height: "100%" }) },
            React.createElement(WithContexts, { contexts: { appStateContext: AppStateContext, serviceContext: Services, runContext: RunContext } }, function (_a) {
                var _b = _a.serviceContext, modelStorage = _b.modelStorage, parametersProcessor = _b.parametersProcessor, stores = _b.stores, typeInfoRepository = _b.typeInfoRepository, _c = _a.appStateContext, displayedViewsInfo = _c.displayedViewsInfo, cachedViewsInfo = _c.cachedViewsInfo, globalRunContext = _a.runContext;
                return (React.createElement(ViewsCacher, { displayedViewInfo: displayedViewInfo, runContext: globalRunContext, parametersProcessor: parametersProcessor, modelStorage: modelStorage, stores: stores, typeInfoRepository: typeInfoRepository, cachedViewsInfo: cachedViewsInfo, displayedViewsInfo: displayedViewsInfo }, function (cachedView) {
                    if (cachedView) {
                        // console.log("render ", cachedView.routingPart.config.id);
                    }
                    var runContext = tslib_1.__assign({}, globalRunContext, { $local: cachedView.$local });
                    return (React.createElement(RunContext.Provider, { value: runContext },
                        React.createElement("div", { id: cachedView.routingPart.config.id.replace("$", ""), className: "view-container" },
                            cachedView.isReady
                                ? null
                                : React.createElement(LoadPanel, { visible: true, position: { my: "center", at: "center", of: "#" + cachedView.routingPart.config.id.replace("$", "") } }),
                            React.createElement(View, { key: cachedView.routingPart.config.id, viewConfig: cachedView.routingPart.config, runContext: runContext }))));
                }));
            })));
    };
    return Pane;
}(React.Component));
export { Pane };
