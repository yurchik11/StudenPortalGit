/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { isSafariBasedBrowser } from "../utils/device";
import { normalizeStyle } from "./normalize-style-hoc";
import { createWithStyleComponent } from "./with-style";
import { convertToFlexProperty, extractFlex } from "./flex-helper";
import { FlexAppPlayerComponent } from "./app-player-component";
import { ScrollView } from "devextreme-react/ui/scroll-view";
import { createSelector } from "reselect";
var widgetStyles = {
    main: {
        "display": "flex",
        "position": "relative"
    },
    nonscroller: {
        "overflow": "hidden"
    },
    scroller: {
        "display": "flex",
        "width": "100%",
        "height": "initial"
    },
    inscroller: {
        "display": "flex"
    }
};
if (isSafariBasedBrowser()) {
    widgetStyles.main["& .dx-scrollable-wrapper"] = {
        "display": "flex",
        "flexGrow": 1,
        "flexDirection": "column",
        "height": "auto",
        "& .dx-scrollable-container": {
            "height": "initial"
        }
    };
}
var WithStyle = createWithStyleComponent(widgetStyles);
var ReactStackPanel = /** @class */ (function (_super) {
    tslib_1.__extends(ReactStackPanel, _super);
    function ReactStackPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.styleSelector = createSelector([
            function (args) { return args.orientation; },
            function (args) { return args.verticalAlign; },
            function (args) { return args.horizontalAlign; },
            function (args) { return args.style; }
        ], function (orientation, verticalAlign, horizontalAlign, style) {
            return tslib_1.__assign({}, style, normalizeStyle(convertToFlexProperty(orientation)({ orientation: orientation, verticalAlign: verticalAlign, horizontalAlign: horizontalAlign })));
        });
        return _this;
    }
    ReactStackPanel.prototype.render = function () {
        var _this = this;
        var _a = this.props, scrollable = _a.scrollable, orientation = _a.orientation, components = _a.components, style = this.styleSelector(this.props);
        return (React.createElement(WithStyle, { className: this.props.className }, function (_a) {
            var main = _a.main, scroller = _a.scroller, inscroller = _a.inscroller, nonscroller = _a.nonscroller;
            if (scrollable) {
                var scrollViewOptions = { direction: orientation }, _b = extractFlex(style), flexStyles = _b.flexStyles, otherStyles = _b.otherStyles;
                return (React.createElement("div", { style: otherStyles, className: main },
                    React.createElement(ScrollView, tslib_1.__assign({}, scrollViewOptions, { style: flexStyles, className: scroller }),
                        React.createElement("div", { style: flexStyles, className: inscroller }, _this.renderChildren(orientation, components)))));
            }
            else {
                return (React.createElement("div", { style: style, className: main + " " + nonscroller }, _this.renderChildren(orientation, components)));
            }
        }));
    };
    ReactStackPanel.prototype.renderChildren = function (orientation, components) {
        if (components) {
            return components.map(function (componentConfig, index) { return (React.createElement(FlexAppPlayerComponent, { key: index, widgetProps: componentConfig, orientation: orientation })); });
        }
        else {
            return this.props.children;
        }
    };
    ReactStackPanel.defaultProps = {
        scrollable: false,
        orientation: "vertical",
        verticalAlign: "top",
        horizontalAlign: "left"
    };
    return ReactStackPanel;
}(React.Component));
export { ReactStackPanel };
