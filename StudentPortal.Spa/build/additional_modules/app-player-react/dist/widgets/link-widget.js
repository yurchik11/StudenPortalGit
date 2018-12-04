/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import getDeviceType from "../utils/device";
import { createWithStyleComponent } from "./with-style";
import { createStyleSelector } from "./label-widget";
var WithStyle = createWithStyleComponent({
    label: {
        WhiteSpace: "normal",
        flexDirection: "column"
    },
    value: {
        overflow: "hidden"
    }
});
var ReactLink = /** @class */ (function (_super) {
    tslib_1.__extends(ReactLink, _super);
    function ReactLink() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.styleSelector = createStyleSelector();
        return _this;
    }
    ReactLink.prototype.render = function () {
        var _a = this.styleSelector(this.props), style = _a.style, textStyle = _a.textStyle, _b = this.props, link = _b.link, text = _b.text;
        return (React.createElement(WithStyle, { className: this.props.className }, function (classes) {
            return (React.createElement("a", { style: style, className: classes.label + " " + classes.main, onClick: function (event) { return link && link[0] === "#" ? event : ReactLink.defaultClickHandler(event.nativeEvent); }, href: link },
                React.createElement("span", { className: classes.value, style: textStyle }, text)));
        }));
    };
    ReactLink.defaultClickHandler = function (event) {
        event.preventDefault(); // NOTE: prevent from changing location in current window
        event.stopPropagation(); // NOTE: prevent from propagating Link.onClick to List.onItemClick
        var link = event.target;
        if (!link.href && link.parentNode && link.parentNode["href"]) {
            link = link.parentNode;
        }
        var href = link.href; // NOTE: link.href returns current page url when href attribute is empty
        if (href) {
            if (href.startsWith("javascript:")) {
                var expr = href.substr(href.indexOf("javascript:")), func = new Function("event", expr);
                func.apply(event.target, [event]);
            }
            else {
                window.open(href, getDeviceType() === "desktop" ? "_blank" : "_system");
            }
        }
    };
    ReactLink.defaultProps = { link: "", text: "" };
    return ReactLink;
}(React.Component));
export { ReactLink };
