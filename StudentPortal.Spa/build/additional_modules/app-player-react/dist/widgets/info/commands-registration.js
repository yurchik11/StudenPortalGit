/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import { registerCommand } from "./commands-info";
import { compose } from "../../utils";
import { withShortcut } from "./with-shortcut";
import { withFocusOnShortcut } from "./with-focus-on-shortcut";
import { customizeProps } from "./components-info";
registerCommand({
    name: "command.string",
    widgetName: "input",
    customizeWidget: compose(customizeProps(function (_a) {
        var onExecute = _a.onExecute;
        return ({
            stylingMode: "outlined",
            onValueChanged: function (e) {
                onExecute(e, e.value);
            }
        });
    }), withFocusOnShortcut)
});
registerCommand({
    name: "command.integer",
    widgetName: "numberbox",
    customizeWidget: compose(customizeProps(function (_a) {
        var onExecute = _a.onExecute;
        return ({
            stylingMode: "outlined",
            onValueChanged: function (e) {
                onExecute(e, e.value);
            }
        });
    }), withFocusOnShortcut)
});
registerCommand({
    name: "command.list",
    widgetName: "selectBox",
    customizeWidget: customizeProps(function (_a) {
        var onExecute = _a.onExecute;
        return {
            stylingMode: "outlined",
            onValueChanged: function (e) {
                onExecute(e, e.value);
            }
        };
    })
});
registerCommand({
    name: "command.button",
    widgetName: "button",
    customizeWidget: compose(withShortcut, customizeProps(function (props) {
        return ({
            onClick: function (e) {
                e.event.stopPropagation();
                return props.onExecute && props.onExecute(e);
            }
        });
    })),
    displayingContext: "toolbar"
});
registerCommand({
    name: "command.singleChoiceAction",
    loader: function () { return import("../actions/single-choice-action"); },
    customizeWidget: customizeProps(function (_a) {
        var onExecute = _a.onExecute;
        return ({
            onExecute: function (e) {
                return onExecute(e, e.itemData.text);
            }
        });
    })
});
registerCommand({
    name: "command.mobileSingleChoiceAction",
    loader: function () { return import("../actions/mobile-single-choice-action"); },
    customizeWidget: customizeProps(function (_a) {
        var onExecute = _a.onExecute;
        return ({
            onExecute: function (e) {
                return onExecute(e, e.itemData.text);
            }
        });
    }),
    displayingContext: "popup"
});
registerCommand({
    name: "popup",
    loader: function () { return import("../popup-widget"); }
});
registerCommand({
    name: "divider",
    loader: function () { return import("../divider-widget"); }
});
