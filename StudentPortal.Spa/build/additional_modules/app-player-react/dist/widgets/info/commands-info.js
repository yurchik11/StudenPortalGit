/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { registerWidget, customizeProps, registerInheritWidget } from "./components-info";
import { compose } from "../../utils/index";
// TODO: Memorize;
export function registerCommand(commandOptions) {
    var customizeWidget = commandOptions.customizeWidget, widgetName = commandOptions.widgetName, loader = commandOptions.loader, _a = commandOptions.displayingContext, displayingContext = _a === void 0 ? "value-toolbar" : _a, rest = tslib_1.__rest(commandOptions, ["customizeWidget", "widgetName", "loader", "displayingContext"]), commonOptions = tslib_1.__assign({}, rest, { displayingContext: displayingContext, customizeWidget: compose(customizeProps(onExecuteDisabler), customizeWidget) });
    if (widgetName) {
        registerInheritWidget(tslib_1.__assign({}, commonOptions, { inherit: widgetName }));
    }
    else {
        registerWidget(tslib_1.__assign({}, commonOptions, { loader: loader }));
    }
}
function onExecuteDisabler(props) {
    var _a = props.disabled, disabled = _a === void 0 ? false : _a, _b = props.visible, visible = _b === void 0 ? true : _b, onExecute = props.onExecute;
    return {
        onExecute: function () {
            if (!disabled && visible && typeof onExecute === "function") {
                return onExecute.apply(this, arguments);
            }
        }
    };
}
