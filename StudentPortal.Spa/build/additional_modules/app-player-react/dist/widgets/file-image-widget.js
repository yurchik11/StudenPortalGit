/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { ActionSheet } from "devextreme-react/ui/action-sheet";
import { Button } from "devextreme-react/ui/button";
import * as React from "react";
import getDevice from "../utils/device";
import { ReactImage } from "./image-widget";
import { createWithStyleComponent } from "./with-style";
var fullBase64Header = "data:image/png;base64,", base64Header = "base64,", PHOTOLIBRARY = 0, CAMERA = 1;
function addBase64Header(value) {
    if (value == null || value === "(Image)" || value === "") {
        return null;
    }
    return hasUrlHeader(value) ? value : fullBase64Header + removeBase64Header(value);
}
function removeBase64Header(value) {
    if (value !== null) {
        var index = value.indexOf(base64Header);
        return index === -1 ? value : value.substr(index + base64Header.length);
    }
    else {
        return null;
    }
}
function hasUrlHeader(value) {
    return ["http", "blob:http", "blob:file"].some(function (prefix) { return value.startsWith(prefix); });
}
var WithStyle = createWithStyleComponent({
    container: {
        width: "100%",
        height: "100%",
        display: "table"
    },
    containerImage: {
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "50%",
        backgroundPositionY: "50%"
    },
    containerEmptyImage: {
        width: 32,
        height: 32,
        margin: "0px 10px",
        // tslint:disable-next-line:max-line-length
        background: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACdklEQVRYhe3XPahVRxAH8N9VwQgisRAsBIUnpFWEKEjAwiIp/IAIiqkkwgspBZFBVCTCBFOkE8UiBPwIVn6AjRYpgooQIrHVQkhhsFBfAmrhR3H2ysl95953rvdgGgeW5czu7Pz3vzszZ3sR8Vo3ch+bMvOvcYzmdeQcpvBrRKwYx6hXY2BpZj4Z12vN/n4BMRYTXTKwqQaiNROdASg7HhtElwwMA7FwlM2CrpwPiaYpLMKLYXadMvAuMjEDmdlr0rfNL/87Ax8AtLoDEfE9DgyoT+LbzJyolszJwBDn8A1ORETjJWwrs2pBROzFcSwdc63HOIFPsAH9LPgAt3AGVzPzVd2oiYEf38G5YnMQO2rOYSV24gpuR8SaoQAKnYsbFn+FQ2XhFThSdIMygx+wEctL21h0M1iHmxGxtW/QdARNl+pQZh4bAHsYR2uqa/gqMx812IuIZTiHzXiG9Zl5t20Y/jSH7hq+qDuPiNelfQxl7HNcV9WHnyOiN0keWFf6GdXOX85lUObsxj9Yiy1tAexp0O0u/alhtA8B8UiVQ2BX22J0NCKoaO/ha3xZxi61dV6TS9iPz5oA/Gt2JMzDd6UNyj1GVr/HBTzeVs975XN50xHsUyWV9yKzGMjM0zjdv70j5I4qyUzhb7OTV38Tq/B0YGx16R8OvQNz/aJHxK0CYDtuDM6v0f60Ya1tpf9tkjC8UPrpkmRaSZk7XT7PTwLgIv7EEpyNiPktnM9XZcMl+ANXJnoZRcRa3MBHxkvFz/FpZt7t4mm2Fb+o0usMTqnivB9qq1VnPq3a+XPszMzL/LcYvQ/5HXsz805f0dnDZISM/CF5AxeF7LUucHA2AAAAAElFTkSuQmCC')"
    },
    containerEmptyLabel: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
});
var ReactFileImage = /** @class */ (function (_super) {
    tslib_1.__extends(ReactFileImage, _super);
    function ReactFileImage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = tslib_1.__assign({}, _this.getUnchangedStatePart(props), ReactFileImage.getDerivedStateFromProps(props, {}));
        return _this;
    }
    ReactFileImage.getCalculatedStateParts = function (clearing, props, state, style) {
        var _a = state.value, value = _a === void 0 ? null : _a, imageSrc = state.imageSrc, _b = state.prevProps, prevProps = _b === void 0 ? {} : _b;
        if (clearing === true) {
            value = null;
            imageSrc = null;
        }
        else if (!prevProps || (props && (props.imageSrc !== prevProps.imageSrc || props.value !== prevProps.value))) {
            if (props.value !== value) {
                value = props.value;
                imageSrc = addBase64Header(props.value);
            }
            if (props.imageSrc !== prevProps.imageSrc && props.value === null) {
                imageSrc = props.imageSrc;
            }
            prevProps = props;
        }
        else {
            if (value) {
                imageSrc = addBase64Header(value);
            }
        }
        var emptyLabelVisible = !imageSrc && !value;
        return {
            imageStyle: ReactFileImage.getImageStyle(style, emptyLabelVisible),
            imageSrc: imageSrc,
            value: value,
            emptyLabelVisible: emptyLabelVisible,
            prevProps: prevProps
        };
    };
    ReactFileImage.getDerivedStateFromProps = function (config, prevState) {
        var value = config.value, style = config.style, urlSrc = config.urlSrc;
        return tslib_1.__assign({}, ReactFileImage.getCalculatedStateParts(null, { value: value, imageSrc: urlSrc }, prevState, style));
    };
    ReactFileImage.getImageStyle = function (_a, emptyLabelVisible) {
        var width = _a.width, height = _a.height;
        var _width = !isNaN(parseInt(width, 10)) ? width : undefined, _height = !isNaN(parseInt(height, 10)) ? height : undefined;
        if (emptyLabelVisible) {
            return { width: _width || _height, height: _height || _width };
        }
        return { width: _width || "auto", height: _height || "auto" };
    };
    ReactFileImage.prototype._getActionSheetOption = function (currentTarget, stopPropagation) {
        var _this = this;
        var _a = this.props, clearText = _a.clearText, openGalleryText = _a.openGalleryText, takePhotoText = _a.takePhotoText;
        var isDesktop = getDevice() === "desktop", isCordova = !!window["cordova"], dataSource = [
            {
                text: takePhotoText,
                fileSelected: this.state.fileSelected,
                visible: isCordova,
                click: function (args) {
                    _this._cordovaCameraDelegate(CAMERA);
                }
            },
            {
                text: openGalleryText,
                fileSelected: this.state.fileSelected,
                visible: true,
                click: function (args) {
                    if (isCordova) {
                        _this._cordovaCameraDelegate(PHOTOLIBRARY);
                    }
                    else {
                        _this.showFileDialog(stopPropagation);
                    }
                }
            },
            {
                text: clearText,
                fileSelected: this.state.fileSelected,
                visible: !this.state.emptyLabelVisible,
                click: function () {
                    _this.upadateValue(null);
                }
            }
        ];
        return {
            target: currentTarget,
            usePopover: isDesktop,
            visible: true,
            showTitle: false,
            width: isDesktop ? "auto" : undefined,
            dataSource: dataSource,
            onOptionChanged: function (eventArgs) {
                if (eventArgs.name === "visible") {
                    _this.setState(tslib_1.__assign({}, _this.state, { actionSheetOptions: { visible: eventArgs.value } }));
                }
            },
            onItemClick: function (eventArgs) {
                var originalEvent = eventArgs.event;
                eventArgs.itemData.click(eventArgs);
                originalEvent.stopPropagation();
            }
        };
    };
    ReactFileImage.prototype._cordovaCameraDelegate = function (sourceType) {
        var _this = this;
        if (sourceType === void 0) { sourceType = CAMERA; }
        var onSuccess = function (imageData) {
            _this.props.value(imageData);
        }, onFail = function (message) {
            // tslint:disable-next-line:no-console
            console.log("Failed because: " + message);
        };
        navigator["camera"].getPicture(onSuccess, onFail, { quality: 50, destinationType: 0, sourceType: sourceType });
    };
    ReactFileImage.prototype._handleFiles = function (filesHolder) {
        var _this = this;
        var files = filesHolder.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var imageType = /image.*/;
            if (!file.type.match(imageType)) {
                continue;
            }
            var fr = new FileReader();
            fr.onload = function (args) {
                _this.upadateValue(removeBase64Header(fr.result));
            };
            fr.readAsDataURL(file);
        }
    };
    ReactFileImage.prototype.showFileDialog = function (stopPropagation) {
        if (this.fileInput) {
            this.fileInput.click();
            stopPropagation();
        }
    };
    ReactFileImage.prototype.showFileDialogOrActionSheet = function (eventArgs) {
        var isUnderCordova = !!window["cordova"], currentTarget = eventArgs.currentTarget, nativeEvent = eventArgs.nativeEvent, actionSheetOptions = this._getActionSheetOption(currentTarget, function () { return nativeEvent.stopPropagation(); });
        if (isUnderCordova) {
            this.setState(function (state) { return (tslib_1.__assign({}, state, { actionSheetOptions: actionSheetOptions })); });
        }
        else {
            if (this.state.emptyLabelVisible) {
                this.showFileDialog(function () { return nativeEvent.stopPropagation(); });
            }
            else {
                this.setState(function (state) { return (tslib_1.__assign({}, state, { actionSheetOptions: actionSheetOptions })); });
            }
        }
    };
    ReactFileImage.prototype.fileSelected = function (event) {
        this._handleFiles(event.target);
        this.fileInput.value = null;
    };
    ReactFileImage.prototype.upadateValue = function (newValue) {
        var _this = this;
        this.setState(function (state) {
            var actionSheetOptions = state.actionSheetOptions && state.actionSheetOptions.visible ? tslib_1.__assign({}, state.actionSheetOptions, { visible: false }) : state.actionSheetOptions, newState = tslib_1.__assign({}, state, { value: newValue });
            return tslib_1.__assign({}, newState, ReactFileImage.getCalculatedStateParts(newValue === null, state.prevProps, newState, _this.props.style), { actionSheetOptions: actionSheetOptions });
        });
        if (this.props.onValueChanged) {
            this.props.onValueChanged({ value: newValue });
        }
    };
    ReactFileImage.prototype.getUnchangedStatePart = function (props) {
        return {
            fileSelected: this.fileSelected.bind(this),
            showFileDialogOrActionSheet: this.showFileDialogOrActionSheet.bind(this)
        };
    };
    ReactFileImage.prototype.onImageError = function (e) {
        this.setState(function (prevState) {
            return tslib_1.__assign({}, prevState, { emptyLabelVisible: true });
        });
    };
    ReactFileImage.prototype.renderImage = function (_a) {
        var urlSrc = _a.urlSrc, imageSrc = _a.imageSrc, imageStyle = _a.imageStyle, imageClass = _a.imageClass;
        var onError = this.onImageError.bind(this), src = imageSrc ? imageSrc : urlSrc;
        return (React.createElement(ReactImage, { src: src, onError: onError, style: imageStyle, className: imageClass }));
    };
    ReactFileImage.prototype.render = function () {
        var _this = this;
        var _a = this.state, imageSrc = _a.imageSrc, emptyLabelVisible = _a.emptyLabelVisible, imageStyle = _a.imageStyle, actionSheetOptions = _a.actionSheetOptions, fileSelected = _a.fileSelected, showFileDialogOrActionSheet = _a.showFileDialogOrActionSheet, _b = this.props, visible = _b.visible, readOnly = _b.readOnly, emptyLabel = _b.emptyLabel, urlSrc = _b.urlSrc, actionSheet = (actionSheetOptions) ? React.createElement(ActionSheet, tslib_1.__assign({}, actionSheetOptions, { itemComponent: function (options) { return React.createElement(Button, tslib_1.__assign({}, options)); } })) : null;
        return (React.createElement(WithStyle, { className: this.props.className }, function (classes) { return ((visible) ?
            React.createElement("div", { style: _this.props.style, className: classes.main }, (readOnly === true) ?
                React.createElement("div", { className: classes.container }, !emptyLabelVisible
                    ? _this.renderImage({ urlSrc: urlSrc, imageSrc: imageSrc, imageStyle: imageStyle, imageClass: classes.containerImage })
                    : null)
                :
                    React.createElement("div", null,
                        actionSheet,
                        React.createElement("input", { type: "file", accept: "image/x", style: { display: "none" }, onChange: fileSelected, ref: function (fileInput) { return _this.fileInput = fileInput; } }),
                        React.createElement("div", { className: classes.container, onClick: showFileDialogOrActionSheet }, (emptyLabelVisible) ?
                            React.createElement("span", { className: classes.containerEmptyLabel, style: imageStyle },
                                React.createElement("div", { className: classes.containerEmptyImage }),
                                emptyLabel)
                            :
                                _this.renderImage({ urlSrc: urlSrc, imageSrc: imageSrc, imageStyle: imageStyle, imageClass: classes.containerImage }))))
            :
                null); }));
    };
    ReactFileImage.defaultProps = {
        visible: true,
        readOnly: false,
        value: null,
        emptyLabel: "Click or tap to select image.",
        clearText: "Clear",
        openGalleryText: "Select from gallery",
        takePhotoText: "Take photo"
    };
    return ReactFileImage;
}(React.Component));
export { ReactFileImage };
