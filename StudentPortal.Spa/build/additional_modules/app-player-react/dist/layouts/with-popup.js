/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { WithContexts } from "../utils/with-contexts";
import { RunContext } from "../views/run-context";
import ReactPopup from "../widgets/popup-widget";
import { Visible } from "../widgets/visible-hoc";
export function withPopup(Component) {
    var _this = this;
    var baseSettings = {
        showTitle: false
    }, popupSettingsDict = {
        simplePopup: tslib_1.__assign({}, baseSettings, { shading: true, shadingColor: "white" }),
        popup: tslib_1.__assign({}, baseSettings)
    };
    return (function (props) {
        var _a = props, _b = _a.type, type = _b === void 0 ? "popup" : _b, _c = _a.popupSettings, popupSettings = _c === void 0 ? {} : _c, componentProps = tslib_1.__rest(_a, ["type", "popupSettings"]);
        return (React.createElement(WithContexts, { contexts: { runContext: RunContext } }, function (_a) {
            var runContext = _a.runContext;
            return (React.createElement(Visible, tslib_1.__assign({}, tslib_1.__assign({}, popupSettingsDict[type], popupSettings)), function (widgetProps) { return (React.createElement(ReactPopup, tslib_1.__assign({}, widgetProps), function (togglePopupVisible) {
                var navigateBack = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, togglePopupVisible()];
                            case 1:
                                _a.sent();
                                runContext.$functions.navigateBack();
                                return [2 /*return*/];
                        }
                    });
                }); };
                return (React.createElement(RunContext.Provider, { value: tslib_1.__assign({}, runContext, { $functions: tslib_1.__assign({}, runContext.$functions, { navigateBack: navigateBack }) }) },
                    React.createElement(Component, tslib_1.__assign({}, componentProps))));
            })); }));
        }));
    });
}
