/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { continueFunc } from "../utils";
import { createWithStyleComponent } from "./with-style";
function display(visible) {
    return {
        display: !visible ? "none" : null
    };
}
var WithStyle = createWithStyleComponent({});
var ReactImage = /** @class */ (function (_super) {
    tslib_1.__extends(ReactImage, _super);
    function ReactImage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            previewVisible: true,
            error: false
        };
        _this.createImage = function (classes) {
            var _a = _this.props, src = _a.src, previewSrc = _a.previewSrc, onClick = _a.onClick, onLoad = _a.onLoad, onError = _a.onError, _b = _this.state, previewVisible = _b.previewVisible, error = _b.error;
            var _c = _this.props;
            if (previewSrc) {
                var onLoadHandler = continueFunc(_this.onLoad.bind(_this), onLoad);
                return (React.createElement(React.Fragment, null,
                    React.createElement("img", { className: classes.main, src: src, style: tslib_1.__assign({}, _this.props.style, display(!previewVisible)), onLoad: onLoadHandler, onError: onError, onClick: onClick }),
                    React.createElement("img", { className: classes.main, src: previewSrc, style: tslib_1.__assign({}, _this.props.style, display(previewVisible)), onClick: onClick })));
            }
            else {
                if (!error) {
                    var onErrorHandler = continueFunc(function () {
                        _this.setState(function (prevState) {
                            return tslib_1.__assign({}, prevState, { error: true });
                        });
                    }, onError);
                    return (React.createElement("img", { style: _this.props.style, src: src, className: classes.main, onLoad: onLoad, onClick: onClick, onError: onErrorHandler }));
                }
                else {
                    return null;
                }
            }
        };
        return _this;
    }
    ReactImage.prototype.onLoad = function () {
        this.setState(function (prevState) {
            return tslib_1.__assign({}, prevState, { previewVisible: false });
        });
    };
    ReactImage.prototype.render = function () {
        return (React.createElement(WithStyle, { className: this.props.className }, this.createImage));
    };
    ReactImage.defaultProps = { src: "" };
    return ReactImage;
}(React.Component));
export { ReactImage };
