/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { List } from "devextreme-react/ui/list";
import { createWithStyleComponent } from "../../widgets/with-style";
import { RootNavbarItem } from "./naivgation-menu-root-item";
import { createSelector } from "reselect";
var NavbarListSection = /** @class */ (function (_super) {
    tslib_1.__extends(NavbarListSection, _super);
    function NavbarListSection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        _this.onItemClickSelector = createSelector([function (args) { return args.onExpand; }], function (onExpand) { return onItemClickDefaultFn(onExpand); });
        return _this;
    }
    NavbarListSection.prototype.render = function () {
        var _this = this;
        var _a = this.props, onItemClick = _a.onItemClick, selectedItems = _a.selectedItems, rest = tslib_1.__rest(_a, ["onItemClick", "selectedItems"]), onItemClickFn = onItemClick || this.onItemClickSelector(this.props);
        return (React.createElement(WithStyle, { className: this.props.className }, function (_a) {
            var main = _a.main;
            return (React.createElement(List, tslib_1.__assign({}, rest, { ref: _this.ref, scrollByContent: false, scrollingEnabled: false, itemComponent: RootNavbarItem, onItemClick: onItemClickFn, selectionMode: "none", keyExpr: "viewId", className: main })));
        }));
    };
    NavbarListSection.prototype.componentDidMount = function () {
        this.changeItemSelection(!!this.props.selectedItems.length);
    };
    NavbarListSection.prototype.componentDidUpdate = function () {
        this.changeItemSelection(!!this.props.selectedItems.length);
    };
    NavbarListSection.prototype.changeItemSelection = function (selected) {
        var current = this.ref.current;
        if (current) {
            var classList = current.instance.itemElements()[0].classList;
            selected
                ? classList.add("dx-list-item-selected")
                : classList.remove("dx-list-item-selected");
        }
    };
    return NavbarListSection;
}(React.PureComponent));
export { NavbarListSection };
var WithStyle = createWithStyleComponent({
    main: {
        "& .dx-list-item-content": {
            padding: "0 8px"
        }
    }
});
var onItemClickDefaultFn = function (onExpand) { return function (e) {
    var item = e.itemData;
    if (item.items) {
        onExpand(item);
    }
    else if (typeof item.onExecute === "function") {
        item.onExecute();
    }
}; };
