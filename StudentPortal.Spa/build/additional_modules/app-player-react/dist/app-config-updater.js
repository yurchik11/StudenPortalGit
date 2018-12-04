/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import * as traverse from "traverse";
var AppConfigUpdater = /** @class */ (function (_super) {
    tslib_1.__extends(AppConfigUpdater, _super);
    function AppConfigUpdater(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            appConfig: props.appConfig,
            appState: props.appState,
            updateAppState: function (updateState) {
                _this.setState(function (prevState) {
                    return tslib_1.__assign({}, prevState, { appState: tslib_1.__assign({}, prevState.appState, updateState) });
                });
            },
            updateAppConfig: function (appConfigDiff) {
                var appConfig = props.appConfig, resultAppConfig = tslib_1.__assign({}, appConfig);
                var diffToResult = new Map();
                diffToResult.set(appConfigDiff, resultAppConfig);
                traverse(appConfigDiff).forEach(function (diffValue) {
                    if (this.isRoot) {
                        return;
                    }
                    if (this.notLeaf) {
                        var diffParent = this.parent.node, resultParent = diffToResult.get(diffParent), originalValue = resultParent[this.key];
                        var resultValue = void 0;
                        if (originalValue) {
                            resultValue = Array.isArray(originalValue) ? originalValue.slice() : tslib_1.__assign({}, originalValue);
                        }
                        else {
                            resultValue = diffValue;
                        }
                        resultParent[this.key] = resultValue;
                        diffToResult.set(diffValue, resultValue);
                    }
                    else {
                        var diffParent = this.parent.node, resultParent = diffToResult.get(diffParent);
                        resultParent[this.key] = diffValue;
                    }
                });
                _this.setState(function (prevState) {
                    return tslib_1.__assign({}, prevState, { appConfig: resultAppConfig });
                });
            }
        };
        return _this;
    }
    AppConfigUpdater.prototype.render = function () {
        var _a = this.state, updateAppConfig = _a.updateAppConfig, updateAppState = _a.updateAppState, appConfig = _a.appConfig, appState = _a.appState;
        return this.props.children(updateAppConfig, appConfig, updateAppState, appState);
    };
    return AppConfigUpdater;
}(React.Component));
export { AppConfigUpdater };
