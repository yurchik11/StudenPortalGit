/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { List } from "devextreme-react/ui/list";
import * as React from "react";
import { StandaloneMenuItemTemplate } from "../menu-item";
import ReactPopup from "../popup-widget";
import { ReactToolbar } from "../toolbars/toolbar-widget";
import { withTheme } from "../with-theme";
import ReactSingleChoiceAction from "./single-choice-action";
var PopupWithTheme = withTheme(ReactPopup);
var ReactMobileSingleChoiceAction = /** @class */ (function (_super) {
    tslib_1.__extends(ReactMobileSingleChoiceAction, _super);
    function ReactMobileSingleChoiceAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReactMobileSingleChoiceAction.prototype.renderItem = function (item, showArrow) {
        return (React.createElement(StandaloneMenuItemTemplate, tslib_1.__assign({}, tslib_1.__assign({}, item, { showArrow: showArrow }))));
    };
    ReactMobileSingleChoiceAction.prototype.renderItems = function (items, closePopup) {
        var _this = this;
        return (React.createElement(List, { items: items, itemComponent: function (item) { return _this.renderItem(item, ReactMobileSingleChoiceAction.isLeafItem(item)); }, onItemClick: function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var result, item;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.executeItemClick(e)];
                        case 1:
                            result = _a.sent(), item = e.itemData;
                            if (!ReactMobileSingleChoiceAction.isLeafItem(item)) {
                                closePopup();
                            }
                            return [2 /*return*/, result];
                    }
                });
            }); } }));
    };
    ReactMobileSingleChoiceAction.prototype.navigateBack = function (togglePopupVisible) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var lastExcutedLeafItem;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lastExcutedLeafItem = this.state.lastExcutedLeafItem;
                        if (!(lastExcutedLeafItem && !this.isRootItem(lastExcutedLeafItem))) return [3 /*break*/, 1];
                        this.setState(function (prevState) {
                            return tslib_1.__assign({}, prevState, { lastExecutedItem: lastExcutedLeafItem.parent, lastExcutedLeafItem: lastExcutedLeafItem.parent });
                        });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, togglePopupVisible()];
                    case 2:
                        _a.sent();
                        if (this.props.onHide) {
                            this.props.onHide();
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReactMobileSingleChoiceAction.prototype.renderToolbar = function (togglePopupVisible) {
        var _this = this;
        var actionText = this.props.actionText, _a = this.state, lastExcutedLeafItem = _a.lastExcutedLeafItem, firstActiveItem = _a.firstActiveItem, lastExcutedLeafItemText = lastExcutedLeafItem && lastExcutedLeafItem.text, firstActiveItemText = firstActiveItem && firstActiveItem.text, title = lastExcutedLeafItemText || actionText || firstActiveItemText;
        return (React.createElement(ReactToolbar, { items: [
                {
                    id: "menu",
                    type: "command.button",
                    location: "before",
                    icon: "arrowleft",
                    onExecute: function () { _this.navigateBack(togglePopupVisible); }
                },
                {
                    id: "menu",
                    type: "label",
                    location: "before",
                    text: title
                }
            ] }));
    };
    ReactMobileSingleChoiceAction.prototype.getItems = function () {
        var items = this.menuItemsSelector(this.props)[0].items, lastExcutedLeafItem = this.state.lastExcutedLeafItem;
        return lastExcutedLeafItem ? lastExcutedLeafItem.items : items;
    };
    ReactMobileSingleChoiceAction.prototype.render = function () {
        var _this = this;
        return (React.createElement(PopupWithTheme, { themeScope: "detail-item-toolbar-mobile", fullScreen: true, showTitle: false }, function (togglePopupVisible) { return (React.createElement(React.Fragment, null,
            _this.renderToolbar(togglePopupVisible),
            _this.renderItems(_this.getItems(), togglePopupVisible))); }));
    };
    return ReactMobileSingleChoiceAction;
}(ReactSingleChoiceAction));
export default ReactMobileSingleChoiceAction;
