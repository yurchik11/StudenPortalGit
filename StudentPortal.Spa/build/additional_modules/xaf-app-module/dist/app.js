/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { patchView, listModelProperty } from "./views";
import { getStores } from "./stores";
import { setRootDataServiceUrl } from "./widgets/widgets-registration";
import { setupConfirmationDialog } from "./dialogs";
import { patchNavigation } from "./navigation";
import { registerCommandDefinitions } from "./command-definitions";
var baseAppConfig = {
    commandDefinitions: [
        {
            id: "cmdLogout",
            text: "Logout",
            title: "Logout",
            type: "command.button",
            onExecute: {
                $code: function (_a) {
                    var $functions = _a.$functions;
                    $functions.logout();
                }
            }
        },
        {
            id: "cmdColumnChooser",
            text: "Toggle Column Chooser",
            icon: "columnchooser",
            showText: "inMenu",
            location: "after",
            locationInMenu: "never",
            type: "command.button",
            onExecute: {
                $code: function (_a) {
                    var $local = _a.$local;
                    var grid = $local[listModelProperty.selectionSourceWidget];
                    grid.getView("columnChooserView").isColumnChooserVisible() ? grid.hideColumnChooser() : grid.showColumnChooser();
                }
            }
        }
    ]
};
export function getAppConfig(device, config, rootServerUrl) {
    if (rootServerUrl === void 0) { rootServerUrl = "./"; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, views, _b, functions, navigation, _c, commandDefinitions, rest;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = config.views, views = _a === void 0 ? [] : _a, _b = config.functions, functions = _b === void 0 ? [] : _b, navigation = config.navigation, _c = config.commandDefinitions, commandDefinitions = _c === void 0 ? [] : _c, rest = tslib_1.__rest(config, ["views", "functions", "navigation", "commandDefinitions"]);
                    registerCommandDefinitions(commandDefinitions.concat(baseAppConfig.commandDefinitions));
                    return [4 /*yield*/, setupConfirmationDialog(config.confirmationSettings)];
                case 1:
                    _d.sent();
                    setRootDataServiceUrl(rootServerUrl);
                    return [2 /*return*/, tslib_1.__assign({}, baseAppConfig, { dataStores: getStores(rootServerUrl), views: views.map(patchView(device)), navigation: patchNavigation(navigation) }, rest)];
            }
        });
    });
}
