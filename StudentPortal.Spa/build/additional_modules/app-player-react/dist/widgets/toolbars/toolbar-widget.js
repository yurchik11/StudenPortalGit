/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { createSelector } from "reselect";
import { getComponentInfo } from "../info/components-info";
import { ReactValueToolbar } from "./detail-toolbar";
import { ReactToolbarBase } from "./toolbar-base-widget";
var ReactToolbar = /** @class */ (function (_super) {
    tslib_1.__extends(ReactToolbar, _super);
    function ReactToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { displayedItem: null };
        _this.itemsSelector = createSelector(function (args) { return args.items; }, function (args) { return args.visible; }, function (items, visible) {
            return items.map(function (item) {
                var itemVisible = visible === false ? false : item.visible;
                item = ReactToolbar.extractWidgetOptions(tslib_1.__assign({}, item, { visible: itemVisible }));
                return item.options.type ? _this.patchToMenuItem(item) : item;
            });
        });
        _this.detailToolbarBackButton = ReactToolbar.extractWidgetOptions({
            id: "backButton",
            icon: "arrowleft",
            type: "command.button",
            onExecute: function () {
                _this.displayItem(null);
            },
            location: "before",
            locateInMenu: "never"
        });
        _this.onClickInMenuHandlers = function (item) { return ({
            "toolbar": function (e) { return item.options.onExecute(e); },
            "value-toolbar": function () {
                _this.displayItem(item);
            },
            "popup": function () {
                _this.displayItem(tslib_1.__assign({}, item, { locateInMenu: "never", options: tslib_1.__assign({}, item.options, { onHide: function () {
                            _this.displayItem(null);
                        } }) }));
            }
        }); };
        _this.displayItem = function (item) {
            _this.setState(function (prevState) { return (tslib_1.__assign({}, prevState, { displayedItem: item })); });
        };
        return _this;
    }
    ReactToolbar.isPopupDisplayingCommand = function (command) {
        if (command) {
            var displayingContext = getComponentInfo(command.options.type).displayingContext;
            return displayingContext === "popup";
        }
        return false;
    };
    ReactToolbar.extractWidgetOptions = function (command) {
        var locateInMenuOptions = command.locateInMenuOptions, locateInMenu = command.locateInMenu, showText = command.showText, location = command.location, template = command.template, menuItemTemplate = command.menuItemTemplate, options = tslib_1.__rest(command, ["locateInMenuOptions", "locateInMenu", "showText", "location", "template", "menuItemTemplate"]);
        return { options: options, locateInMenuOptions: locateInMenuOptions, locateInMenu: locateInMenu, showText: showText, location: location, template: template, menuItemTemplate: menuItemTemplate, visible: options.visible, disabled: options.disabled };
    };
    ReactToolbar.prototype.patchToMenuItem = function (item) {
        var _this = this;
        var displayingContext = getComponentInfo(item.options.type).displayingContext;
        return tslib_1.__assign({}, item, { showArrow: ReactToolbar.isPopupDisplayingCommand(item), onItemClickInMenu: function (e) { return _this.onClickInMenuHandlers(item)[displayingContext](e); } });
    };
    ReactToolbar.prototype.render = function () {
        var _a = this.props, _b = _a.visible, visible = _b === void 0 ? true : _b, _c = _a.items, items = _c === void 0 ? [] : _c, otherProps = tslib_1.__rest(_a, ["visible", "items"]), displayedItem = this.state.displayedItem, isPopupCommand = ReactToolbar.isPopupDisplayingCommand(displayedItem), baseToolbarVisible = !displayedItem || isPopupCommand, baseToolbarItems = this.itemsSelector(this.props);
        if (isPopupCommand) {
            baseToolbarItems = baseToolbarItems.concat([this.state.displayedItem]);
        }
        return (React.createElement(React.Fragment, null,
            React.createElement(ReactToolbarBase, tslib_1.__assign({}, otherProps, { visible: visible && baseToolbarVisible, items: baseToolbarItems })),
            React.createElement(ReactValueToolbar, { style: this.props.style, visible: visible && !baseToolbarVisible, backButton: this.detailToolbarBackButton, item: displayedItem })));
    };
    return ReactToolbar;
}(React.PureComponent));
export { ReactToolbar };
