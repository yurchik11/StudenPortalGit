/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import iconUtils from "devextreme/core/utils/icon";
import * as React from "react";
import { createWithStyleComponent } from "./with-style";
var WithStyle = createWithStyleComponent({
    main: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& img": {
            margin: "0 auto",
            width: "inherit",
            height: "inherit"
        }
    },
    image: {
        margin: "0 auto",
        width: "inherit",
        height: "inherit"
    }
});
var ReactIcon = /** @class */ (function (_super) {
    tslib_1.__extends(ReactIcon, _super);
    function ReactIcon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderContent = function (classes) {
            var _a = _this.props, _originalConfig = _a._originalConfig, icon = tslib_1.__rest(_a, ["_originalConfig"]), imageContainer = iconUtils.getImageContainer(_this.props.src);
            if (imageContainer) {
                var iconContainer = imageContainer[0];
                return (React.createElement("div", { style: _this.props.style, className: classes.main, dangerouslySetInnerHTML: {
                        __html: iconContainer.outerHTML
                    } }));
            }
            else {
                return (React.createElement("div", { style: _this.props.style, className: classes.main },
                    React.createElement("img", tslib_1.__assign({ className: classes.image }, icon))));
            }
        };
        return _this;
    }
    ReactIcon.prototype.render = function () {
        return (React.createElement(WithStyle, { className: this.props.className }, this.renderContent));
    };
    return ReactIcon;
}(React.Component));
export { ReactIcon };
