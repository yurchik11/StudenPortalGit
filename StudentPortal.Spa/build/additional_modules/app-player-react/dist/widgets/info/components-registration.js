/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { isString } from "util";
import { withScrollable } from "../with-scrollable";
import { registerWidget } from "./components-info";
import * as React from "react";
import { withTheme } from "../with-theme";
registerWidget({
    name: "fileImage",
    loader: function () { return import("../file-image-widget").then(function (_a) {
        var ReactFileImage = _a.ReactFileImage;
        return ReactFileImage;
    }); }
});
registerWidget({
    name: "form",
    loader: function () { return import("../form-widget").then(function (_a) {
        var ReactForm = _a.ReactForm;
        return ReactForm;
    }); },
    customizeWidget: withScrollable
});
registerWidget({
    name: "label",
    loader: function () { return import("../label-widget").then(function (_a) {
        var ReactLabel = _a.ReactLabel;
        return ReactLabel;
    }); }
});
registerWidget({
    name: "link",
    loader: function () { return import("../link-widget").then(function (_a) {
        var ReactLink = _a.ReactLink;
        return ReactLink;
    }); }
});
registerWidget({
    name: "button",
    loader: function () { return import("devextreme-react/ui/button").then(function (_a) {
        var Button = _a.Button;
        return Button;
    }); },
    customizeWidget: function (Widget) { return function (props) {
        var kind = props.kind, style = props.style, _a = props.stylingMode, stylingMode = _a === void 0 ? (!kind || kind === "normal") ? "outlined" : "contained" : _a, _b = props.showText, showText = _b === void 0 ? true : _b, button = tslib_1.__rest(props, ["kind", "style", "stylingMode", "showText"]), type = kind === "transparent" ? "normal" : kind, text = showText ? button.text : null, stylePatch = kind === "transparent" ? { transparent: true } : {};
        return React.createElement(Widget, tslib_1.__assign({}, button, { stylingMode: stylingMode, type: type, text: text, style: tslib_1.__assign({}, style, stylePatch) }));
    }; }
});
registerWidget({
    name: "image",
    loader: function () { return import("../image-widget").then(function (_a) {
        var ReactImage = _a.ReactImage;
        return ReactImage;
    }); }
});
registerWidget({
    name: "icon",
    loader: function () { return import("../icon-widget").then(function (_a) {
        var ReactIcon = _a.ReactIcon;
        return ReactIcon;
    }); }
});
registerWidget({
    name: "input",
    loader: function () { return import("devextreme-react/ui/text-box").then(function (_a) {
        var TextBox = _a.TextBox;
        return TextBox;
    }); }
});
registerWidget({
    name: "stackPanel",
    loader: function () { return import("../stack-panel-widget").then(function (_a) {
        var ReactStackPanel = _a.ReactStackPanel;
        return ReactStackPanel;
    }); }
});
registerWidget({
    name: "grid",
    loader: function () { return import("../grid-widget").then(function (_a) {
        var ReactDataGrid = _a.ReactDataGrid;
        return ReactDataGrid;
    }); }
});
registerWidget({
    name: "list",
    loader: function () { return import("../list-widget").then(function (_a) {
        var ReactList = _a.ReactList;
        return ReactList;
    }); }
});
registerWidget({
    name: "datebox",
    loader: function () { return import("devextreme-react/ui/date-box").then(function (_a) {
        var DateBox = _a.DateBox;
        return DateBox;
    }); },
    customizeWidget: function (Widget) { return function (props) {
        var _a = props.format, format = _a === void 0 ? "date" : _a, _b = props.applyValueMode, applyValueMode = _b === void 0 ? "instantly" : _b, datebox = tslib_1.__rest(props, ["format", "applyValueMode"]);
        return React.createElement(Widget, tslib_1.__assign({}, datebox, { applyValueMode: applyValueMode, type: format }));
    }; }
});
registerWidget({
    name: "selectBox",
    loader: function () { return import("devextreme-react/ui/select-box").then(function (_a) {
        var SelectBox = _a.SelectBox;
        return SelectBox;
    }); },
    customizeWidget: function (Widget) { return function (props) { return React.createElement(Widget, tslib_1.__assign({}, props)); }; }
});
registerWidget({
    name: "lookup",
    loader: function () { return import("devextreme-react/ui/lookup").then(function (_a) {
        var Lookup = _a.Lookup;
        return Lookup;
    }); },
    customizeWidget: function (Widget) { return function (props) { return React.createElement(Widget, tslib_1.__assign({}, props)); }; }
});
registerWidget({
    name: "textarea",
    loader: function () { return import("devextreme-react/ui/text-area").then(function (_a) {
        var TextArea = _a.TextArea;
        return TextArea;
    }); }
});
registerWidget({
    name: "passbox",
    loader: function () { return import("devextreme-react/ui/text-box").then(function (_a) {
        var TextBox = _a.TextBox;
        return TextBox;
    }); },
    customizeWidget: function (Widget) { return function (props) { return React.createElement(Widget, tslib_1.__assign({}, props, { mode: "password" })); }; }
});
registerWidget({
    name: "colorpicker",
    loader: function () { return import("devextreme-react/ui/color-box").then(function (_a) {
        var ColorBox = _a.ColorBox;
        return ColorBox;
    }); }
});
registerWidget({
    name: "numberbox",
    loader: function () { return import("devextreme-react/ui/number-box").then(function (_a) {
        var NumberBox = _a.NumberBox;
        return NumberBox;
    }); },
    customizeWidget: function (Widget) { return function (props) {
        var value = props.value, numberbox = tslib_1.__rest(props, ["value"]);
        if (isString(value)) {
            value = null;
        }
        return React.createElement(Widget, tslib_1.__assign({}, numberbox, { value: value }));
    }; }
});
registerWidget({
    name: "radio",
    loader: function () { return import("devextreme-react/ui/radio-group").then(function (_a) {
        var RadioGroup = _a.RadioGroup;
        return RadioGroup;
    }); }
});
registerWidget({
    name: "actionsheet",
    loader: function () { return import("devextreme-react/ui/action-sheet").then(function (_a) {
        var ActionSheet = _a.ActionSheet;
        return ActionSheet;
    }); }
});
registerWidget({
    name: "switch",
    loader: function () { return import("devextreme-react/ui/switch").then(function (_a) {
        var Switch = _a.Switch;
        return Switch;
    }); }
});
registerWidget({
    name: "checkbox",
    loader: function () { return import("devextreme-react/ui/check-box").then(function (_a) {
        var CheckBox = _a.CheckBox;
        return CheckBox;
    }); }
});
registerWidget({
    name: "toolbar",
    loader: function () { return import("../toolbars/toolbar-widget").then(function (_a) {
        var ReactToolbar = _a.ReactToolbar;
        return ReactToolbar;
    }); },
    customizeWidget: withTheme
});
registerWidget({
    name: "appbar",
    loader: function () { return import("../toolbars/appbar-widget").then(function (_a) {
        var ReactAppbar = _a.ReactAppbar;
        return ReactAppbar;
    }); },
    customizeWidget: withTheme
});
