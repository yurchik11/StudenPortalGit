/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
var _a;
import { Button } from "devextreme-react/ui/button";
import { Menu } from "devextreme-react/ui/menu";
import * as React from "react";
import { MenuItemTemplate } from "../menu-item";
import { createWithStyleComponent } from "../with-style";
import { createSelector } from "reselect";
var dxStateHoverClassName = "dx-state-hover", dropDownButtonClassName = "xet-drop-down-button", actionButtonClassName = "xet-action-button";
var WithStyle = createWithStyleComponent({
    main: (_a = {
            "display": "flex",
            "flexDirection": "row",
            "alignItems": "center"
        },
        _a["& ." + actionButtonClassName] = {
            "borderBottomRightRadius": 0,
            "borderTopRightRadius": 0,
            "borderRightWidth": 0
        },
        _a["& ." + dropDownButtonClassName] = {
            "borderBottomLeftRadius": 0,
            "borderTopLeftRadius": 0
        },
        _a["& .dx-button.dx-state-focused"] = {
            "borderWidth": 1
        },
        _a["& .dx-button.dx-state-active"] = {
            "borderWidth": 1
        },
        _a["& .dx-button.dx-state-focused + div ." + dropDownButtonClassName] = {
            "borderLeftWidth": 0
        },
        _a["& .dx-button.dx-state-active + div ." + dropDownButtonClassName] = {
            "borderLeftWidth": 0
        },
        _a["& .dx-menu-base .dx-menu-item-content"] = {
            "padding": 0
        },
        _a["& .dx-menu-item"] = {
            "borderRadius": "100%"
        },
        _a["& .dx-menu-item-expanded"] = {
            "borderRadius": "100%"
        },
        _a["& .dx-context-menu-container-border"] = {
            "display": "none"
        },
        _a["& .xet-menu .dx-context-menu-content-delimiter"] = {
            "display": "none!important"
        },
        _a)
});
var ReactSingleChoiceAction = /** @class */ (function (_super) {
    tslib_1.__extends(ReactSingleChoiceAction, _super);
    function ReactSingleChoiceAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { firstActiveItem: _this.props.items[0], lastExecutedItem: null, lastExcutedLeafItem: null };
        _this.menuItemsSelector = createSelector(function (_a) {
            var items = _a.items;
            return items;
        }, function (items) {
            var root = { items: null };
            root.items = ReactSingleChoiceAction.mapItems(items, root);
            return [root];
        });
        _this.actionButtonElement = React.createRef();
        _this.dropDownButtonElement = React.createRef();
        _this.handleMouseEnter = function (_a) {
            var target = _a.target;
            var classList = target.classList;
            if (classList.contains(dropDownButtonClassName) || classList.contains(actionButtonClassName)) {
                _this.getElement(_this.actionButtonElement).classList.add(dxStateHoverClassName);
                _this.getElement(_this.dropDownButtonElement).classList.add(dxStateHoverClassName);
            }
        };
        _this.handleMouseLeave = function () {
            _this.getElement(_this.actionButtonElement).classList.remove(dxStateHoverClassName);
            _this.getElement(_this.dropDownButtonElement).classList.remove(dxStateHoverClassName);
        };
        _this.renderSubmenuItemComponent = function (item) {
            if (_this.isRootItem(item)) {
                return (React.createElement(Button, { icon: "spindown", elementAttr: { class: dropDownButtonClassName }, ref: _this.dropDownButtonElement, hoverStateEnabled: false }));
            }
            return React.createElement(MenuItemTemplate, tslib_1.__assign({}, tslib_1.__assign({}, item, { showArrow: ReactSingleChoiceAction.isLeafItem(item) })));
        };
        _this.executeAction = function (e) {
            var itemToExecute = _this.getItemToExecute(), _a = _this.props, onExecute = _a.onExecute, _b = _a.showItemsOnClick, showItemsOnClick = _b === void 0 ? false : _b, onExecuteFn = itemToExecute.onExecute ? itemToExecute.onExecute : onExecute;
            if (showItemsOnClick) {
                setTimeout(function () {
                    _this.getElement(_this.dropDownButtonElement).click();
                });
                return false;
            }
            return onExecuteFn(tslib_1.__assign({}, e, { itemData: itemToExecute }));
        };
        _this.executeItemClick = function (e) {
            var itemData = e.itemData, _a = _this.props.onExecute, onExecuteFn = _a === void 0 ? function () { return undefined; } : _a, _b = itemData.onExecute, itemExecuteFn = _b === void 0 ? onExecuteFn : _b;
            if (!_this.isRootItem(itemData)) {
                var isLeafItem_1 = ReactSingleChoiceAction.isLeafItem(itemData);
                _this.setState(function (prevState) {
                    var lastExcutedLeafItem = isLeafItem_1 ? itemData : prevState.lastExcutedLeafItem;
                    return tslib_1.__assign({}, prevState, { lastExecutedItem: itemData, lastExcutedLeafItem: lastExcutedLeafItem });
                });
                if (!isLeafItem_1) {
                    return itemExecuteFn(e);
                }
            }
        };
        _this.getItemToExecute = function () {
            var _a = _this.props.defaultItemMode, defaultItemMode = _a === void 0 ? "FirstActiveItem" : _a, _b = _this.state, lastExecutedItem = _b.lastExecutedItem, firstActiveItem = _b.firstActiveItem, itemToExecute = defaultItemMode === "LastExecutedItem" && lastExecutedItem
                ? lastExecutedItem
                : firstActiveItem;
            return itemToExecute;
        };
        return _this;
    }
    ReactSingleChoiceAction.mapItems = function (items, parent) {
        if (items === void 0) { items = []; }
        if (parent === void 0) { parent = null; }
        var hasIcon = items.some(function (item) { return !!item.icon; });
        return items.map(function (item) {
            var newItem = tslib_1.__assign({}, item, { parent: parent });
            if (hasIcon) {
                newItem = tslib_1.__assign({}, newItem, { icon: newItem.icon || "empty" });
            }
            if (ReactSingleChoiceAction.isLeafItem(item)) {
                newItem.items = ReactSingleChoiceAction.mapItems(item.items, newItem);
            }
            return newItem;
        });
    };
    ReactSingleChoiceAction.prototype.getElement = function (ref) {
        return ref.current.instance.element();
    };
    ReactSingleChoiceAction.isLeafItem = function (item) {
        return !!item.items;
    };
    ReactSingleChoiceAction.prototype.isRootItem = function (item) {
        return !item.parent;
    };
    ReactSingleChoiceAction.prototype.render = function () {
        var _this = this;
        var itemToExecute = this.getItemToExecute(), _a = this.props, _b = _a.actionText, actionText = _b === void 0 ? itemToExecute.text : _b, _c = _a.actionIcon, actionIcon = _c === void 0 ? itemToExecute.icon : _c, _d = _a.showText, showText = _d === void 0 ? true : _d, showItemsOnClick = _a.showItemsOnClick, tooltip = _a.tooltip, style = _a.style, widgetTooltip = itemToExecute.tooltip || tooltip;
        return (React.createElement(WithStyle, { className: this.props.className }, function (_a) {
            var main = _a.main;
            return (React.createElement("div", { style: style, className: main, onMouseEnter: _this.handleMouseEnter, onMouseLeave: _this.handleMouseLeave },
                React.createElement(Button, { onClick: _this.executeAction, icon: !showItemsOnClick ? actionIcon : null, text: showText ? actionText : null, hint: widgetTooltip, elementAttr: { class: actionButtonClassName }, ref: _this.actionButtonElement, hoverStateEnabled: false }),
                React.createElement(Menu, { cssClass: "xet-menu", hint: widgetTooltip, showFirstSubmenuMode: "onHover", onItemClick: _this.executeItemClick, itemComponent: _this.renderSubmenuItemComponent, items: _this.menuItemsSelector(_this.props) })));
        }));
    };
    ReactSingleChoiceAction.defaultProps = { _originalConfig: {} };
    return ReactSingleChoiceAction;
}(React.Component));
export default ReactSingleChoiceAction;
