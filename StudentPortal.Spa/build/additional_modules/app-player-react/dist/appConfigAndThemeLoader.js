/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import * as Loadable from "react-loadable";
import { Loading } from "./common/loading";
export function AppConfigAndThemeLoader(_a) {
    var _this = this;
    var appConfigSource = _a.appConfigSource, children = _a.children;
    var Component = Loadable({
        loader: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, appConfig, ThemeGenerator, readyCallback;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            appConfigSource,
                            import("devextreme-theme"),
                            import("devextreme/core/utils/ready_callbacks")
                        ])];
                    case 1:
                        _a = _b.sent(), appConfig = _a[0], ThemeGenerator = _a[1].ThemeGenerator, readyCallback = _a[2];
                        return [4 /*yield*/, ThemeGenerator.applyTheme(appConfig)];
                    case 2:
                        _b.sent();
                        readyCallback.fire();
                        return [2 /*return*/, appConfig];
                }
            });
        }); },
        loading: Loading,
        render: function (appConfig) { return children(appConfig); }
    });
    return React.createElement(Component, null);
}
