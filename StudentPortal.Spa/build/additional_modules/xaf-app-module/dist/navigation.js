/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as traverse from "traverse";
import { actionsStoreId } from "./stores";
import { getCommandDefinitions } from "./command-definitions";
export function patchNavigation(navigation) {
    // Vitik: used for cmdLogout
    navigation.items = getCommandDefinitions(navigation.items);
    var result = traverse.forEach(navigation, function (value) {
        if (this.key === "$action") {
            delete this.parent.node.$action;
            this.parent.node.$code = createNavigationActionExecutor(value, navigation);
        }
        return;
    });
    return result;
}
function createNavigationActionExecutor(action, navigation) {
    var _this = this;
    return function (runContext) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var $functions, result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    $functions = runContext.$functions;
                    $functions.busy();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, $functions.load(actionsStoreId, action)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, processNavigationActionResponse(result, navigation, runContext)];
                case 3:
                    $functions.available();
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
}
function processNavigationActionResponse(_a, navigation, _b) {
    var newViewState = _a.newViewState;
    var $functions = _b.$functions;
    if (newViewState) {
        var activeItem_1 = navigation.items.find(function (item) { return item.id === newViewState.viewId; }), items = navigation.items.map(function (item) {
            return { isActive: item === activeItem_1 };
        });
        $functions.updateAppConfig({ navigation: { items: items } });
        $functions.navigateToView(newViewState.viewId);
    }
}
