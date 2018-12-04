/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { Accordion } from "devextreme-react/ui/accordion";
import { TreeView } from "devextreme-react/ui/tree-view";
import { ScrollView } from "devextreme-react/ui/scroll-view";
import { createWithStyleComponent } from "../../widgets/with-style";
import { NavbarItem } from "./navigation-menu-item";
import { RootNavbarItem } from "./naivgation-menu-root-item";
import { NavbarListSection } from "./navbar-list-section";
// reselect
var WithStyle = createWithStyleComponent({
    main: {
        "& .dx-accordion-item-title": {
            padding: "0 8px",
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between"
        },
        "& .dx-accordion-item-title .dx-icon": {
            margin: "0 auto",
            width: "inherit",
            height: "inherit"
        },
        "& .dx-treeview": {
            marginLeft: -4
        },
        "& .dx-accordion-item-title:before": {
            position: "absolute",
            paddingRight: 10,
            fontSize: 12
        },
        "& .dx-accordion-item-body": {
            padding: "0 12px 8px 28px"
        },
        "& .section": {
            "border-bottom": "1px solid rgba(255, 255, 255, 0.1)"
        }
    },
    nested: {
        padding: "0 20px",
    },
});
export var Navbar = function (props) {
    var items = props.items, selectedItem = props.selectedItem;
    return (React.createElement(WithStyle, null, function (_a) {
        var main = _a.main, nested = _a.nested;
        return (React.createElement(ScrollView, { className: main },
            React.createElement("div", { className: nested }, items.map(function (item) {
                var selected = containsSelectedItem(item, selectedItem);
                return React.createElement(NavbarSection, { key: item.id, rootItem: item, selectedItem: selected ? selectedItem : undefined });
            }))));
    }));
};
function containsSelectedItem(rootItem, selectedItem) {
    return rootItem === selectedItem || rootItem.items && rootItem.items.some(function (item) { return containsSelectedItem(item, selectedItem); });
}
var NavbarSection = /** @class */ (function (_super) {
    tslib_1.__extends(NavbarSection, _super);
    function NavbarSection(props) {
        var _this = _super.call(this, props) || this;
        var rootItem = _this.props.rootItem;
        _this.items = [rootItem];
        return _this;
    }
    NavbarSection.prototype.render = function () {
        var _a = this.props, rootItem = _a.rootItem, selectedItem = _a.selectedItem, expanded = rootItem.defaultExpanded || !!selectedItem, selectedItems = expanded ? this.items : [];
        return rootItem.items
            ? (React.createElement(Accordion, { key: rootItem.id, items: this.items, defaultSelectedItems: selectedItems, keyExpr: "viewId", collapsible: true, itemTitleComponent: RootNavbarItem, itemComponent: function (item) { return React.createElement(TreeView, { items: item.items, selectByClick: true, selectionMode: "single", itemComponent: NavbarItem, onItemClick: item.onExecute }); }, className: "section", tabIndex: -1 })) : (React.createElement(NavbarListSection, { key: rootItem.id, items: this.items, selectedItems: selectedItems, onItemClick: rootItem.onExecute, className: "section", tabIndex: -1 }));
    };
    return NavbarSection;
}(React.PureComponent));
