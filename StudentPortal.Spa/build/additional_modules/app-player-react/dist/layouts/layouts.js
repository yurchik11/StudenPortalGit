/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import Media from "react-media";
import { AppStateContext } from "../app-state";
import { WithContexts } from "../utils/with-contexts";
import { RunContext } from "../views/run-context";
import { DesktopLayout } from "./desktop-layout";
import { MobileLayout } from "./mobile/mobile-layout";
import { TabletLayout } from "./tablet/tablet-layout";
var Layouts = /** @class */ (function (_super) {
    tslib_1.__extends(Layouts, _super);
    function Layouts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layouts.prototype.render = function () {
        var appConfig = this.props.appConfig;
        return (React.createElement(WithContexts, { contexts: { appState: AppStateContext, runContext: RunContext } }, function (_a) {
            var appState = _a.appState, runContext = _a.runContext;
            return (React.createElement(Media, { query: "(max-width: 599px)" }, function (media) {
                return media
                    ? (React.createElement(MobileLayout, { displayedViewsInfo: appState.displayedViewsInfo, appConfig: appConfig, runContext: runContext }))
                    : (React.createElement(Media, { query: "(max-width: 1024px)" }, function (matches) {
                        return matches
                            ? (React.createElement(TabletLayout, { displayedViewsInfo: appState.displayedViewsInfo, runContext: runContext, appConfig: appConfig }))
                            : (React.createElement(DesktopLayout, { displayedViewsInfo: appState.displayedViewsInfo, runContext: runContext, appConfig: appConfig }));
                    }));
            }));
        }));
    };
    return Layouts;
}(React.PureComponent));
export { Layouts };
