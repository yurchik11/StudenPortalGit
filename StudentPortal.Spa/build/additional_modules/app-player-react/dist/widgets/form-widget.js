/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { Template } from "devextreme-react/core/template";
import { Form } from "devextreme-react/ui/form";
import * as React from "react";
import getDevice, { getDeviceValue } from "../utils/device";
import AppPlayerComponent from "./app-player-component";
import { createWithStyleComponent } from "./with-style";
import { ThemeScope } from "./theme-scope";
import { createSelector } from "reselect";
//#endregion
var defaultLabelLocations = { desktop: "left", tablet: "left", phone: "top" }, WithStyle = createWithStyleComponent({
    main: {
        flexDirection: "column"
    }
});
var ReactForm = /** @class */ (function (_super) {
    tslib_1.__extends(ReactForm, _super);
    function ReactForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemsSelector = createSelector([
            function () { return getDevice(); },
            function (args) { return args.items; }
        ], function (deviceType, items) {
            var originalItems = {}, formItems = ReactForm.mapItems(items, deviceType, originalItems);
            return {
                originalItems: originalItems,
                items: formItems
            };
        });
        _this.colCountSelector = createSelector([
            function (args) { return args.colCount; }
        ], function (colCount) { return getDeviceValue(colCount); });
        _this.labelLocationSelector = createSelector([
            function () { return getDevice(); },
            function (args) { return args.labelLocation; }
        ], function (deviceType, labelLocation) { return getDeviceValue(labelLocation) || defaultLabelLocations[deviceType]; });
        return _this;
    }
    ReactForm.prototype.render = function () {
        var form = tslib_1.__assign({}, this.props, this.itemsSelector(this.props), { labelLocation: this.labelLocationSelector(this.props), colCount: this.colCountSelector(this.props) });
        return (React.createElement(ThemeScope.Provider, { value: "form" },
            React.createElement(WithStyle, { className: form.className }, function (_a) {
                var main = _a.main;
                return (React.createElement(Form, tslib_1.__assign({}, form, { className: main }),
                    React.createElement(Template, { name: "item", component: ReactForm.componentTemplate(form.originalItems) })));
            })));
    };
    ReactForm.mapItems = function (items, deviceType, originalItemsMap) {
        var result = items.map(function (item) {
            if ((item.itemType === "group") || (item["items"]) && !item["type"]) {
                return tslib_1.__assign({}, item, { items: ReactForm.mapItems(item.items, deviceType, originalItemsMap) });
            }
            else if ((item.itemType === "tabbed") && item.tabs) {
                return tslib_1.__assign({}, item, { tabs: ReactForm.mapItems(item.tabs, deviceType, originalItemsMap) });
            }
            else {
                var originalItemKey = Object.keys(originalItemsMap).length;
                originalItemsMap[originalItemKey] = item;
                return {
                    label: {
                        text: item.title,
                    },
                    template: "item",
                    editorOptions: tslib_1.__assign({}, item, { originalItemKey: originalItemKey }),
                    visible: item.visible
                };
            }
        });
        return result;
    };
    ReactForm.defaultProps = { items: [] };
    ReactForm.componentTemplate = function (originalItemsMap) { return function (item) {
        return (React.createElement(AppPlayerComponent, tslib_1.__assign({}, originalItemsMap[item.editorOptions.originalItemKey])));
    }; };
    return ReactForm;
}(React.Component));
export { ReactForm };
